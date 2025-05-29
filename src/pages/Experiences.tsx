
import Navbar from "@/components/Navbar";
import PackageCard from "@/components/PackageCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    id: "romance",
    title: "Romantic Escape",
    description: "A luxurious romantic getaway for couples seeking privacy and indulgence.",
    price: 10000,
    location: "Pacific Coast & Central Highlands",
    rating: 5,
    duration: "7-10 days",
    features: [
      "Private villa accommodations with infinity pools overlooking the ocean",
      "Couples spa treatments featuring indigenous ingredients and techniques",
      "Candlelit beach dinners under the stars with personal chef",
      "Private helicopter transfers between exclusive locations",
      "Sunset sailing excursion with champagne and gourmet appetizers",
      "Private waterfall hikes with secluded swimming spots",
      "Couple's photoshoot in breathtaking settings",
      "Sunrise hot air balloon ride over the rainforest canopy"
    ],
    highlights: "Exclusive access to hidden beaches and private nature reserves that are closed to the public. Experience a once-in-a-lifetime dinner inside a volcanic cave lit by hundreds of candles.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "eco",
    title: "Eco Explorer",
    description: "Immerse yourself in Costa Rica's biodiversity with premium eco-luxury experiences.",
    price: 20000,
    location: "Monteverde & Osa Peninsula",
    rating: 5,
    duration: "10-14 days",
    features: [
      "Sustainable luxury treehouse accommodations in pristine rainforest",
      "Private wildlife sanctuary tours with renowned naturalists",
      "Cloud forest expeditions to photograph rare species",
      "Luxury Range Rover transfers to remote conservation areas",
      "Private chef featuring organic, locally-sourced cuisine",
      "Exclusive nighttime jungle expeditions with infrared technology",
      "Conservation activities alongside researchers studying endangered species",
      "Helicopter tour over active volcanoes and primary rainforest"
    ],
    highlights: "Be among the few to access restricted areas of national parks with special permits. Participate in releasing endangered sea turtle hatchlings in a moonlit ceremony on a protected beach.",
    image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "adventure",
    title: "Epic Adventure",
    description: "The ultimate friend group adventure with adrenaline-pumping experiences.",
    price: 30000,
    location: "Arenal & Pacuare River",
    rating: 5,
    duration: "12-15 days",
    features: [
      "Luxury villa compound with private infinity pools overlooking volcanoes",
      "Exclusive helicopter volcano tours with landing on inaccessible peaks",
      "Private yacht excursions to hidden snorkeling and diving locations",
      "Class IV-V white water rafting expeditions with premier guides",
      "Extreme zip-lining courses created exclusively for your group",
      "Canyoning and rappelling down 200-foot waterfalls",
      "ATV expeditions to remote beaches and mountain viewpoints",
      "Personal adventure concierge 24/7 with satellite communication"
    ],
    highlights: "Experience the ultimate adrenaline rush with our custom-built cliff jumping platforms accessible only by helicopter. End each adventure-filled day with a chef's table dining experience featuring molecular gastronomy and local ingredients.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1000&auto=format&fit=crop"
  }
];

const Experiences = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4 text-muted-foreground hover:text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-6xl font-display italic mb-6">
              Our Exclusive Experiences
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Each experience is meticulously crafted to provide unparalleled luxury and adventure 
              in Costa Rica's most breathtaking locations. Choose your perfect escape.
            </p>
          </div>

          <div className="grid gap-12">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </div>
      
      <WhatsAppButton />
    </div>
  );
};

export default Experiences;
