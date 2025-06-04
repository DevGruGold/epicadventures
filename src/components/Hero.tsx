
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [activeExperience, setActiveExperience] = useState(0);

  const experiences = [
    {
      id: "romance",
      title: "Romantic Escape",
      subtitle: "Private Luxury for Two",
      description: "Indulge in exclusive moments with your special someone in the most breathtaking settings of Costa Rica.",
      image: "/lovable-uploads/f576b76f-5883-4d29-b3a3-c8d57eb48429.png",
      color: "from-pink-900/70 to-primary/80"
    },
    {
      id: "eco",
      title: "Eco Explorer",
      subtitle: "Sustainable Luxury in Nature",
      description: "Immerse yourself in Costa Rica's rich biodiversity with exclusive access to pristine natural wonders.",
      image: "/lovable-uploads/9dcd0c06-3ef4-42b8-8f2f-83a42016afd1.png",
      color: "from-green-900/70 to-primary/80"
    },
    {
      id: "adventure",
      title: "Epic Adventure",
      subtitle: "Adrenaline & Luxury Combined",
      description: "Experience heart-racing adventures by day and unparalleled luxury by night in Costa Rica's most stunning locations.",
      image: "/lovable-uploads/2dcaec3d-c8ea-4d16-9e6b-7201f485e229.png",
      color: "from-blue-900/70 to-primary/80"
    }
  ];

  const currentExperience = experiences[activeExperience];

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentExperience.image})`,
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${currentExperience.color}`} />
      </div>
      
      <div className="relative container h-full flex flex-col justify-center px-4 md:px-6">
        <div className="max-w-2xl animate-fade-up mt-16 md:mt-20">
          <span className="text-secondary font-medium tracking-wider mb-2 inline-block text-sm md:text-base">
            {currentExperience.subtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4 font-display italic leading-tight">
            {currentExperience.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 font-light leading-relaxed">
            {currentExperience.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              onClick={() => navigate("/experiences")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base py-3 px-6 w-full sm:w-auto"
            >
              Explore This Experience
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20 hover:text-white py-3 px-6 w-full sm:w-auto"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View All Packages
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <Button 
            variant="ghost" 
            className="text-white rounded-full p-2 hover:bg-white/20"
            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Scroll down</span>
          </Button>
        </div>
        
        <div className="absolute bottom-20 md:bottom-32 right-4 md:right-10 flex flex-col gap-3 z-10">
          {experiences.map((exp, index) => (
            <button
              key={exp.id}
              className={`w-3 h-3 rounded-full transition-all ${
                activeExperience === index ? "bg-secondary w-6" : "bg-white/50 hover:bg-white"
              }`}
              onClick={() => setActiveExperience(index)}
              aria-label={`View ${exp.title} experience`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
