import ScrollReveal from "@/components/ScrollReveal";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleResources = [
  {
    id: "1",
    title: "Global Strategy & Advisory Report 2026",
    description:
      "An in-depth analysis of strategic advisory trends shaping global markets, with actionable frameworks for enterprise leaders.",
    category: "Strategy",
    date: "February 2026",
    url: "/sample-report.pdf",
  },
  {
    id: "2",
    title: "Digital Transformation Playbook",
    description:
      "A comprehensive guide to implementing AI-driven digital transformation across industries worldwide.",
    category: "Digital & AI",
    date: "January 2026",
    url: "/sample-report.pdf",
  },
  {
    id: "3",
    title: "ESG & Sustainability Framework for Emerging Markets",
    description:
      "Best practices and case studies for integrating ESG principles into corporate strategy in developing economies.",
    category: "Sustainability",
    date: "December 2025",
    url: "/sample-report.pdf",
  },
];

const ResourcesSection = () => (
  <section id="resources" className="py-24 md:py-32 section-padding">
    <div className="container-editorial">
      <ScrollReveal>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          Publications & Reports
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
          Resource Library
        </h2>
        <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-12 max-w-2xl">
          Access our latest research, whitepapers, and strategic reports. Click to read online or download for later.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {sampleResources.map((resource, i) => (
          <ScrollReveal key={resource.id} delay={i * 0.12}>
            <div className="group bg-card border border-border h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              {/* Icon header */}
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
                  {resource.date}
                </p>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6 flex-1">
                  {resource.description}
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="corporate"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    <Eye size={14} className="mr-2" />
                    Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={resource.url} download>
                      <Download size={14} className="mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ResourcesSection;
