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
import { useState } from "react";
import { Check, Clock, Copy, Loader2, MapPin, Send } from "lucide-react";
import emailjs from '@emailjs/browser';
import { InlineMessage } from "@/components/ui/inline-message";
import { SectionHeading, SpotlightCard } from "@/components/ui/motion-primitives";

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
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyPortfolioUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    } catch {
      // Clipboard API fallback ignored safely
    }
  };

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
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError("There was a problem sending your message. Please try again or reach out on LinkedIn.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="py-14 sm:py-16 md:py-20">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Start a Conversation"
          title="Get in Touch"
          highlightWord="Touch"
          subtitle="Open to Data Analyst internships, entry-level roles, and analytical project collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Context & Quick Share Column */}
          <div className="lg:col-span-5 flex">
            <SpotlightCard className="w-full">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <span
                    className="text-xs font-mono font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'var(--accent-bright)' }}
                  >
                    Direct Channel
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-headline text-white leading-tight">
                    Let&apos;s turn data into{' '}
                    <span className="text-underline-accent">measurable</span> results.
                  </h3>
                  <p className="text-sm sm:text-[15px] text-zinc-300 leading-[1.75]">
                    Looking for a <strong className="text-white font-semibold">Data Analyst</strong>{' '}
                    or <strong className="text-white font-semibold">Technical Project Coordinator</strong>{' '}
                    who combines SQL/Python diagnostics with clear stakeholder communication? Send a note below.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <div className="flex items-center gap-3 text-sm text-zinc-200">
                    <Clock className="h-4 w-4 shrink-0" style={{ color: 'var(--accent-bright)' }} />
                    <span>
                      Typical response: <strong className="text-white">Within 24 hours</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-200">
                    <MapPin className="h-4 w-4 shrink-0" style={{ color: 'var(--accent-bright)' }} />
                    <span>
                      Palghar · <strong className="text-white">Onsite / Remote / Hybrid</strong>
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-zinc-400">Share with your team</span>
                    <button
                      type="button"
                      onClick={handleCopyPortfolioUrl}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/15 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.09] text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      {copiedUrl ? (
                        <>
                          <Check className="h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
                          <span>Link Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
                          <span>Copy Portfolio Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 flex">
            <SpotlightCard className="w-full p-6 sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              disabled={isSubmitting}
                              autoComplete="off"
                              className="h-11 rounded-xl bg-[#050507]/85 border-white/15 focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:border-white/40 text-sm text-white placeholder:text-zinc-500 transition-colors"
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
                          <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                              disabled={isSubmitting}
                              autoComplete="off"
                              className="h-11 rounded-xl bg-[#050507]/85 border-white/15 focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:border-white/40 text-sm text-white placeholder:text-zinc-500 transition-colors"
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
                        <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Project Inquiry / Internship Role"
                            {...field}
                            disabled={isSubmitting}
                            autoComplete="off"
                            className="h-11 rounded-xl bg-[#050507]/85 border-white/15 focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:border-white/40 text-sm text-white placeholder:text-zinc-500 transition-colors"
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
                        <FormLabel className="text-xs sm:text-sm font-semibold text-zinc-200">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share details about your role, project timeline, or collaboration idea..."
                            {...field}
                            className="min-h-[140px] rounded-xl bg-[#050507]/85 border-white/15 focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:border-white/40 text-sm text-white placeholder:text-zinc-500 resize-none transition-colors"
                            disabled={isSubmitting}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-3 pt-1">
                    <Button
                      type="submit"
                      className="btn-shimmer w-full h-11 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 text-sm"
                      style={{
                        backgroundColor: 'var(--accent-solid)',
                        color: 'var(--accent-ink)',
                        boxShadow: '0 4px 24px -4px var(--accent-glow)',
                      }}
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
                    {success && (
                      <InlineMessage>
                        Message sent successfully! I&apos;ll respond within 24 hours.
                      </InlineMessage>
                    )}
                    {error && <InlineMessage variant="destructive">{error}</InlineMessage>}
                  </div>
                </form>
              </Form>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
