import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PeopleHero from "@/components/people/PeopleHero";
import LeadershipGrid from "@/components/people/LeadershipGrid";
import ProfileModal from "@/components/people/ProfileModal";
import TeamSection from "@/components/people/TeamSection";
import DiversitySection from "@/components/people/DiversitySection";
import JoinCTA from "@/components/people/JoinCTA";
import { leaders, type Leader } from "@/data/peopleData";

const People = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PeopleHero />
        <LeadershipGrid leaders={leaders} onViewProfile={setSelectedLeader} />
        <TeamSection />
        <DiversitySection />
        <JoinCTA />
      </main>
      <SiteFooter />

      <ProfileModal
        leader={selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />
    </div>
  );
};

export default People;
