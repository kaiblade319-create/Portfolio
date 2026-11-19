"use client"

import { useState, useCallback, useEffect } from "react"
import { usePathname } from "next/navigation"
import Preloader from "@/components/ui/preloader"

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showPreloader, setShowPreloader] = useState(false)

  useEffect(() => {
    if (pathname === "/") {
      const hasShown = sessionStorage.getItem('preloader-shown')
      setShowPreloader(!hasShown)
    } else {
      setShowPreloader(false)
    }
  }, [pathname])

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('preloader-shown', 'true')
    setShowPreloader(false)
  }, [])

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      {children}
    </>
  )
}
