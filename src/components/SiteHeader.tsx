import { useState, useEffect } from "react";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Industries", href: "#industries" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Insights", href: "#insights" },
  { label: "Careers", href: "#careers" },
  { label: "About Us", href: "#about" },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="section-padding container-editorial flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl font-bold text-primary-foreground tracking-tight">
              Strat<span className="text-accent">Edge</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="editorial-link text-primary-foreground/80 hover:text-primary-foreground text-sm font-sans font-medium tracking-wide transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="text-primary-foreground/70 hover:text-primary-foreground transition-colors hidden md:block">
              <Search size={18} />
            </button>

            <div className="hidden md:flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground cursor-pointer text-sm font-sans transition-colors">
              <span>Kenya</span>
              <ChevronDown size={14} />
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-primary-foreground"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-primary z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6">
                <span className="font-serif text-xl font-bold text-primary-foreground">
                  Strat<span className="text-accent">Edge</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-primary-foreground"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-6 mt-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-primary-foreground/80 hover:text-primary-foreground py-3 border-b border-primary-foreground/10 text-lg font-sans transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto p-6">
                <div className="flex items-center gap-2 text-primary-foreground/60 text-sm font-sans">
                  <span>Region: Kenya</span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
