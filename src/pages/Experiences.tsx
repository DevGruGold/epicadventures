
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
    image: "/lovable-uploads/f576b76f-5883-4d29-b3a3-c8d57eb48429.png"
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
    image: "/lovable-uploads/9dcd0c06-3ef4-42b8-8f2f-83a42016afd1.png"
  },
  {
    id: "adventure",
    title: "Epic Adventure",
    description: "The ultimate bespoke adventure experience with heart-pounding activities and luxury recovery.",
    price: 30000,
    location: "Arenal & Pacuare River",
    rating: 5,
    duration: "12-15 days",
    features: [
      "Custom-built cliff jumping platforms (30-80 feet) accessible only by helicopter",
      "Exclusive volcano crater rim hiking with certified mountain guides",
      "Class V+ white water rafting on untouched river sections with expert safety teams",
      "Bespoke zip-line courses designed specifically for your group's skill level",
      "Multi-pitch rock climbing on volcanic walls with professional climbing instructors",
      "Canyoning expeditions down 200+ foot waterfalls with specialized equipment",
      "Private helicopter access to remote adventure sites unavailable to the public",
      "Night rappelling adventures with infrared equipment and safety lighting",
      "Custom ATV trail creation through private reserves and hidden beaches",
      "Extreme mountain biking on trails carved exclusively for your expedition",
      "Deep sea fishing charters with captain and crew for marlin and sailfish",
      "Luxury recovery suites with private massage therapists and recovery pools",
      "Personal adventure concierge available 24/7 with satellite communication",
      "Gourmet field dining experiences prepared by expedition chefs at remote locations"
    ],
    highlights: "Every adventure is meticulously planned and executed by our team of extreme sports professionals. Experience activities that don't exist anywhere else - from our custom cliff jumping platforms built into volcanic rock faces to exclusive river sections opened just for your group. Each day ends with luxury recovery amenities including private spa treatments and chef-prepared meals in stunning wilderness settings.",
    image: "/lovable-uploads/2dcaec3d-c8ea-4d16-9e6b-7201f485e229.png"
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
