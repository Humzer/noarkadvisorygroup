import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import insight1 from "@/assets/insight-1.jpg";
import insight2 from "@/assets/insight-2.jpg";
import insight3 from "@/assets/insight-3.jpg";

const insights = [
  {
    category: "Digital & AI",
    title: "How East African Enterprises Can Leapfrog with AI",
    description:
      "A framework for leaders to accelerate digital adoption and build AI-ready organizations.",
    image: insight1,
  },
  {
    category: "Sustainability",
    title: "The Green Transition: Opportunities for Kenya's Private Sector",
    description:
      "Exploring how ESG frameworks create competitive advantage in emerging markets.",
    image: insight2,
  },
  {
    category: "Public Sector",
    title: "Reimagining Public Service Delivery in the Digital Age",
    description:
      "How governments across Africa are modernizing citizen services through technology.",
    image: insight3,
  },
];

const InsightsSection = () => (
  <section id="insights" className="py-24 md:py-32 bg-secondary section-padding">
    <div className="container-editorial">
      <ScrollReveal>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          Featured Insights
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12">
          Latest Thinking
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {insights.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.15}>
            <article className="group bg-card h-full flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
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
                <span className="inline-flex items-center gap-2 text-foreground font-sans text-sm font-medium group-hover:text-accent transition-colors duration-300">
                  Read More
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default InsightsSection;
