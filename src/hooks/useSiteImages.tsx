import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SiteImage {
  key: string;
  image_url: string;
}

export const useSiteImages = () => {
  const queryClient = useQueryClient();

  const { data: overrides = {} } = useQuery({
    queryKey: ["site-images"],
    queryFn: async () => {
      const { data } = await supabase.from("site_images").select("key, image_url");
      const map: Record<string, string> = {};
      data?.forEach((row: SiteImage) => {
        map[row.key] = row.image_url;
      });
      return map;
    },
    staleTime: 1000 * 60 * 5,
  });

  const getImage = (key: string, fallback: string) => overrides[key] || fallback;

  const updateImage = async (key: string, file: File, userId: string) => {
    const ext = file.name.split(".").pop();
    const path = `${key}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true });
    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("site-images")
      .getPublicUrl(path);
    const imageUrl = urlData.publicUrl + "?t=" + Date.now();

    const { error } = await supabase
      .from("site_images")
      .upsert({ key, image_url: imageUrl, updated_by: userId }, { onConflict: "key" });
    if (error) throw error;

    await queryClient.invalidateQueries({ queryKey: ["site-images"] });
    return imageUrl;
  };

  return { getImage, updateImage };
};
