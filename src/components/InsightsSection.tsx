import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Upload, Trash2, Plus, X, BookOpen, Calendar, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { useEditMode } from "@/contexts/EditModeContext";
import { useToast } from "@/hooks/use-toast";
import insight1 from "@/assets/insight-1.jpg";
import insight2 from "@/assets/insight-2.jpg";
import insight3 from "@/assets/insight-3.jpg";

interface Insight {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  file_name: string;
  created_at: string;
  uploaded_by: string | null;
  cover_image_url: string | null;
  image?: string;
}

const defaultInsights: Insight[] = [
  {
    id: "default-1",
    category: "Digital & AI",
    title: "How Global Enterprises Can Leapfrog with AI",
    description: "A framework for leaders to accelerate digital adoption and build AI-ready organizations.",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2026-02-15",
    uploaded_by: null,
    cover_image_url: null,
    image: insight1,
  },
  {
    id: "default-2",
    category: "Sustainability",
    title: "The Green Transition: Opportunities for the Private Sector",
    description: "Exploring how ESG frameworks create competitive advantage in emerging and developed markets.",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2026-01-20",
    uploaded_by: null,
    cover_image_url: null,
    image: insight2,
  },
  {
    id: "default-3",
    category: "Public Sector",
    title: "Reimagining Public Service Delivery in the Digital Age",
    description: "How governments worldwide are modernizing citizen services through technology.",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2025-12-10",
    uploaded_by: null,
    cover_image_url: null,
    image: insight3,
  },
];

