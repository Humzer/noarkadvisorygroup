import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { leaders } from "@/data/peopleData";
import { Button } from "@/components/ui/button";

const previewLeaders = leaders.slice(0, 3);

const PeoplePreview = () => (
  <section className="py-24 md:py-32 bg-secondary section-padding">
    <div className="container-editorial">
      <ScrollReveal>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          Our People
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-14">
          Meet Our Leadership
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {previewLeaders.map((leader, i) => (
          <ScrollReveal key={leader.id} delay={i * 0.1}>
            <article className="group bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-72 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                  {leader.name}
                </h3>
                <p className="text-accent font-sans text-sm font-medium mb-3">
                  {leader.title}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {leader.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs font-sans text-muted-foreground bg-secondary px-2 py-1"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed line-clamp-3">
                  {leader.bio}
                </p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="text-center">
          <Button variant="corporate" size="lg" asChild>
            <Link to="/people">
              View All People
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default PeoplePreview;
