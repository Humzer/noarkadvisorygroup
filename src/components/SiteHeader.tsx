import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminSettings from "@/components/AdminSettings";
import SubscribeDialog from "@/components/SubscribeDialog";
import noarkLogo from "@/assets/noark-logo.jpeg";

const navItems = [
  { label: "Industries", href: "/#industries" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Insights", href: "/#insights" },
  { label: "People", href: "/people" },
  { label: "Careers", href: "/#careers" },
  { label: "About Us", href: "/#about" },
];

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
          <Link to="/" className="flex items-center gap-2">
            <img src={noarkLogo} alt="Noark Advisory Group" className="h-8 md:h-10 rounded-sm" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.href.startsWith("/") && !item.href.includes("#") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="editorial-link text-primary-foreground/80 hover:text-primary-foreground text-sm font-sans font-medium tracking-wide transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="editorial-link text-primary-foreground/80 hover:text-primary-foreground text-sm font-sans font-medium tracking-wide transition-colors duration-200"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <AdminSettings />
            <SubscribeDialog variant="header" />
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-primary-foreground/70 text-sm font-sans truncate max-w-[120px]">
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={signOut}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  title="Sign out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Button
                variant="hero"
                size="sm"
                className="hidden md:inline-flex"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}

            <button
              className="lg:hidden text-primary-foreground"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

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
                <img src={noarkLogo} alt="Noark Advisory Group" className="h-8 rounded-sm" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-primary-foreground"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-6 mt-4">
                {navItems.map((item) =>
                  item.href.startsWith("/") && !item.href.includes("#") ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-primary-foreground/80 hover:text-primary-foreground py-3 border-b border-primary-foreground/10 text-lg font-sans transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-primary-foreground/80 hover:text-primary-foreground py-3 border-b border-primary-foreground/10 text-lg font-sans transition-colors"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </nav>
              <div className="mt-auto p-6 space-y-3">
                <SubscribeDialog variant="footer" />
                {user ? (
                  <button
                    onClick={() => { signOut(); setMobileOpen(false); }}
                    className="flex items-center gap-2 text-primary-foreground/60 text-sm font-sans"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                ) : (
                  <Button
                    variant="hero"
                    size="sm"
                    className="w-full"
                    onClick={() => { navigate("/auth"); setMobileOpen(false); }}
                  >
                    Sign In / Create Account
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
