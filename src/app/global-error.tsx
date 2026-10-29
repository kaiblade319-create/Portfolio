'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            {/* Error Icon */}
            <div className="flex justify-center mb-8">
              <AlertTriangle className="w-32 h-32 text-red-500 animate-pulse" />
            </div>

            {/* Message */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Critical Error
              </h2>
              <p className="text-lg text-zinc-400 max-w-md mx-auto">
                A critical error occurred in the application. Please try refreshing the page.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-6 p-4 bg-zinc-900 rounded-lg text-left max-w-lg mx-auto border border-zinc-800">
                  <summary className="cursor-pointer text-sm font-semibold text-zinc-400 hover:text-zinc-300">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-red-400 font-mono break-all">
                      {error.message}
                    </p>
                    {error.digest && (
                      <p className="text-xs text-zinc-500">
                        Error ID: {error.digest}
                      </p>
                    )}
                    {error.stack && (
                      <pre className="text-xs text-zinc-500 overflow-auto max-h-40">
                        {error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <RefreshCcw className="w-5 h-5" />
                Try Again
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </a>
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-sm text-zinc-500">
              <p>
                If this problem persists, please refresh your browser or try again later.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
