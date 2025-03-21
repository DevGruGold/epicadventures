
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { CalendarIcon, Users } from "lucide-react";
import { toast } from "sonner";

const packages = [
  {
    id: "romance",
    title: "Romantic Escape",
    description: "A luxurious romantic getaway for couples seeking privacy and indulgence.",
    price: 10000,
    features: [
      "Private villa accommodations",
      "Couples spa treatments",
      "Candlelit beach dinners",
      "Private helicopter transfers",
      "Sunset sailing excursion",
      "Waterfall hikes with private guide"
    ],
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "eco",
    title: "Eco Explorer",
    description: "Immerse yourself in Costa Rica's biodiversity with premium eco-luxury experiences.",
    price: 20000,
    features: [
      "Sustainable luxury treehouse stay",
      "Private wildlife sanctuary tours",
      "Cloud forest expeditions",
      "Range Rover transfers to remote locations",
      "Private chef featuring local cuisine",
      "Exclusive access to conservation areas"
    ],
    image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "adventure",
    title: "Epic Adventure",
    description: "The ultimate friend group adventure with adrenaline-pumping experiences.",
    price: 30000,
    features: [
      "Luxury villa with private infinity pool",
      "Helicopter volcano tours",
      "Private yacht excursions",
      "White water rafting expeditions",
      "Zip-lining through pristine rainforest",
      "Personal adventure concierge 24/7"
    ],
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
    <div className="bg-white py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display mb-4">Exclusive Packages</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated luxury experiences in Costa Rica's most breathtaking locations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-display text-2xl">{pkg.title}</CardTitle>
                <CardDescription className="text-base">{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display mb-4">${pkg.price.toLocaleString()} <span className="text-sm font-sans text-muted-foreground">per person</span></p>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={() => handleBookNow(pkg.id)}
                >
                  Book Now
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
