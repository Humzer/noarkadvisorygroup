import SubscribeDialog from "@/components/SubscribeDialog";
import noarkLogo from "@/assets/noark-logo.jpeg";

const footerLinks = {
  Industries: [
    { label: "Financial Services", href: "/#industries" },
    { label: "Healthcare", href: "/#industries" },
    { label: "Energy", href: "/#industries" },
    { label: "Technology", href: "/#industries" },
    { label: "Public Sector", href: "/#industries" },
  ],
  Capabilities: [
    { label: "Strategy", href: "/#capabilities" },
    { label: "Digital & AI", href: "/#capabilities" },
    { label: "Sustainability", href: "/#capabilities" },
    { label: "Risk", href: "/#capabilities" },
    { label: "Operations", href: "/#capabilities" },
  ],
  Insights: [
    { label: "Latest Articles", href: "/#insights" },
    { label: "Reports", href: "/#insights" },
    { label: "Podcasts", href: "/#insights" },
    { label: "Newsletters", href: "/#insights" },
  ],
  Careers: [
    { label: "Open Roles", href: "/#careers" },
    { label: "Life at Noark", href: "/#careers" },
    { label: "Students & Graduates", href: "/#careers" },
  ],
};

const SiteFooter = () => (
  <footer id="footer" className="bg-primary section-padding py-16 md:py-20">
    <div className="container-editorial">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
        <div className="col-span-2 md:col-span-1">
          <img src={noarkLogo} alt="Noark Advisory Council" className="h-10 rounded-sm mb-4" />
          <p className="text-primary-foreground/50 font-sans text-sm leading-relaxed mb-4">
            Strategic Foresight & Resilience. Helping organisations worldwide
            navigate complexity and drive transformation.
          </p>
          <div className="text-primary-foreground/50 font-sans text-sm leading-relaxed space-y-1">
            <p>Via Piero della Francesc, 95</p>
            <p>Perugia, Italy</p>
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-sans text-sm font-semibold text-primary-foreground mb-4 tracking-wide">
              {title}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/50 hover:text-accent font-sans text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Subscribe + Bottom bar */}
      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6 text-primary-foreground/40 font-sans text-xs items-center">
          <a href="/#about" className="hover:text-primary-foreground/70 transition-colors">
            Privacy Policy
          </a>
          <a href="/#about" className="hover:text-primary-foreground/70 transition-colors">
            Terms of Use
          </a>
          <a href="/#about" className="hover:text-primary-foreground/70 transition-colors">
            Cookie Notice
          </a>
          <span>© 2026 Noark Advisory Council</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-primary-foreground/50 text-sm font-sans">Stay updated:</span>
          <SubscribeDialog variant="footer" />
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
