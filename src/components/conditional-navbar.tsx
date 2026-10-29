"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/layout/navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Define valid routes
  const validRoutes = [
    '/',
    '/profile',
    '/projects',
    '/resume',
  ]
  
  // Check if pathname matches valid routes or valid patterns
  const isValidRoute = 
    validRoutes.includes(pathname) || 
    pathname.startsWith('/projects/') // Matches /projects/[id] and /projects/[id]/report
  
  // Hide navbar on 404 page (invalid routes)
  if (!isValidRoute) {
    return null
  }
  
  return <Navbar />
}
