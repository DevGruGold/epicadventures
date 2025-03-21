
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Packages />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
