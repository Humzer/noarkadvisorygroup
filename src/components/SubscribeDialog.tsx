import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscribeDialogProps {
  variant?: "header" | "footer";
}

const SubscribeDialog = ({ variant = "header" }: SubscribeDialogProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: email.trim().toLowerCase() });
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already subscribed", description: "This email is already on our list." });
        } else {
          throw error;
        }
      } else {
        toast({ title: "Subscribed!", description: "You'll receive our latest insights." });
      }
      setEmail("");
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "footer" ? (
          <Button variant="hero" size="sm" className="gap-2">
            <Bell size={14} />
            Subscribe
          </Button>
        ) : (
          <Button variant="hero-outline" size="sm" className="hidden md:inline-flex gap-2">
            <Bell size={14} />
            Subscribe
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Subscribe to Insights</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm font-sans">
          Get our latest research, reports, and strategic insights delivered to your inbox.
        </p>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          />
          <Button variant="corporate" onClick={handleSubscribe} disabled={loading}>
            {loading ? "…" : "Subscribe"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeDialog;
