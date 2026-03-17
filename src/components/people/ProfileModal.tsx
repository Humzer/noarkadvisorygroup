import { X, Mail, Linkedin, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TeamMember } from "@/hooks/useTeamMembers";
import { getImageUrl } from "@/hooks/useTeamMembers";

interface Props {
  member: TeamMember | null;
  onClose: () => void;
}

const ProfileModal = ({ member, onClose }: Props) => (
  <AnimatePresence>
    {member && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "tween", duration: 0.35 }}
          className="fixed inset-0 md:inset-4 lg:inset-8 z-50 overflow-y-auto bg-background md:rounded-lg"
        >
          <button
            onClick={onClose}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 flex items-center justify-center bg-secondary rounded-full text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <X size={18} />
          </button>

          <div className="section-padding container-editorial py-12 md:py-16">
            <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[400px_1fr] gap-10 md:gap-16 mb-16">
              <img
                src={getImageUrl(member)}
                alt={member.name}
                className="w-full h-[400px] md:h-[500px] object-cover object-top"
              />
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                  {member.name}
                </h1>
                <p className="text-accent font-sans text-lg font-medium mb-4">
                  {member.title}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground font-sans text-sm mb-6">
                  <MapPin size={14} />
                  <span>{member.office} Office</span>
                </div>
                <div className="flex gap-3 mb-8">
                  <a
                    href={`mailto:${member.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-sans text-sm hover:bg-primary/90 transition-colors"
                  >
                    <Mail size={14} />
                    Email
                  </a>
                </div>

                <div>
                  <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground font-semibold mb-3">
                    Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary text-foreground font-sans text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  About
                </h2>
                <div className="space-y-4">
                  {member.full_bio.map((para, i) => (
                    <p
                      key={i}
                      className="text-muted-foreground font-sans leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <h2 className="font-serif text-2xl font-bold text-foreground mt-12 mb-6">
                  Experience Highlights
                </h2>
                <ul className="space-y-3">
                  {member.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-muted-foreground font-sans text-sm leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground font-semibold mb-4">
                    Education
                  </h3>
                  <ul className="space-y-2">
                    {member.education.map((edu) => (
                      <li
                        key={edu}
                        className="text-foreground font-sans text-sm"
                      >
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground font-semibold mb-4">
                    Publications & Insights
                  </h3>
                  <ul className="space-y-4">
                    {member.publications.map((pub) => (
                      <li key={pub.title}>
                        <a
                          href="#"
                          className="editorial-link font-sans text-sm text-foreground font-medium leading-snug block"
                        >
                          {pub.title}
                        </a>
                        <span className="text-muted-foreground font-sans text-xs">
                          {pub.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default ProfileModal;
