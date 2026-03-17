import { useState, useRef } from "react";
import { X, Upload, Plus, Trash2, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { TeamMember } from "@/hooks/useTeamMembers";
import { getImageUrl } from "@/hooks/useTeamMembers";

interface Props {
  member: TeamMember | null;
  onClose: () => void;
}

const TeamMemberEditDialog = ({ member, onClose }: Props) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState(member?.name || "");
  const [title, setTitle] = useState(member?.title || "");
  const [bio, setBio] = useState(member?.bio || "");
  const [office, setOffice] = useState(member?.office || "Perugia");
  const [email, setEmail] = useState(member?.email || "");
  const [linkedin, setLinkedin] = useState(member?.linkedin || "#");
  const [focusAreas, setFocusAreas] = useState(member?.focus_areas.join(", ") || "");
  const [expertise, setExpertise] = useState(member?.expertise.join(", ") || "");
  const [education, setEducation] = useState(member?.education.join("\n") || "");
  const [highlights, setHighlights] = useState(member?.highlights.join("\n") || "");
  const [fullBio, setFullBio] = useState(member?.full_bio.join("\n\n") || "");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!member) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let imageUrl = member.image_url;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `${member.id}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("team-photos")
          .upload(path, imageFile, { upsert: true });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("team-photos")
          .getPublicUrl(path);
        imageUrl = urlData.publicUrl + "?t=" + Date.now();
      }

      const { error } = await supabase
        .from("team_members")
        .update({
          name,
          title,
          bio,
          office,
          email,
          linkedin,
          image_url: imageUrl,
          focus_areas: focusAreas.split(",").map((s) => s.trim()).filter(Boolean),
          expertise: expertise.split(",").map((s) => s.trim()).filter(Boolean),
          education: education.split("\n").map((s) => s.trim()).filter(Boolean),
          highlights: highlights.split("\n").map((s) => s.trim()).filter(Boolean),
          full_bio: fullBio.split("\n\n").map((s) => s.trim()).filter(Boolean),
        })
        .eq("id", member.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Profile updated successfully");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const currentImage = imagePreview || getImageUrl(member);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="fixed inset-4 md:inset-8 lg:inset-16 z-[60] overflow-y-auto bg-background rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border sticky top-0 bg-background z-10">
          <h2 className="font-serif text-xl font-bold text-foreground">Edit Profile</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
          {/* Photo */}
          <div className="flex items-center gap-6">
            <img src={currentImage} alt={name} className="w-28 h-28 object-cover object-top rounded-lg" />
            <div>
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Upload size={14} className="mr-2" /> Change Photo
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <p className="text-xs text-muted-foreground mt-2">JPG or PNG, max 5MB</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-sans font-medium text-foreground mb-1 block">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-sans font-medium text-foreground mb-1 block">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-sans font-medium text-foreground mb-1 block">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-sans font-medium text-foreground mb-1 block">Office</label>
              <Input value={office} onChange={(e) => setOffice(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-sans font-medium text-foreground mb-1 block">LinkedIn URL</label>
              <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
          </div>

          {/* Focus Areas & Expertise */}
          <div>
            <label className="text-sm font-sans font-medium text-foreground mb-1 block">Focus Areas (comma-separated)</label>
            <Input value={focusAreas} onChange={(e) => setFocusAreas(e.target.value)} placeholder="Finance, Statistics, Economics" />
          </div>
          <div>
            <label className="text-sm font-sans font-medium text-foreground mb-1 block">Expertise (comma-separated)</label>
            <Input value={expertise} onChange={(e) => setExpertise(e.target.value)} placeholder="Financial Consulting, Risk Assessment" />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-sans font-medium text-foreground mb-1 block">Short Bio</label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
          </div>
          <div>
            <label className="text-sm font-sans font-medium text-foreground mb-1 block">Full Bio (separate paragraphs with blank lines)</label>
            <Textarea value={fullBio} onChange={(e) => setFullBio(e.target.value)} rows={8} />
          </div>

          {/* Highlights & Education */}
          <div>
            <label className="text-sm font-sans font-medium text-foreground mb-1 block">Experience Highlights (one per line)</label>
            <Textarea value={highlights} onChange={(e) => setHighlights(e.target.value)} rows={4} />
          </div>
          <div>
            <label className="text-sm font-sans font-medium text-foreground mb-1 block">Education (one per line)</label>
            <Textarea value={education} onChange={(e) => setEducation(e.target.value)} rows={3} />
          </div>

          {/* Save */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save size={14} className="mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeamMemberEditDialog;
