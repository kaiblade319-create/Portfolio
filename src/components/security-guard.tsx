'use client';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SECURITY & CONTENT INTEGRITY GUARD
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose:
 * Protects portfolio intellectual property, case-study analytics, and personal
 * data from automated scrapers, content thieves, and unauthorized reproduction.
 *
 * Capabilities:
 * 1. Context Menu Guard: Intercepts right-click events and displays a polite
 *    toast alert directing recruiters & visitors to the official contact form.
 * 2. Keyboard Shortcut Blocker: Disables shortcut attempts to save offline clones
 *    (Ctrl+S / Cmd+S) or view source (Ctrl+U / Cmd+U).
 * 3. Copy Attribution Guard: Prevents silent scraping by attaching clear copyright
 *    attribution and origin metadata whenever text is copied.
 * 4. Bot & Developer Console Watermark: Logs a clear developer signature and notice
 *    to anyone inspecting the browser console.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function SecurityGuard() {
  // State to control display of the security toast alert
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Watermark message in browser console for developers and curious recruiters
    console.log(
      '%c🔒 Kaushar Halani — Personal Portfolio & Engineering Systems (Content Protected)',
      'color: #22d3ee; font-weight: bold; font-size: 13px;'
    );

    // 2. Right-Click (Context Menu) Interceptor
    const handleContextMenu = (e: MouseEvent) => {
      // Don't interfere if right-clicking inside an input or textarea (allow paste)
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      e.preventDefault();
      showToast('Right-click is protected. For code and resume access, please contact directly.');
    };

    // 3. Keyboard Shortcut Guard (Ctrl+S, Cmd+S, Ctrl+U, Cmd+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Prevent Ctrl+S or Cmd+S (Save webpage to disk)
      if (cmdOrCtrl && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        showToast('Saving page offline is disabled. Download official case-study data from the project page.');
        return;
      }

      // Prevent Ctrl+U or Cmd+U (View Page Source)
      if (cmdOrCtrl && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        showToast('Direct source view is restricted. Public repositories are linked in the Projects section.');
        return;
      }
    };

    // 4. Copy Attribution Interceptor: Appends source attribution when copying
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length === 0) return;

      const target = (selection.anchorNode?.parentElement as HTMLElement);
      // Allow seamless copying in input/textarea form fields
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      // If user is copying text, attach clear portfolio provenance
      const copiedText = selection.toString();
      const attribution = `\n\n— Sourced from Kaushar Halani Portfolio (${window.location.origin})`;
      
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', copiedText + attribution);
        e.preventDefault();
        showToast('Copied with attribution notice.');
      }
    };

    // Attach event listeners to the window
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);

    // Cleanup listeners when component unmounts
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  // Helper function to show a polite toast for 3.5 seconds
  const showToast = (message: string) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  };

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90%] sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none"
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/95 border border-primary/40 text-foreground shadow-2xl shadow-primary/20 backdrop-blur-md">
        <div className="p-1.5 rounded-xl bg-primary/15 text-primary border border-primary/30 shrink-0">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <p className="text-xs sm:text-sm font-medium leading-snug">
          {toastMessage}
        </p>
      </div>
    </div>
  );
}
