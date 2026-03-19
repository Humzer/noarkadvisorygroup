import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { useSiteImages } from "@/hooks/useSiteImages";
import { useEditMode } from "@/contexts/EditModeContext";
import { toast } from "sonner";

interface Props {
  imageKey: string;
  fallback: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  /** For framer-motion images, render via children */
  children?: (src: string) => React.ReactNode;
}

const EditableImage = ({ imageKey, fallback, alt, className, loading = "lazy", children }: Props) => {
  const { user, isAdmin } = useAdmin();
  const { getImage, updateImage } = useSiteImages();
  const { editMode } = useEditMode();
  const fileRef = useRef<HTMLInputElement>(null);
  const showEdit = isAdmin && editMode;

  const src = getImage(imageKey, fallback);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    try {
      await updateImage(imageKey, file, user.id);
      toast.success("Image updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update image");
    }
  };

  return (
    <div className="relative group/editable">
      {children ? children(src) : (
        <img src={src} alt={alt} className={className} loading={loading} />
      )}
      {isAdmin && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
            className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-accent text-accent-foreground rounded-full opacity-0 group-hover/editable:opacity-100 transition-opacity shadow-lg"
            title="Change image"
          >
            <ImagePlus size={16} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
        </>
      )}
    </div>
  );
};

export default EditableImage;
