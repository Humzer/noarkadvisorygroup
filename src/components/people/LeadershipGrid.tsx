import { ArrowRight, Pencil } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useAdmin } from "@/hooks/useAdmin";
import { useEditMode } from "@/contexts/EditModeContext";
import type { TeamMember } from "@/hooks/useTeamMembers";
import { getImageUrl } from "@/hooks/useTeamMembers";

interface Props {
  members: TeamMember[];
  onViewProfile: (member: TeamMember) => void;
  onEditProfile?: (member: TeamMember) => void;
}

const LeadershipGrid = ({ members, onViewProfile, onEditProfile }: Props) => {
  const { isAdmin } = useAdmin();

  return (
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
          {members.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 0.1}>
              <article className="group bg-card cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl relative">
                {isAdmin && onEditProfile && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onEditProfile(member); }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-accent text-accent-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    title="Edit Profile"
                  >
                    <Pencil size={14} />
                  </button>
                )}
                <div className="overflow-hidden" onClick={() => onViewProfile(member)}>
                  <img
                    src={getImageUrl(member)}
                    alt={member.name}
                    className="w-full h-72 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6" onClick={() => onViewProfile(member)}>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-sans text-sm font-medium mb-3">
                    {member.title}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.focus_areas.map((area) => (
                      <span
                        key={area}
                        className="text-xs font-sans text-muted-foreground bg-secondary px-2 py-1"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">
                    {member.bio}
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
};

export default LeadershipGrid;
