import { useState } from "react";
import { Shield, Settings, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "@/hooks/useAdmin";
import SignOutDialog from "@/components/SignOutDialog";

const AdminSettings = () => {
  const { user, isAdmin, signOut } = useAdmin();
  const [open, setOpen] = useState(false);

  if (!isAdmin || !user) return null;

  return (
    <>
      {/* Admin badge button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 bg-accent/15 text-accent px-2.5 py-1 rounded-full text-xs font-sans font-semibold tracking-wide hover:bg-accent/25 transition-colors"
        title="Admin Settings"
      >
        <Shield size={14} />
        Admin
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 right-6 w-80 bg-card border border-border rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Settings size={16} className="text-accent" />
                  <h3 className="font-serif text-sm font-semibold text-foreground">Admin Settings</h3>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Profile info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Shield size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </p>
                    <p className="text-xs font-sans text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-3 space-y-2">
                  <p className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Permissions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Upload Insights", "Delete Insights", "Manage Resources"].map((perm) => (
                      <span
                        key={perm}
                        className="bg-accent/10 text-accent text-xs font-sans px-2 py-0.5 rounded"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                <SignOutDialog onConfirm={() => { signOut(); setOpen(false); }}>
                  <Button variant="outline" size="sm" className="w-full">
                    <LogOut size={14} className="mr-2" />
                    Sign Out
                  </Button>
                </SignOutDialog>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSettings;
