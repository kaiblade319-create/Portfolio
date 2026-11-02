
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import emailjs from '@emailjs/browser';
import { InlineMessage } from "@/components/ui/inline-message";

// Define schema validation rules using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTACT SECTION COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides a clean contact form powered by EmailJS, allowing recruiters and
 * collaborators to send direct messages without requiring server backend keys.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const Contact = () => {
  // Submission and alert notification states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Initialize React Hook Form with Zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  /**
   * Dispatches the submitted message directly to Kaushar's inbox via EmailJS.
   * Auto-resets form and shows success toast for 5 seconds.
   */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // EmailJS credentials (public key client-side safe)
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_ga86v1r";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_6bkwxh1";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "TGmz5QmXKPFg2KU6w";

    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      subject: values.subject,
      message: values.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(false), 5000); // Auto-hide success message after 5 seconds
    } catch (error) {
      setError("There was a problem sending your message. Please try again or reach out on LinkedIn.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline">Get in Touch</h2>
          <p className="text-xs sm:text-base md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Open to internships, technical generalist opportunities, and high-impact engineering collaborations. I usually respond within 24 hours.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border border-border/70 bg-card/75 backdrop-blur-md rounded-2xl shadow-xl shadow-primary/5">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium text-foreground/90">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              disabled={isSubmitting}
                              autoComplete="off"
                              className="h-11 rounded-xl bg-background/60 border-border/70 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-xs sm:text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-medium text-foreground/90">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                              disabled={isSubmitting}
                              autoComplete="off"
                              className="h-11 rounded-xl bg-background/60 border-border/70 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-xs sm:text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm font-medium text-foreground/90">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Subject"
                            {...field}
                            disabled={isSubmitting}
                            autoComplete="off"
                            className="h-11 rounded-xl bg-background/60 border-border/70 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-xs sm:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm font-medium text-foreground/90">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message..."
                            {...field}
                            className="min-h-[140px] rounded-xl bg-background/60 border-border/70 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-xs sm:text-sm resize-none"
                            disabled={isSubmitting}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-3 pt-2">
                    <Button
                      type="submit"
                      className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                    {success && <InlineMessage>Message sent successfully! I'll respond within 24 hours.</InlineMessage>}
                    {error && <InlineMessage variant="destructive">{error}</InlineMessage>}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
