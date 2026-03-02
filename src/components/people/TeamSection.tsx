import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { teamMembers, practiceAreas, industries, offices } from "@/data/peopleData";

const TeamSection = () => {
  const [filterArea, setFilterArea] = useState("All");
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [filterOffice, setFilterOffice] = useState("All");

  const filtered = useMemo(
    () =>
      teamMembers.filter(
        (m) =>
          (filterArea === "All" || m.practiceArea === filterArea) &&
          (filterIndustry === "All" || m.industry === filterIndustry) &&
          (filterOffice === "All" || m.office === filterOffice)
      ),
    [filterArea, filterIndustry, filterOffice]
  );

  const FilterRow = ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground font-sans text-xs tracking-wide uppercase font-semibold mr-2">
        {label}:
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 font-sans text-xs transition-all duration-200 ${
            value === opt
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <section className="py-20 md:py-28 section-padding">
      <div className="container-editorial">
        <ScrollReveal>
          <p className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-4">
            The Team
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-10">
            Our Consultants
          </h2>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal>
          <div className="space-y-3 mb-12 p-6 bg-secondary">
            <FilterRow label="Practice" options={practiceAreas} value={filterArea} onChange={setFilterArea} />
            <FilterRow label="Industry" options={industries} value={filterIndustry} onChange={setFilterIndustry} />
            <FilterRow label="Office" options={offices} value={filterOffice} onChange={setFilterOffice} />
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[200px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-card border border-border"
              >
                <div className="overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-52 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-serif text-base font-semibold text-foreground">
                    {m.name}
                  </h4>
                  <p className="text-muted-foreground font-sans text-xs mb-1">
                    {m.role}
                  </p>
                  <p className="text-accent font-sans text-xs font-medium">
                    {m.practiceArea}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground font-sans">
              No team members match the current filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
