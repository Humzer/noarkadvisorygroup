import ScrollReveal from "@/components/ScrollReveal";
import EditableImage from "@/components/EditableImage";
import diversityImage from "@/assets/diversity-image.jpg";

const DiversitySection = () => (
  <section className="py-20 md:py-28 bg-secondary section-padding">
    <div className="container-editorial grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <ScrollReveal>
        <EditableImage
          imageKey="diversity-image"
          fallback={diversityImage}
          alt="Diverse team of professionals"
          className="w-full h-[400px] object-cover"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          Diversity & Inclusion
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground leading-tight mb-6">
          Diverse Perspectives.
          <br />
          Stronger Outcomes.
        </h2>
        <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-8">
          We believe that the best solutions emerge from multidisciplinary teams
          that reflect the diversity of the communities we serve. Our
          consultants bring local knowledge, global expertise, and a wide range
          of lived experiences to every engagement.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {[
            { value: "50%+", label: "Local Leadership" },
            { value: "40%", label: "Women in Senior Roles" },
            { value: "10+", label: "Languages Spoken" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-2xl md:text-3xl font-bold text-accent mb-1">
                {stat.value}
              </p>
              <p className="text-muted-foreground font-sans text-xs leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default DiversitySection;
