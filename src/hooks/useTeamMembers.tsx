import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import shuaib from "@/assets/shuaib.jpeg";
import hamza from "@/assets/hamza.jpeg";
import yahya from "@/assets/yahya.jpeg";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image_url: string | null;
  focus_areas: string[];
  bio: string;
  full_bio: string[];
  office: string;
  email: string;
  linkedin: string;
  expertise: string[];
  highlights: string[];
  education: string[];
  publications: { title: string; date: string }[];
  display_order: number;
}

// Fallback images for initial members
const FALLBACK_IMAGES: Record<string, string> = {
  "Shuaib Yussuf Sharif": shuaib,
  "Hamza Yussuf Sharif": hamza,
  "Yahya Yussuf Sharif": yahya,
};

export const getImageUrl = (member: TeamMember): string => {
  if (member.image_url) return member.image_url;
  return FALLBACK_IMAGES[member.name] || "/placeholder.svg";
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["team-members"],
    queryFn: async (): Promise<TeamMember[]> => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      return (data || []).map((row) => ({
        ...row,
        focus_areas: row.focus_areas || [],
        full_bio: row.full_bio || [],
        expertise: row.expertise || [],
        highlights: row.highlights || [],
        education: row.education || [],
        publications: (row.publications as { title: string; date: string }[]) || [],
      }));
    },
  });
};
