
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { CalendarIcon, Users, MapPin, Star } from "lucide-react";
import { toast } from "sonner";

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

type BookingFormValues = {
  travelDate: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  packageId: string;
};

const Packages = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  const form = useForm<BookingFormValues>({
    defaultValues: {
      travelDate: "",
      guests: "2",
      name: "",
      email: "",
      phone: "",
      packageId: ""
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    const packageInfo = packages.find(pkg => pkg.id === data.packageId);
    if (!packageInfo) return;

    const totalPrice = parseInt(data.guests) * packageInfo.price;
    
    const message = encodeURIComponent(
      `Booking Request:\n` +
      `Package: ${packageInfo.title}\n` +
      `Travel Date: ${data.travelDate}\n` +
      `Guests: ${data.guests}\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone}\n` +
      `Total Price: $${totalPrice.toLocaleString()}`
    );
    
    window.open(`https://wa.me/50661500559?text=${message}`, "_blank");
    setSheetOpen(false);
    toast.success("Your booking request has been sent! We'll be in touch shortly.");
  };

  const handleBookNow = (packageId: string) => {
    setSelectedPackage(packageId);
    form.setValue("packageId", packageId);
    setSheetOpen(true);
  };

  return (
    <div id="packages" className="bg-white py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display italic mb-4">Exclusive Packages</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated luxury experiences in Costa Rica's most breathtaking locations, designed for those who seek the extraordinary.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none ring-1 ring-gray-200">
              <div className="h-56 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-display text-2xl">{pkg.title}</CardTitle>
                  <div className="flex items-center text-secondary">
                    <Star className="fill-secondary text-secondary h-4 w-4" />
                    <span className="text-sm ml-1">{pkg.rating}.0</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{pkg.location}</span>
                </div>
                <CardDescription className="text-base">{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-display text-primary">${pkg.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">{pkg.duration}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-lg mb-2">Package Highlights:</h4>
                  <p className="text-muted-foreground italic">{pkg.highlights}</p>
                </div>
                
                <h4 className="font-medium text-lg mb-2">What's Included:</h4>
                <ul className="space-y-2">
                  {pkg.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 5 && (
                    <li className="text-secondary text-sm italic cursor-pointer hover:underline" 
                        onClick={() => handleBookNow(pkg.id)}>
                      + {pkg.features.length - 5} more incredible experiences...
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={() => handleBookNow(pkg.id)}
                >
                  Book This Experience
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">Request Booking</SheetTitle>
              <SheetDescription>
                Fill out the form below to request a booking. No payment is required at this time.
              </SheetDescription>
            </SheetHeader>

            <div className="py-6">
              {selectedPackage && (
                <div className="mb-6">
                  <h3 className="font-display text-xl mb-2">
                    {packages.find(p => p.id === selectedPackage)?.title}
                  </h3>
                  <div className="bg-muted p-4 rounded-md max-h-60 overflow-y-auto">
                    <h4 className="font-medium mb-2">Full Experience Includes:</h4>
                    <ul className="space-y-2">
                      {packages
                        .find(p => p.id === selectedPackage)
                        ?.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-secondary mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="travelDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Travel Date</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                            <Input type="date" {...field} />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Guests</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="border p-4 rounded-md bg-muted/30 space-y-2 text-sm">
                    <h4 className="font-medium">Booking Process:</h4>
                    <p>No payment is required to request a booking.</p>
                    <p>After receiving your request, we'll send a detailed contract with all available adventure options.</p>
                    <p>Once your itinerary is finalized, a 50% non-refundable deposit is required upon signing.</p>
                    <p>The remaining 50% will be due after your first adventure in Costa Rica.</p>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Submit Booking Request
                  </Button>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Packages;
