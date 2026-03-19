import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/people/ContactDialog";

const PeopleHero = () => {
  const [contactMode, setContactMode] = useState<"shuaib" | "team" | null>(null);

  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 section-padding bg-background">
        <div className="container-editorial max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-accent font-sans text-sm tracking-[0.2em] uppercase mb-6"
          >
            Global Leadership
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground leading-[1.15] mb-8 text-balance"
          >
            Meet the Leaders Shaping the Future of Global Strategy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground font-sans text-lg md:text-xl leading-relaxed mb-10"
          >
            Our team of experienced advisors partners with CEOs, governments, and
            institutions worldwide to solve their most complex challenges and build
            lasting value across every continent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="corporate" size="lg" onClick={() => setContactMode("team")}>
              Contact Our Team
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://mail.google.com/mail/?view=cm&to=s.sharif%40noarkadvisory.com" target="_blank" rel="noopener noreferrer">Join Us</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <ContactDialog
        open={contactMode !== null}
        onOpenChange={(open) => !open && setContactMode(null)}
        mode={contactMode || "shuaib"}
      />
    </>
  );
};

export default PeopleHero;
