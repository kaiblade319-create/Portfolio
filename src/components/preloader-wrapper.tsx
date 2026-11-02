"use client"

import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import Preloader from "@/components/ui/preloader"

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)
  const [shouldShowContent, setShouldShowContent] = useState(true)

  useEffect(() => {
    setMounted(true)
    if (pathname === "/") {
      const hasShown = sessionStorage.getItem('preloader-shown')
      if (!hasShown) {
        setShowPreloader(true)
        setShouldShowContent(false)
      } else {
        setShowPreloader(false)
        setShouldShowContent(true)
      }
    } else {
      setShowPreloader(false)
      setShouldShowContent(true)
    }
  }, [pathname])

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('preloader-shown', 'true')
    setShowPreloader(false)
    setShouldShowContent(true)
  }, [])

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      {shouldShowContent && children}
    </>
  )
}
