import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import EditableImage from "@/components/EditableImage";
import impactMain from "@/assets/impact-main.jpg";
import insight1 from "@/assets/insight-1.jpg";
import insight2 from "@/assets/insight-2.jpg";

const stories = [
  {
    key: "impact-story-1",
    image: insight1,
    title: "Digital Identity Systems for Financial Inclusion",
    desc: "Partnering with financial regulators globally to build inclusive digital identity frameworks.",
  },
  {
    key: "impact-story-2",
    image: insight2,
    title: "Accelerating the Renewable Energy Transition",
    desc: "Advisory support for large-scale solar and wind energy investment programmes across emerging markets.",
  },
];

const ImpactSection = () => (
  <section className="py-24 md:py-32 bg-primary section-padding">
    <div className="container-editorial">
      <ScrollReveal>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          Our Impact
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-12">
          Stories of Transformation
        </h2>
      </ScrollReveal>

      {/* Featured story */}
      <ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="overflow-hidden">
            <EditableImage
              imageKey="impact-main"
              fallback={impactMain}
              alt="Community development initiative"
              className="w-full h-80 md:h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center py-4">
            <span className="text-accent font-sans text-xs tracking-[0.15em] uppercase font-semibold mb-4">
              Featured Story
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-4 leading-snug">
              Empowering Communities Through Infrastructure Innovation
            </h3>
            <p className="text-primary-foreground/60 font-sans leading-relaxed mb-6">
              Working alongside governments worldwide, Noark Advisory Council
              helped design community-led infrastructure programmes that have
              improved access to clean water for over 200,000 residents across multiple regions.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Smaller stories */}
      <div className="grid md:grid-cols-2 gap-8">
        {stories.map((story, i) => (
          <ScrollReveal key={story.title} delay={i * 0.15}>
            <div className="group flex gap-6 cursor-pointer">
              <EditableImage
                imageKey={story.key}
                fallback={story.image}
                alt={story.title}
                className="w-32 h-24 object-cover flex-shrink-0"
              />
              <div>
                <h4 className="font-serif text-lg font-semibold text-primary-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {story.title}
                </h4>
                <p className="text-primary-foreground/50 font-sans text-sm leading-relaxed">
                  {story.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
