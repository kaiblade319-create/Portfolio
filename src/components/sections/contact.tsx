
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

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

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
        setTimeout(() => setSuccess(false), 5000); // Hide after 5 seconds
    } catch (error) {
        setError("There was a problem sending your message. Please try again.");
        form.reset();
        setTimeout(() => setError(null), 5000); // Hide after 5 seconds
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Get in Touch</h2>
          <p className="text-lg text-muted-foreground mt-2">Open to internships, freelance collaborations, and entry-level data roles. I usually respond within 24 hours.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} disabled={isSubmitting} autoComplete="off"/>
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} disabled={isSubmitting} autoComplete="off"/>
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
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject" {...field} disabled={isSubmitting} autoComplete="off"/>
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." {...field} className="min-h-[150px]" disabled={isSubmitting} autoComplete="off"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send className="mr-2"/> Send Message</>}
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
