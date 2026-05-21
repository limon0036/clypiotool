import type {Metadata} from 'next';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'clypio Utility Hub',
  description: 'Your one-stop shop for daily digital tools and utilities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2391987813376112"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning className="font-body antialiased min-h-screen bg-background overflow-x-hidden">
        <FirebaseClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-x-hidden">
              <SiteHeader />
              <main className="flex-1 w-full flex flex-col overflow-x-hidden">
                {children}
              </main>
              <footer className="mt-auto bg-white py-12">
                <div className="container mx-auto px-4 space-y-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
                    <div className="max-w-xs space-y-2">
                      <p className="text-3xl font-black tracking-tight text-foreground">clypio</p>
                      <p className="text-sm text-muted-foreground">Professional online tools for your daily digital work.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
                      <div className="space-y-1.5">
                        <Link href="/about" className="block text-foreground hover:text-primary">About</Link>
                      </div>
                      <div className="space-y-1.5">
                        <Link href="/terms" className="block text-foreground hover:text-primary">Terms</Link>
                        <Link href="/privacy-policy" className="block text-foreground hover:text-primary">Privacy Policy</Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-5">
                      <p>© {new Date().getFullYear()} clypio Utility Hub. All rights reserved.</p>
                      <Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
                      <Link href="/terms" className="hover:text-foreground">Terms of Use</Link>
                    </div>
                  </div>
                </div>
              </footer>
            </SidebarInset>
          </SidebarProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
