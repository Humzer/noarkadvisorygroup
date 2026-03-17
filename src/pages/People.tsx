import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PeopleHero from "@/components/people/PeopleHero";
import LeadershipGrid from "@/components/people/LeadershipGrid";
import ProfileModal from "@/components/people/ProfileModal";

import DiversitySection from "@/components/people/DiversitySection";
import JoinCTA from "@/components/people/JoinCTA";
import TeamMemberEditDialog from "@/components/people/TeamMemberEditDialog";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import type { TeamMember } from "@/hooks/useTeamMembers";

const People = () => {
  const { data: members = [] } = useTeamMembers();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PeopleHero />
        <LeadershipGrid
          members={members}
          onViewProfile={setSelectedMember}
          onEditProfile={setEditingMember}
        />
        <TeamSection />
        <DiversitySection />
        <JoinCTA />
      </main>
      <SiteFooter />

      <ProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {editingMember && (
        <TeamMemberEditDialog
          member={editingMember}
          onClose={() => setEditingMember(null)}
        />
      )}
    </div>
  );
};

export default People;
