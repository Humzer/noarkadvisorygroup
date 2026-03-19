import { useState } from "react";
import { MessageCircle, Mail, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTeamMembers, getImageUrl } from "@/hooks/useTeamMembers";
import type { TeamMember } from "@/hooks/useTeamMembers";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "shuaib" | "team";
}

const SHUAIB_EMAIL = "s.sharif@noarkadvisory.com";
const SHUAIB_WHATSAPP = "https://wa.me/393520024587";

const ContactMethodPicker = ({
  name,
  email,
  whatsapp,
}: {
  name: string;
  email: string;
  whatsapp?: string;
}) => (
  <div className="flex flex-col gap-3">
    <a
      href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-secondary transition-colors"
    >
      <Mail className="w-5 h-5 text-accent shrink-0" />
      <div>
        <p className="font-sans font-medium text-foreground text-sm">Email</p>
        <p className="font-sans text-muted-foreground text-xs">{email}</p>
      </div>
    </a>
    {whatsapp && (
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-secondary transition-colors"
      >
        <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
        <div>
          <p className="font-sans font-medium text-foreground text-sm">WhatsApp</p>
          <p className="font-sans text-muted-foreground text-xs">Send a message on WhatsApp</p>
        </div>
      </a>
    )}
  </div>
);

const ContactDialog = ({ open, onOpenChange, mode }: ContactDialogProps) => {
  const { data: members = [] } = useTeamMembers();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleOpenChange = (val: boolean) => {
    if (!val) setSelectedMember(null);
    onOpenChange(val);
  };

  // Mode: direct contact with Shuaib (WhatsApp or Email)
  if (mode === "shuaib") {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif">Get In Touch</DialogTitle>
            <DialogDescription>
              How would you like to reach Shuaib?
            </DialogDescription>
          </DialogHeader>
          <ContactMethodPicker
            name="Shuaib Yussuf Sharif"
            email={SHUAIB_EMAIL}
            whatsapp={SHUAIB_WHATSAPP}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Mode: pick a team member, then show contact methods
  if (selectedMember) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif">Contact {selectedMember.name}</DialogTitle>
            <DialogDescription>
              Choose how you'd like to reach out.
            </DialogDescription>
          </DialogHeader>
          <ContactMethodPicker
            name={selectedMember.name}
            email={selectedMember.email}
          />
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => setSelectedMember(null)}
          >
            ← Back to team
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif">Contact Our Team</DialogTitle>
          <DialogDescription>
            Select a team member to get in touch with.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-secondary transition-colors text-left"
            >
              <img
                src={getImageUrl(member)}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover object-top"
              />
              <div>
                <p className="font-sans font-medium text-foreground text-sm">
                  {member.name}
                </p>
                <p className="font-sans text-muted-foreground text-xs">
                  {member.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
