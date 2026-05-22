import type {Metadata} from 'next';
import { Suspense } from 'react';
import Script from 'next/script'; // এটি ব্যবহার করতে হবে
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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

        {/* AdSense Verification Meta Tag (গুগল বট খুব সহজেই এটি খুঁজে পাবে) */}
        <meta name="google-adsense-account" content="ca-pub-2391987813376112" />
        
        {/* Next.js এর Script কম্পোনেন্ট ব্যবহার করে AdSense কোড */}
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2391987813376112" 
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body suppressHydrationWarning className="font-body antialiased min-h-screen bg-background overflow-x-hidden">
        <FirebaseClientProvider>
          <SidebarProvider>
            <Suspense fallback={null}>
              <AppSidebar />
            </Suspense>
            <SidebarInset className="overflow-x-hidden">
              <SiteHeader />
              <main className="flex-1 w-full flex flex-col overflow-x-hidden">
                {children}
              </main>
              <SiteFooter />
            </SidebarInset>
          </SidebarProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
