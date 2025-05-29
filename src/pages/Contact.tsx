
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const Contact = () => {
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    const message = encodeURIComponent(
      `Contact Form Submission:\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone}\n` +
      `Message: ${data.message}`
    );
    
    window.open(`https://wa.me/50661500559?text=${message}`, "_blank");
    toast.success("Your message has been sent! We'll be in touch shortly.");
    form.reset();
  };

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

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-display italic mb-6">
                Get In Touch
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready to embark on your epic adventure? Contact us to start planning 
                your luxury Costa Rica experience.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-display mb-6">Contact Information</h2>
                
                <div className="grid gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <MessageCircle className="h-6 w-6 text-secondary mt-1" />
                        <div>
                          <h3 className="font-medium mb-1">WhatsApp</h3>
                          <p className="text-muted-foreground mb-2">
                            For immediate assistance and quick responses
                          </p>
                          <Button 
                            onClick={() => window.open('https://wa.me/50661500559', '_blank')}
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                          >
                            Chat on WhatsApp
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-secondary mt-1" />
                        <div>
                          <h3 className="font-medium mb-1">Phone</h3>
                          <p className="text-muted-foreground">+506 6150 0559</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-secondary mt-1" />
                        <div>
                          <h3 className="font-medium mb-1">Email</h3>
                          <p className="text-muted-foreground">info@epicadventures.cr</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-secondary mt-1" />
                        <div>
                          <h3 className="font-medium mb-1">Location</h3>
                          <p className="text-muted-foreground">
                            San José, Costa Rica<br />
                            Serving all of Costa Rica
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">Send Us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <textarea 
                                  {...field}
                                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="Tell us about your dream adventure..."
                                  required
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
