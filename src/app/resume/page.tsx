"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Video, Eye, Download } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { InlineMessage } from '@/components/ui/inline-message';
import { SpotlightCard } from '@/components/ui/motion-primitives';
import { SubPageHeader } from '@/components/layout/subpage-header';

const dataAnalystResume = {
  role: 'Data Analyst',
  description:
    'SQL & Python analytics, root-cause diagnostics, predictive churn modeling, and stakeholder reporting.',
  textResume: {
    previewUrl: '/resumes/data-analyst-resume-preview.pdf',
    downloadUrl: '/resumes/data-analyst-resume-download.pdf',
  },
  videoResume: {
    previewUrl: '/resumes/data-analyst-video-resume-preview.mp4',
    downloadUrl: '/resumes/data-analyst-video-resume-download.mp4',
  },
};

type ResumeType = 'Text' | 'Video';

interface ResumeDialogProps {
  role: string;
  type: ResumeType;
  previewUrl: string;
  downloadUrl: string;
  isReady?: boolean;
  primary?: boolean;
}

const ResumeDialog = ({
  role,
  type,
  previewUrl,
  downloadUrl,
  isReady = false,
  primary = false,
}: ResumeDialogProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 4000);
  };

  return (
    <Dialog onOpenChange={(open) => !open && setIsDownloading(false)}>
      <DialogTrigger asChild>
        <Button
          variant={primary ? 'default' : 'outline'}
          className={
            primary
              ? 'btn-shimmer rounded-xl bg-[var(--accent-solid)] text-[var(--accent-ink)] font-semibold hover:bg-[var(--accent-solid-hover)] shadow-[0_0_24px_-6px_var(--accent-glow)] text-xs sm:text-sm h-11 px-5 whitespace-nowrap shrink-0'
              : 'rounded-xl border-white/[0.12] bg-[#050507] hover:bg-white/[0.06] hover:border-[var(--accent-border)] text-white text-xs sm:text-sm font-medium h-11 px-5 whitespace-nowrap shrink-0'
          }
        >
          {type === 'Text' ? (
            <FileText className="mr-1.5 h-4 w-4" />
          ) : (
            <Video className="mr-1.5 h-4 w-4 text-[var(--accent-bright)]" />
          )}
          {type} Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border border-white/[0.12] bg-[#0E0E12]/95 backdrop-blur-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-lg sm:text-xl font-bold text-white">
            {role} - {type} Resume
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-zinc-400">
            Choose an option to view or save the resume.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2 sm:gap-2 pt-2">
          {isReady ? (
            <>
              <Button asChild className="btn-shimmer rounded-xl bg-[var(--accent-solid)] text-[var(--accent-ink)] font-semibold hover:bg-[var(--accent-solid-hover)] shadow-[0_0_24px_-6px_var(--accent-glow)]">
                <Link href={previewUrl} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-xl border border-white/[0.12]" onClick={handleDownload}>
                <Link href={downloadUrl} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Link>
              </Button>
              <InlineMessage show={isDownloading}>
                Downloading {role} {type} Resume... Check your downloads folder!
              </InlineMessage>
            </>
          ) : (
            <>
              <Button asChild className="btn-shimmer rounded-xl bg-[var(--accent-solid)] text-[var(--accent-ink)] font-semibold hover:bg-[var(--accent-solid-hover)] shadow-[0_0_24px_-6px_var(--accent-glow)]">
                <Link href="/#contact">
                  Request Latest Resume
                </Link>
              </Button>
              <InlineMessage>
                Resume file for {role} ({type}) will be attached manually on request.
              </InlineMessage>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function ResumePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#050507] text-foreground">
      <SubPageHeader backHref="/" backLabel="Back to Home" breadcrumb="Data Analyst Resume" />
      <main className="flex-1 relative">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
          <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto space-y-3">
            <span className="block text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[var(--accent-bright)]">
              Target Role
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-white">
              Data Analyst <span className="text-[var(--accent-bright)]">Resume</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed">
              Focused on <strong className="text-white font-semibold">SQL, Python, BI diagnostics</strong>, and structured stakeholder coordination at Blink Beyond.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <SpotlightCard className="p-6 sm:p-8">
              <div className="flex flex-col space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.08] text-xs font-mono">
                  <span className="font-semibold uppercase tracking-[0.16em] text-[var(--accent-bright)]">
                    Primary Role
                  </span>
                  <span className="text-zinc-400">Open to Internships &amp; Entry-Level</span>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-headline text-white">
                    {dataAnalystResume.role}
                  </h2>
                  <p className="text-sm sm:text-[15px] text-zinc-300 leading-relaxed">
                    {dataAnalystResume.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border-y border-white/[0.08] py-3.5 text-center sm:text-left">
                  <div className="pb-2.5 sm:pb-0 sm:pr-4">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Core Stack</p>
                    <p className="text-sm font-semibold text-white mt-0.5">SQL · Python · BI</p>
                  </div>
                  <div className="py-2.5 sm:py-0 sm:px-4">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Flagship Build</p>
                    <p className="text-sm font-semibold text-white mt-0.5">Churn Pipeline (0.87 AUC)</p>
                  </div>
                  <div className="pt-2.5 sm:pt-0 sm:pl-4">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Experience</p>
                    <p className="text-sm font-semibold text-white mt-0.5">Blink Beyond · Coordinator</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                  <ResumeDialog
                    role={dataAnalystResume.role}
                    type="Text"
                    previewUrl={dataAnalystResume.textResume.previewUrl}
                    downloadUrl={dataAnalystResume.textResume.downloadUrl}
                    isReady={false}
                    primary
                  />
                  <ResumeDialog
                    role={dataAnalystResume.role}
                    type="Video"
                    previewUrl={dataAnalystResume.videoResume.previewUrl}
                    downloadUrl={dataAnalystResume.videoResume.downloadUrl}
                    isReady={false}
                  />
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </main>
    </div>
  );
}
