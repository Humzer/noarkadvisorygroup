import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const JoinCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 bg-primary section-padding">
      <div className="container-editorial max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Build What Matters
          </h2>
          <p className="text-primary-foreground/60 font-sans text-lg leading-relaxed mb-10">
            Join a team of thinkers and doers who are shaping the future of
            business and society across East Africa. If you're driven by impact,
            we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:s.sharif@noarkadvisory.com">Get In Touch</a>
            </Button>
            <Button variant="hero-outline" size="lg" onClick={() => navigate("/#careers")}>
              View Open Roles
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default JoinCTA;
