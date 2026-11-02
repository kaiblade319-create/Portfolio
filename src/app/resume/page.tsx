
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Video, ArrowLeft, Eye, Download } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { InlineMessage } from '@/components/ui/inline-message';

const jobRoles = [
  {
    role: 'Data Analyst',
    description: 'Primary target role focused on data visualization, business intelligence, and actionable insights.',
    textResume: {
        previewUrl: '/resumes/data-analyst-resume-preview.pdf',
        downloadUrl: '/resumes/data-analyst-resume-download.pdf',
    },
    videoResume: {
        previewUrl: '/resumes/data-analyst-video-resume-preview.mp4',
        downloadUrl: '/resumes/data-analyst-video-resume-download.mp4',
    }
  },
  {
    role: 'Data Engineer',
    description: 'Next target role with focus on scalable data pipelines, ETL workflows, and reliable data infrastructure.',
    textResume: {
        previewUrl: '/resumes/data-engineer-resume-preview.pdf',
        downloadUrl: '/resumes/data-engineer-resume-download.pdf',
    },
    videoResume: {
        previewUrl: '/resumes/data-engineer-video-resume-preview.mp4',
        downloadUrl: '/resumes/data-engineer-video-resume-download.mp4',
    }
  },
  {
    role: 'Data Scientist',
    description: 'Long-term target role centered on machine learning, statistical modeling, and data-driven product development.',
    textResume: {
      previewUrl: '/resumes/data-scientist-resume-preview.pdf',
      downloadUrl: '/resumes/data-scientist-resume-download.pdf',
    },
    videoResume: {
        previewUrl: '/resumes/data-scientist-video-resume-preview.mp4',
        downloadUrl: '/resumes/data-scientist-video-resume-download.mp4',
    }
  },
];

type ResumeType = 'Text' | 'Video';

interface ResumeDialogProps {
  role: string;
  type: ResumeType;
  previewUrl: string;
  downloadUrl: string;
  isReady?: boolean;
}

const ResumeDialog = ({ role, type, previewUrl, downloadUrl, isReady = false }: ResumeDialogProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 4000); // Hide message after 4 seconds
  };

  return (
    <Dialog onOpenChange={(open) => !open && setIsDownloading(false)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-xl border-border/70 bg-secondary/60 hover:bg-secondary hover:border-primary/40 text-xs sm:text-sm font-medium h-9 sm:h-10 px-3 sm:px-4"
        >
          {type === 'Text' ? <FileText className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> : <Video className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />} {type} Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border border-border/70 bg-card/95 backdrop-blur-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-lg sm:text-xl font-bold">{role} - {type} Resume</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            Choose an option to view or save the resume.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2 sm:gap-2 pt-2">
            {isReady ? (
              <>
                <Button asChild className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
                    <Link href={previewUrl} target="_blank">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Link>
                </Button>
                <Button asChild variant="secondary" className="rounded-xl border border-border/70" onClick={handleDownload}>
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
                <Button asChild className="rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
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
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1 relative">
        <div className="p-4 sm:p-6">
          <Button asChild variant="outline" className="rounded-xl border-border/70 bg-card/75 backdrop-blur-md hover:border-primary/50 text-xs sm:text-sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="container mx-auto px-4 md:px-6 py-6 sm:py-10 md:py-16">
          <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Career Tracks</span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-headline mt-1">Choose Your Resume</h1>
            <p className="text-xs sm:text-base md:text-lg text-muted-foreground mt-2 leading-relaxed">
              Role-specific resumes aligned with my current target path: Data Analyst to Data Engineer to Data Scientist.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {jobRoles.map((job) => (
              <Card
                key={job.role}
                className="flex flex-col text-center justify-between p-5 sm:p-6 rounded-2xl border border-border/70 bg-card/75 backdrop-blur-md transition-all duration-300 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10"
              >
                <CardHeader className="p-0">
                  <CardTitle className="text-lg sm:text-xl font-bold font-headline">{job.role}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-5 p-0 pt-3">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <ResumeDialog role={job.role} type="Text" previewUrl={job.textResume.previewUrl} downloadUrl={job.textResume.downloadUrl} isReady={false} />
                    <ResumeDialog role={job.role} type="Video" previewUrl={job.videoResume.previewUrl} downloadUrl={job.videoResume.downloadUrl} isReady={false} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
