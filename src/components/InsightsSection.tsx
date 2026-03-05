import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Upload, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
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
  image?: string;
}

const defaultInsights: Insight[] = [
  {
    id: "default-1",
    category: "Digital & AI",
    title: "How Global Enterprises Can Leapfrog with AI",
    description:
      "A framework for leaders to accelerate digital adoption and build AI-ready organizations.",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2026-02-15",
    uploaded_by: null,
    image: insight1,
  },
  {
    id: "default-2",
    category: "Sustainability",
    title: "The Green Transition: Opportunities for the Private Sector",
    description:
      "Exploring how ESG frameworks create competitive advantage in emerging and developed markets.",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2026-01-20",
    uploaded_by: null,
    image: insight2,
  },
  {
    id: "default-3",
    category: "Public Sector",
    title: "Reimagining Public Service Delivery in the Digital Age",
    description:
      "How governments worldwide are modernizing citizen services through technology.",
    file_url: "/sample-report.pdf",
    file_name: "sample-report.pdf",
    created_at: "2025-12-10",
    uploaded_by: null,
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

const InsightsSection = () => {
  const { user, isAdmin } = useAdmin();
  const { toast } = useToast();
  const [dbInsights, setDbInsights] = useState<Insight[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [file, setFile] = useState<File | null>(null);

  const allInsights = [...dbInsights, ...defaultInsights];

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
        data.map((r) => ({
          ...r,
          image: categoryImages[r.category] || insight2,
        }))
      );
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

      const { error: insertError } = await supabase.from("resources").insert({
        title: title.trim(),
        description: description.trim() || null,
        category,
        file_url: urlData.publicUrl,
        file_name: file.name,
        uploaded_by: user.id,
      });
      if (insertError) throw insertError;

      toast({
        title: "Insight published",
        description: "Your PDF has been added to Featured Insights.",
      });
      setTitle("");
      setDescription("");
      setCategory("General");
      setFile(null);
      setShowUpload(false);
      fetchInsights();
    } catch (err: any) {
      toast({
        title: "Upload failed",
        description: err.message,
        variant: "destructive",
      });
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
    await supabase.from("resources").delete().eq("id", insight.id);
    toast({ title: "Insight removed" });
    fetchInsights();
  };

  return (
    <section id="insights" className="py-24 md:py-32 bg-secondary section-padding">
      <div className="container-editorial">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
                Featured Insights
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Latest Thinking
              </h2>
            </div>
            {isAdmin && (
              <Button
                variant="corporate"
                onClick={() => setShowUpload(!showUpload)}
                className="shrink-0"
              >
                {showUpload ? (
                  <>
                    <X size={16} className="mr-2" /> Cancel
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" /> Add Insight
                  </>
                )}
              </Button>
            )}
          </div>
        </ScrollReveal>

        {/* Admin Upload Form */}
        {showUpload && isAdmin && (
          <ScrollReveal>
            <div className="bg-card border border-border p-6 mb-10 space-y-4">
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Publish New Insight (PDF)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insight-title">Title *</Label>
                  <Input
                    id="insight-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. AI Strategy for 2026"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insight-category">Category</Label>
                  <Input
                    id="insight-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Digital & AI, Sustainability"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insight-desc">Description</Label>
                <Input
                  id="insight-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of the insight"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insight-file">PDF File *</Label>
                <Input
                  id="insight-file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button
                variant="corporate"
                onClick={handleUpload}
                disabled={uploading || !file || !title.trim()}
              >
                <Upload size={16} className="mr-2" />
                {uploading ? "Publishing…" : "Publish Insight"}
              </Button>
            </div>
          </ScrollReveal>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {allInsights.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.15}>
              <article
                className="group bg-card h-full flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                onClick={() => window.open(item.file_url, "_blank")}
              >
                <div className="overflow-hidden relative">
                  <img
                    src={item.image || insight2}
                    alt={item.title}
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-accent font-sans text-xs tracking-[0.15em] uppercase font-semibold mb-3">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-foreground font-sans text-sm font-medium group-hover:text-accent transition-colors duration-300">
                      Read More
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                    {isAdmin && item.uploaded_by && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item);
                        }}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        title="Delete insight"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
