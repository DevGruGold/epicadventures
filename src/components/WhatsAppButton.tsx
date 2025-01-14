import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in booking a luxury tour.");
    window.open(`https://wa.me/50661500559?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-button"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default WhatsAppButton;