import ScrollReveal from "@/components/ScrollReveal";
import EditableImage from "@/components/EditableImage";
import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => (
  <section id="about" className="py-24 md:py-32 section-padding">
    <div className="container-editorial grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <ScrollReveal>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          Who We Are
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
          Driving Impact Across the Globe
        </h2>
        <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
          Noark Advisory Group partners with governments, corporations, and
          institutions worldwide to tackle their most critical challenges. From our
          headquarters in Perugia, Italy, we bring world-class expertise in
          strategy, digital transformation, and organizational resilience to
          clients across Europe, Africa, the Middle East, and beyond.
        </p>
        <p className="text-muted-foreground font-sans leading-relaxed">
          Our consultants combine deep local knowledge with global best
          practices, helping our clients navigate complexity and deliver
          measurable, lasting results. We believe in building capacity, not
          dependency—empowering the next generation of leaders everywhere.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="relative">
          <EditableImage
            imageKey="about-image"
            fallback={aboutImage}
            alt="Noark Advisory Group team in strategic discussion"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-accent hidden md:block" />
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default AboutSection;
