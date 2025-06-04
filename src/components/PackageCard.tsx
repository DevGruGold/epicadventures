
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { MapPin, Star } from "lucide-react";
import { toast } from "sonner";
import DatePicker from "@/components/DatePicker";

type Package = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  duration: string;
  features: string[];
  highlights: string;
  image: string;
};

type BookingFormValues = {
  travelDate: Date | undefined;
  guests: string;
  name: string;
  email: string;
  phone: string;
};

interface PackageCardProps {
  package: Package;
  compact?: boolean;
}

const PackageCard = ({ package: pkg, compact = false }: PackageCardProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const form = useForm<BookingFormValues>({
    defaultValues: {
      travelDate: undefined,
      guests: "2",
      name: "",
      email: "",
      phone: ""
    }
  });

  const isRomanticPackage = pkg.id === "romance";
  const packagePrice = isRomanticPackage ? 20000 : pkg.price;

  const onSubmit = (data: BookingFormValues) => {
    if (!data.travelDate) {
      toast.error("Please select a travel date");
      return;
    }

    const guestCount = isRomanticPackage ? 2 : parseInt(data.guests);
    const totalPrice = isRomanticPackage ? packagePrice : packagePrice * guestCount;
    
    const message = encodeURIComponent(
      `🌟 LUXURY COSTA RICA BOOKING REQUEST 🌟\n\n` +
      `📦 Package: ${pkg.title}\n` +
      `📅 Travel Date: ${data.travelDate.toLocaleDateString()}\n` +
      `👥 Guests: ${guestCount} ${guestCount === 1 ? 'person' : 'people'}\n` +
      `💰 Total Investment: $${totalPrice.toLocaleString()}\n\n` +
      `📞 Contact Details:\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone}\n\n` +
      `I'm interested in booking this exclusive experience. Please send me the detailed itinerary and contract.`
    );
    
    window.open(`https://wa.me/50661500559?text=${message}`, "_blank");
    setSheetOpen(false);
    toast.success("Your booking request has been sent! We'll be in touch shortly.");
    form.reset();
  };

  if (compact) {
    return (
      <>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-none ring-1 ring-gray-200">
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
              <div>
                <p className="text-2xl font-display text-primary">${packagePrice.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  {isRomanticPackage ? "total package for 2" : "per person"}
                </p>
              </div>
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
                    onClick={() => setSheetOpen(true)}>
                  + {pkg.features.length - 5} more incredible experiences...
                </li>
              )}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={() => setSheetOpen(true)}
            >
              Book This Experience
            </Button>
          </CardFooter>
        </Card>

        <BookingSheet 
          isOpen={sheetOpen}
          onOpenChange={setSheetOpen}
          package={pkg}
          form={form}
          onSubmit={onSubmit}
          isRomanticPackage={isRomanticPackage}
          packagePrice={packagePrice}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center text-secondary">
              <Star className="fill-secondary text-secondary h-5 w-5" />
              <span className="ml-1 font-medium">{pkg.rating}.0</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{pkg.location}</span>
            </div>
            <span className="bg-muted px-3 py-1 rounded-full text-sm">{pkg.duration}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display italic mb-4">{pkg.title}</h2>
          <p className="text-lg text-muted-foreground mb-6">{pkg.description}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">Experience Highlights</h3>
            <p className="text-muted-foreground italic">{pkg.highlights}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">What's Included</h3>
            <ul className="grid gap-2">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary mr-2 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-3xl font-display text-primary">${packagePrice.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                {isRomanticPackage ? "total package for 2" : "per person"}
              </p>
            </div>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => setSheetOpen(true)}
            >
              Book This Experience
            </Button>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <img 
              src={pkg.image} 
              alt={pkg.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <BookingSheet 
        isOpen={sheetOpen}
        onOpenChange={setSheetOpen}
        package={pkg}
        form={form}
        onSubmit={onSubmit}
        isRomanticPackage={isRomanticPackage}
        packagePrice={packagePrice}
      />
    </>
  );
};

interface BookingSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  package: Package;
  form: any;
  onSubmit: (data: BookingFormValues) => void;
  isRomanticPackage: boolean;
  packagePrice: number;
}

const BookingSheet = ({ isOpen, onOpenChange, package: pkg, form, onSubmit, isRomanticPackage, packagePrice }: BookingSheetProps) => {
  const watchedGuests = form.watch("guests");
  const guestCount = isRomanticPackage ? 2 : parseInt(watchedGuests || "2");
  const totalPrice = isRomanticPackage ? packagePrice : packagePrice * guestCount;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-lg bg-white/95 backdrop-blur-md border-l shadow-2xl z-[50]">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm -z-10" />
        <SheetHeader className="relative z-10">
          <SheetTitle className="font-display text-2xl">Book Your Experience</SheetTitle>
          <SheetDescription>
            Complete your booking details below. No payment required at this time.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 relative z-10">
          <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border">
            <h3 className="font-display text-lg mb-1">{pkg.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{pkg.location} • {pkg.duration}</p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold text-primary">${packagePrice.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                {isRomanticPackage ? "total for 2 people" : "per person"}
              </p>
            </div>
            {!isRomanticPackage && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-lg font-semibold text-primary">
                  Total: ${totalPrice.toLocaleString()} for {guestCount} {guestCount === 1 ? 'person' : 'people'}
                </p>
              </div>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travel Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                        placeholder="Select your arrival date"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {!isRomanticPackage && (
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
                          <SelectTrigger className="bg-white border-2 focus:ring-2 focus:ring-primary focus:border-primary">
                            <SelectValue placeholder="Select number of guests" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-2 shadow-lg z-[60]">
                          {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                            <SelectItem key={num} value={num.toString()} className="hover:bg-gray-50">
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} required className="bg-white border-2 focus:ring-2 focus:ring-primary focus:border-primary" />
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
                      <Input type="email" {...field} required className="bg-white border-2 focus:ring-2 focus:ring-primary focus:border-primary" />
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
                      <Input type="tel" {...field} className="bg-white border-2 focus:ring-2 focus:ring-primary focus:border-primary" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="border-t pt-4 mt-6">
                <div className="text-sm text-muted-foreground space-y-1 mb-4 bg-blue-50 p-3 rounded-lg">
                  <p>• No payment required to request booking</p>
                  <p>• We'll send you a detailed contract with adventure options</p>
                  <p>• 50% deposit required upon contract signing</p>
                  <p>• Remaining 50% due after your first adventure</p>
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-3">
                  Send Booking Request via WhatsApp
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PackageCard;
