import ScrollReveal from "@/components/ScrollReveal";
import { TrendingUp, Cpu, Leaf, Landmark, ShieldCheck } from "lucide-react";

const capabilities = [
  {
    icon: TrendingUp,
    title: "Strategy & Corporate Finance",
    text: "Helping leaders make bold strategic choices that drive sustainable growth and competitive advantage.",
  },
  {
    icon: Cpu,
    title: "Digital & AI",
    text: "Accelerating digital transformation through data-driven insights, automation, and AI-powered solutions.",
  },
  {
    icon: Leaf,
    title: "Sustainability & ESG",
    text: "Embedding environmental and social governance into core business strategy for long-term value creation.",
  },
  {
    icon: Landmark,
    title: "Public Sector Transformation",
    text: "Modernizing government institutions to deliver efficient, citizen-centric public services.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Resilience",
    text: "Building organizational resilience through proactive risk management and crisis preparedness.",
  },
];

const CapabilitiesSection = () => (
  <section id="capabilities" className="py-24 md:py-32 section-padding">
    <div className="container-editorial">
      <ScrollReveal>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          What We Do
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-16">
          Our Capabilities
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
        {capabilities.map((cap, i) => (
          <ScrollReveal key={cap.title} delay={i * 0.1}>
            <div className="group">
              <div className="w-12 h-12 flex items-center justify-center mb-5 text-accent transition-transform duration-300 group-hover:scale-110">
                <cap.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {cap.title}
              </h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                {cap.text}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
