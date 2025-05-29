
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { CalendarIcon, MapPin, Star } from "lucide-react";
import { toast } from "sonner";

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
  travelDate: string;
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
      travelDate: "",
      guests: "2",
      name: "",
      email: "",
      phone: ""
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    const totalPrice = parseInt(data.guests) * pkg.price;
    
    const message = encodeURIComponent(
      `Booking Request:\n` +
      `Package: ${pkg.title}\n` +
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
              <p className="text-3xl font-display text-primary">${pkg.price.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">per person</p>
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
}

const BookingSheet = ({ isOpen, onOpenChange, package: pkg, form, onSubmit }: BookingSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Request Booking</SheetTitle>
          <SheetDescription>
            Fill out the form below to request a booking. No payment is required at this time.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <div className="mb-6">
            <h3 className="font-display text-xl mb-2">{pkg.title}</h3>
            <div className="bg-muted p-4 rounded-md max-h-60 overflow-y-auto">
              <h4 className="font-medium mb-2">Full Experience Includes:</h4>
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-secondary mr-2">•</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
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
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        <Input type="date" {...field} required />
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
                      <Input {...field} required />
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
                      <Input type="email" {...field} required />
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
  );
};

export default PackageCard;
