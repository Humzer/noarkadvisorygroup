import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import careersImage from "@/assets/careers-image.jpg";

const CareersSection = () => (
  <section id="careers" className="py-24 md:py-32 section-padding">
    <div className="container-editorial grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <ScrollReveal>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          Careers
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
          Build the Future With Us
        </h2>
        <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-8">
          Join a team of exceptional thinkers and doers who are shaping the
          future of business and society across the globe. We invest in your
          growth, challenge your thinking, and give you the platform to make a
          real difference.
        </p>
        <Button variant="corporate" size="lg">
          Explore Opportunities
        </Button>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <img
          src={careersImage}
          alt="Diverse professionals collaborating"
          className="w-full h-[450px] object-cover"
          loading="lazy"
        />
      </ScrollReveal>
    </div>
  </section>
);

export default CareersSection;
