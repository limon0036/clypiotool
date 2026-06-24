"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"

export function SiteFooter() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")
  const db = useFirestore()

  const siteConfigRef = useMemoFirebase(
    () => doc(db, "admin_settings", "site_config"),
    [db]
  )
  const { data: siteConfig } = useDoc(siteConfigRef)

  const siteName = siteConfig?.siteName || "clypio Utility Hub"
  const logoUrl = siteConfig?.logoUrl

  if (isAdmin) return null

  return (
    <footer className="mt-auto bg-white py-12">
      <div className="container mx-auto px-4 space-y-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-xs space-y-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src={logoUrl || "/favicon.ico"}
                alt={`${siteName} logo`}
                className="w-14 h-14 object-contain shrink-0"
              />
              <p className="text-3xl font-black tracking-tight text-foreground">
                {siteName}
              </p>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional online tools for your daily digital work.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
            <div className="space-y-1.5">
              <Link href="/about" className="block text-foreground hover:text-primary">
                About
              </Link>
              <Link href="/blog" className="block text-foreground hover:text-primary">
                Blog
              </Link>
              <Link href="/user-guide" className="block text-foreground hover:text-primary">
                How to use
              </Link>
            </div>
            <div className="space-y-1.5">
              <Link href="/terms" className="block text-foreground hover:text-primary">
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="block text-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-5">
            <p>
              © {new Date().getFullYear()} {siteName}. All rights reserved.
            </p>
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