const categoryImages: Record<string, string> = {
  "Digital & AI": insight1,
  "Strategy": insight1,
  "Sustainability": insight2,
  "Public Sector": insight3,
  "General": insight2,
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const InsightsSection = () => {
  const { user, isAdmin } = useAdmin();
  const { editMode } = useEditMode();
  const { toast } = useToast();
  const [dbInsights, setDbInsights] = useState<Insight[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [file, setFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const allInsights = [...dbInsights, ...defaultInsights];
  const featuredInsight = allInsights[0];
  const restInsights = allInsights.slice(1);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setDbInsights(
        data.map((r: any) => ({
          ...r,
          image: r.cover_image_url || categoryImages[r.category] || insight2,
        }))
      );
    }
  };

  const handleCoverSelect = (f: File | null) => {
    setCoverFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = (e) => setCoverPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setCoverPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim() || !user) return;
    setUploading(true);
    try {
      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("resources")
        .upload(filePath, file, { contentType: file.type });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("resources")
        .getPublicUrl(filePath);

      let coverUrl: string | null = null;
      if (coverFile) {
        const coverPath = `${user.id}/covers/${Date.now()}-${coverFile.name}`;
        const { error: coverError } = await supabase.storage
          .from("resources")
          .upload(coverPath, coverFile, { contentType: coverFile.type });
        if (coverError) throw coverError;
        const { data: coverData } = supabase.storage
          .from("resources")
          .getPublicUrl(coverPath);
        coverUrl = coverData.publicUrl;
      }

      const { error: insertError } = await supabase.from("resources").insert({
        title: title.trim(),
        description: description.trim() || null,
        category,
        file_url: urlData.publicUrl,
        file_name: file.name,
        uploaded_by: user.id,
        cover_image_url: coverUrl,
      });
      if (insertError) throw insertError;

      toast({ title: "Insight published", description: "Your PDF has been added to Featured Insights." });
      setTitle("");
      setDescription("");
      setCategory("General");
      setFile(null);
      setCoverFile(null);
      setCoverPreview(null);
      setShowUpload(false);
      fetchInsights();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (insight: Insight) => {
    if (!user) return;
    const pathMatch = insight.file_url.match(/resources\/(.+)$/);
    if (pathMatch) {
      await supabase.storage.from("resources").remove([pathMatch[1]]);
    }
    if (insight.cover_image_url) {
      const coverMatch = insight.cover_image_url.match(/resources\/(.+)$/);
      if (coverMatch) {
        await supabase.storage.from("resources").remove([coverMatch[1]]);
      }
    }
    await supabase.from("resources").delete().eq("id", insight.id);
    toast({ title: "Insight removed" });
    fetchInsights();
  };

  const handleCoverChange = async (insight: Insight) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const f = (e.target as HTMLInputElement).files?.[0];
      if (!f || !user) return;
      try {
        const coverPath = `${user.id}/covers/${Date.now()}-${f.name}`;
        const { error } = await supabase.storage
          .from("resources")
          .upload(coverPath, f, { contentType: f.type });
        if (error) throw error;
        const { data } = supabase.storage.from("resources").getPublicUrl(coverPath);

        if (insight.id.startsWith("default-")) {
          const idx = defaultInsights.findIndex(d => d.id === insight.id);
          if (idx !== -1) {
            defaultInsights[idx].image = data.publicUrl;
            defaultInsights[idx].cover_image_url = data.publicUrl;
          }
          toast({ title: "Cover updated" });
          setDbInsights(prev => [...prev]); // force re-render
        } else {
          await supabase.from("resources").update({ cover_image_url: data.publicUrl }).eq("id", insight.id);
          toast({ title: "Cover updated" });
          fetchInsights();
        }
      } catch (err: any) {
        toast({ title: "Failed to update cover", description: err.message, variant: "destructive" });
      }
    };
    input.click();
  };

  const InsightCard = ({ item, featured = false }: { item: Insight; featured?: boolean }) => (
    <article
      className={`group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden rounded-xl ${
        featured ? "bg-card md:col-span-2 md:grid md:grid-cols-2" : "bg-card flex flex-col"
      }`}
      onClick={() => window.open(item.file_url, "_blank", "noopener,noreferrer")}
    >
      <div className={`overflow-hidden relative ${featured ? "h-64 md:h-full" : "h-56"}`}>
        <img
          src={item.image || insight2}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wide uppercase">
            {item.category}
          </span>
        </div>
        {isAdmin && editMode && (
          <button
            onClick={(e) => { e.stopPropagation(); handleCoverChange(item); }}
            className="absolute top-4 right-4 bg-background/80 text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            title="Change cover image"
          >
            <ImagePlus size={16} />
          </button>
        )}
      </div>
      <div className={`p-6 flex flex-col ${featured ? "justify-center" : "flex-1"}`}>
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-sans mb-3">
          <Calendar size={12} />
          {formatDate(item.created_at)}
        </div>
        <h3 className={`font-serif font-bold text-foreground leading-snug mb-3 group-hover:text-accent transition-colors duration-300 ${
          featured ? "text-2xl md:text-3xl" : "text-lg"
        }`}>
          {item.title}
        </h3>
        <p className={`text-muted-foreground font-sans leading-relaxed mb-5 ${
          featured ? "text-base" : "text-sm flex-1"
        }`}>
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-accent font-sans text-sm font-semibold group-hover:gap-3 transition-all duration-300">
            <BookOpen size={14} />
            Read Insight
            <ArrowRight size={14} />
          </span>
          {isAdmin && editMode && !item.id.startsWith("default-") && (
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
              className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-full hover:bg-destructive/10"
              title="Delete insight"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );

  return (

      <section id="insights" className="py-24 md:py-32 bg-secondary section-padding">
        <div className="container-editorial">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
              <div>
                <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
                  Featured Insights
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-3">
                  Latest Thinking
                </h2>
                <p className="text-muted-foreground font-sans text-lg max-w-xl">
                  Explore our research, frameworks, and strategic perspectives shaping the future.
                </p>
              </div>
              {isAdmin && editMode && (
                <Button
                  variant="corporate"
                  onClick={() => setShowUpload(!showUpload)}
                  className="shrink-0"
                >
                  {showUpload ? (
                    <><X size={16} className="mr-2" /> Cancel</>
                  ) : (
                    <><Plus size={16} className="mr-2" /> Add Insight</>
                  )}
                </Button>
              )}
            </div>
          </ScrollReveal>

          {/* Admin Upload Form */}
          {showUpload && isAdmin && (
            <ScrollReveal>
              <div className="bg-card border border-border rounded-xl p-6 mb-12 space-y-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Publish New Insight (PDF)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insight-title">Title *</Label>
                    <Input id="insight-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. AI Strategy for 2026" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insight-category">Category</Label>
                    <Input id="insight-category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Digital & AI, Sustainability" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insight-desc">Description</Label>
                  <Input id="insight-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary of the insight" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insight-file">PDF File *</Label>
                    <Input id="insight-file" type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insight-cover">Cover Image (optional)</Label>
                    <Input id="insight-cover" type="file" accept="image/*" onChange={(e) => handleCoverSelect(e.target.files?.[0] || null)} />
                  </div>
                </div>
                {coverPreview && (
                  <div className="w-32 h-20 rounded-lg overflow-hidden border border-border">
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <Button variant="corporate" onClick={handleUpload} disabled={uploading || !file || !title.trim()}>
                  <Upload size={16} className="mr-2" />
                  {uploading ? "Publishing…" : "Publish Insight"}
                </Button>
              </div>
            </ScrollReveal>
          )}

          {/* Featured + Grid Layout */}
          {allInsights.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Featured large card */}
              <ScrollReveal>
                <InsightCard item={featuredInsight} featured />
              </ScrollReveal>

              {/* Remaining cards */}
              {restInsights.map((item, i) => (
                <ScrollReveal key={item.id} delay={(i + 1) * 0.1}>
                  <InsightCard item={item} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

  );
};

export default InsightsSection;
