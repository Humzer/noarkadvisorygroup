import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { FileText, Download, Eye, Upload, Trash2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  file_name: string;
  created_at: string;
  uploaded_by: string | null;
}

const sampleResources = [
  {
    id: "sample-1",
    title: "Global Strategy & Advisory Report 2026",
    description: "An in-depth analysis of strategic advisory trends shaping global markets, with actionable frameworks for enterprise leaders.",
    category: "Strategy",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2026-02-01",
    uploaded_by: null,
  },
  {
    id: "sample-2",
    title: "Digital Transformation Playbook",
    description: "A comprehensive guide to implementing AI-driven digital transformation across industries worldwide.",
    category: "Digital & AI",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2026-01-01",
    uploaded_by: null,
  },
  {
    id: "sample-3",
    title: "ESG & Sustainability Framework for Emerging Markets",
    description: "Best practices and case studies for integrating ESG principles into corporate strategy in developing economies.",
    category: "Sustainability",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2025-12-01",
    uploaded_by: null,
  },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const ResourcesSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dbResources, setDbResources] = useState<Resource[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [file, setFile] = useState<File | null>(null);

  const allResources = [...dbResources, ...sampleResources];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setDbResources(data);
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

      const { data: urlData } = supabase.storage.from("resources").getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("resources").insert({
        title: title.trim(),
        description: description.trim() || null,
        category,
        file_url: urlData.publicUrl,
        file_name: file.name,
        uploaded_by: user.id,
      });
      if (insertError) throw insertError;

      toast({ title: "Upload successful", description: "Your PDF has been published." });
      setTitle("");
      setDescription("");
      setCategory("General");
      setFile(null);
      setShowUpload(false);
      fetchResources();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (resource: Resource) => {
    if (!user || resource.uploaded_by !== user.id) return;
    const pathMatch = resource.file_url.match(/resources\/(.+)$/);
    if (pathMatch) {
      await supabase.storage.from("resources").remove([pathMatch[1]]);
    }
    await supabase.from("resources").delete().eq("id", resource.id);
    toast({ title: "Resource deleted" });
    fetchResources();
  };

  return (
    <section id="resources" className="py-24 md:py-32 section-padding">
      <div className="container-editorial">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
                Publications & Reports
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Resource Library
              </h2>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed max-w-2xl">
                Access our latest research, whitepapers, and strategic reports. Click to read online or download.
              </p>
            </div>
            {user ? (
              <Button
                variant="corporate"
                onClick={() => setShowUpload(!showUpload)}
                className="shrink-0"
              >
                <Upload size={16} className="mr-2" />
                Upload PDF
              </Button>
            ) : (
              <Button variant="outline" asChild className="shrink-0">
                <Link to="/auth">
                  <LogIn size={16} className="mr-2" />
                  Sign in to Upload
                </Link>
              </Button>
            )}
          </div>
        </ScrollReveal>

        {/* Upload form */}
        {showUpload && user && (
          <ScrollReveal>
            <div className="bg-card border border-border p-6 mb-10 space-y-4">
              <h3 className="font-serif text-lg font-semibold text-foreground">Upload a PDF Resource</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="res-title">Title *</Label>
                  <Input id="res-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Report title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="res-category">Category</Label>
                  <Input id="res-category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Strategy, Digital & AI" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="res-desc">Description</Label>
                <Input id="res-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the resource" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="res-file">PDF File *</Label>
                <Input
                  id="res-file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button variant="corporate" onClick={handleUpload} disabled={uploading || !file || !title.trim()}>
                {uploading ? "Uploading…" : "Publish Resource"}
              </Button>
            </div>
          </ScrollReveal>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {allResources.map((resource, i) => (
            <ScrollReveal key={resource.id} delay={i * 0.12}>
              <div className="group bg-card border border-border h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="p-6 pb-0 flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center">
                    <FileText size={24} className="text-accent" />
                  </div>
                  <span className="text-accent font-sans text-xs tracking-[0.15em] uppercase font-semibold">
                    {resource.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 leading-snug">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-xs mb-3">
                    {formatDate(resource.created_at)}
                  </p>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6 flex-1">
                    {resource.description}
                  </p>

                  <div className="flex gap-3">
                    <Button
                      variant="corporate"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(resource.file_url, "_blank")}
                    >
                      <Eye size={14} className="mr-2" />
                      Read
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={resource.file_url} download={resource.file_name}>
                        <Download size={14} className="mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                  {user && resource.uploaded_by === user.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(resource as Resource)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
