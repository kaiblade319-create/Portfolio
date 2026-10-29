'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RefreshCcw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Error Code with Gradient */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-9xl md:text-[12rem] font-bold leading-none bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60 bg-clip-text text-transparent animate-gradient animate-float"
          style={{
            backgroundSize: '200% auto',
          }}
        >
          ERROR
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Something Went Wrong
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            An unexpected error occurred. Don't worry, you can try again or go back home to continue exploring.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={reset}
            size="lg"
            className="w-full sm:w-auto animate-button-pulse"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </Button>

          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto animate-button-pulse">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>

          <Link href="/#contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto animate-button-pulse">
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </Link>
        </motion.div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <details className="p-4 bg-muted rounded-lg text-left max-w-lg mx-auto">
              <summary className="cursor-pointer text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                🔧 Exception Stack Trace (Development Only)
              </summary>
              <div className="mt-3 space-y-2">
                <p className="text-sm text-destructive font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </details>
          </motion.div>
        )}

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div className="inline-block">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="block w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
              Error: Data processing pipeline interrupted
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
