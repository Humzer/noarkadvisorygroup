import { Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Industries: ["Financial Services", "Healthcare", "Energy", "Technology", "Public Sector"],
  Capabilities: ["Strategy", "Digital & AI", "Sustainability", "Risk", "Operations"],
  Insights: ["Latest Articles", "Reports", "Podcasts", "Newsletters"],
  Careers: ["Open Roles", "Life at StratEdge", "Students & Graduates"],
};

const SiteFooter = () => (
  <footer className="bg-primary section-padding py-16 md:py-20">
    <div className="container-editorial">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-serif text-xl font-bold text-primary-foreground mb-4 block">
            Strat<span className="text-accent">Edge</span>
          </span>
          <p className="text-primary-foreground/50 font-sans text-sm leading-relaxed">
            A leading consulting firm helping organisations across East Africa
            navigate complexity and drive transformation.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-sans text-sm font-semibold text-primary-foreground mb-4 tracking-wide">
              {title}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/50 hover:text-accent font-sans text-sm transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6 text-primary-foreground/40 font-sans text-xs">
          <a href="#" className="hover:text-primary-foreground/70 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary-foreground/70 transition-colors">
            Terms of Use
          </a>
          <a href="#" className="hover:text-primary-foreground/70 transition-colors">
            Cookie Notice
          </a>
          <span>© 2026 StratEdge Consulting</span>
        </div>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-primary-foreground/40 hover:text-accent transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            className="text-primary-foreground/40 hover:text-accent transition-colors"
          >
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
