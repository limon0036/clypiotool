
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase'
import { doc } from 'firebase/firestore'
import { tools } from "@/lib/tools-data"
import { ChevronDown, MoreVertical } from "lucide-react"

/**
 * Global site header that conditionally hides itself on admin routes.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const db = useFirestore();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const siteConfigRef = useMemoFirebase(() => doc(db, 'admin_settings', 'site_config'), [db]);
  const { data: siteConfig } = useDoc(siteConfigRef);

  const siteName = siteConfig?.siteName || 'clypio Utility Hub';
  const logoUrl = siteConfig?.logoUrl;

  // Hide the global header if we are in the admin panel
  if (isAdmin) return null

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="relative flex h-16 items-center justify-between gap-4 px-4 md:px-6 border-b">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <img
            src={logoUrl || "/favicon.ico"}
            alt="Logo"
            className="w-8 h-8 object-contain shrink-0"
          />
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-primary truncate">{siteName}</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <Link href="/" className={pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}>Home</Link>
          <button
            type="button"
            onClick={() => setIsCategoriesOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
          >
            Categories
            <ChevronDown className={`w-4 h-4 transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`} />
          </button>
          <Link href="/about" className={pathname === "/about" ? "text-primary" : "text-muted-foreground hover:text-primary"}>About</Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary"
          aria-label="Open menu"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {isCategoriesOpen && (
          <div className="hidden md:block absolute left-0 right-0 top-full border-b bg-background/95 backdrop-blur-md z-50">
            <div className="px-4 md:px-6 py-3">
              <div className="flex flex-wrap items-center gap-2">
                {tools.map((tool) => {
                  const isActive = pathname === `/tools/${tool.slug}`;
                  return (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      onClick={() => setIsCategoriesOpen(false)}
                      className={`rounded px-2.5 py-1.5 text-xs transition-colors ${
                        isActive
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {tool.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden absolute right-4 top-full mt-2 w-64 rounded-xl border bg-background shadow-lg z-50">
            <div className="p-3 space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
              >
                About
              </Link>
              <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Categories</p>
              <div className="max-h-56 overflow-auto">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {tool.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
