'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Number */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-9xl md:text-[12rem] font-bold leading-none bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 bg-clip-text text-transparent animate-gradient animate-float"
          style={{
            backgroundSize: '200% auto',
          }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto animate-button-pulse">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/#projects">
            <Button size="lg" variant="outline" className="w-full sm:w-auto animate-button-pulse">
              <ArrowLeft className="mr-2 h-5 w-5" />
              View Projects
            </Button>
          </Link>
          <Link href="/#contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto animate-button-pulse">
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </Link>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <div className="inline-block">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="block w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Error: Route not found in dataset
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
