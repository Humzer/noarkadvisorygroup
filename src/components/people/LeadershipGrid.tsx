import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import type { Leader } from "@/data/peopleData";

interface Props {
  leaders: Leader[];
  onViewProfile: (leader: Leader) => void;
}

const LeadershipGrid = ({ leaders, onViewProfile }: Props) => (
  <section className="py-20 md:py-28 section-padding bg-secondary">
    <div className="container-editorial">
      <ScrollReveal>
        <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
          Senior Leadership
        </p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-14">
          Our Partners
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader, i) => (
          <ScrollReveal key={leader.id} delay={i * 0.1}>
            <article
              className="group bg-card cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              onClick={() => onViewProfile(leader)}
            >
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
                <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">
                  {leader.bio}
                </p>
                <span className="inline-flex items-center gap-2 text-foreground font-sans text-sm font-medium editorial-link group-hover:text-accent transition-colors duration-300">
                  View Profile
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

export default LeadershipGrid;
