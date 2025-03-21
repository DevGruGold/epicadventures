
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1501286353178-1ec881214838)`,
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>
      
      <div className="relative container h-full flex items-center">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-4xl md:text-7xl text-white font-bold mb-6 font-display italic">
            Luxury Adventures in Costa Rica
          </h1>
          <p className="text-xl text-white/90 mb-8 font-light">
            Experience the ultimate in exclusive travel with private helicopters,
            luxury vehicles, and bespoke experiences.
          </p>
          <Button
            onClick={() => navigate("/experiences")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Explore Experiences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
