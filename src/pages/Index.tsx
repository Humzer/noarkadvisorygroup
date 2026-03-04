import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InsightsSection from "@/components/InsightsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ImpactSection from "@/components/ImpactSection";
import PeoplePreview from "@/components/PeoplePreview";
import ResourcesSection from "@/components/ResourcesSection";
import CareersSection from "@/components/CareersSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <InsightsSection />
        <CapabilitiesSection />
        <ImpactSection />
        <PeoplePreview />
        <ResourcesSection />
        <CareersSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
