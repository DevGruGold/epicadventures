
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display italic mb-8 text-center">
              About Epic Adventures
            </h1>

            <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop"
                alt="Costa Rica landscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xl font-light">
                  Crafting extraordinary adventures since 2015
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground mb-8">
                Epic Adventures was born from a passion for Costa Rica's unparalleled natural beauty 
                and a vision to share its most exclusive experiences with discerning travelers who 
                seek more than just a vacation.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-display mb-2">Award-Winning</h3>
                  <p className="text-muted-foreground">
                    Recognized for excellence in luxury adventure travel
                  </p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-display mb-2">Expert Guides</h3>
                  <p className="text-muted-foreground">
                    Local experts with decades of experience
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-display mb-2">Exclusive Access</h3>
                  <p className="text-muted-foreground">
                    Private locations unavailable to regular tourism
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-display italic mb-6">Our Story</h2>
              <p className="mb-6">
                Founded by adventurers who fell in love with Costa Rica's diverse ecosystems, 
                Epic Adventures began as a dream to showcase the country's hidden gems to those 
                who appreciate luxury without compromise. Our founders, Maria and Carlos, spent 
                years exploring every corner of Costa Rica, building relationships with local 
                communities and discovering secret locations that would become the foundation 
                of our exclusive experiences.
              </p>

              <p className="mb-6">
                What sets us apart is our commitment to authentic luxury. We don't just offer 
                expensive accommodations; we provide transformative experiences that connect 
                you with Costa Rica's soul while maintaining the highest standards of comfort 
                and service.
              </p>

              <h2 className="text-3xl font-display italic mb-6">Our Mission</h2>
              <p className="mb-6">
                To create life-changing adventures that showcase Costa Rica's natural wonders 
                while supporting local communities and conservation efforts. Every experience 
                we offer contributes to the preservation of the environments we explore and 
                the prosperity of the people who call them home.
              </p>

              <h2 className="text-3xl font-display italic mb-6">Sustainability Commitment</h2>
              <p>
                We believe luxury and sustainability go hand in hand. All our experiences are 
                designed to have minimal environmental impact while maximizing positive contributions 
                to local conservation efforts. From our carbon-neutral transportation to our 
                partnerships with eco-lodges and wildlife sanctuaries, every detail reflects 
                our commitment to preserving Costa Rica for future generations.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <WhatsAppButton />
    </div>
  );
};

export default About;
