import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => (
  <a
    href="https://wa.me/393520024587"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-200 hover:shadow-xl"
    aria-label="Contact us on WhatsApp"
  >
    <MessageCircle size={26} fill="white" />
  </a>
);

export default WhatsAppFloat;
