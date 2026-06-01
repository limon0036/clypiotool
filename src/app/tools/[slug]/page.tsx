
"use client"

import React, { useEffect, useState, useRef, use } from 'react';
import { notFound } from 'next/navigation';
import { PasswordGenerator } from '@/components/tools/PasswordGenerator';
import { QRCodeGenerator } from '@/components/tools/QRCodeGenerator';
import { UnitConverter } from '@/components/tools/UnitConverter';
import { BMICalculator } from '@/components/tools/BMICalculator';
import { MarkdownFormatter } from '@/components/tools/MarkdownFormatter';
import { ShortURLGenerator } from '@/components/tools/ShortURLGenerator';
import { TypingSpeedTest } from '@/components/tools/TypingSpeedTest';
import { Stopwatch } from '@/components/tools/Stopwatch';
import { ToDoList } from '@/components/tools/ToDoList';
import { ChevronLeft, Info, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, query, where, limit, doc } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { tools } from '@/lib/tools-data';
import { ToolDescriptionSection } from '@/components/tools/ToolDescriptionSection';
import { OtherToolsNav } from '@/components/tools/OtherToolsNav';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';

const toolComponentMap: Record<string, { component: React.ReactNode, title: string, subtitle: string }> = {
  'password-generator': { component: <PasswordGenerator />, title: 'Password Generator', subtitle: 'Generate uncrackable passwords in seconds.' },
  'qr-generator': { component: <QRCodeGenerator />, title: 'QR Code Creator', subtitle: 'Create dynamic QR codes for any content.' },
  'unit-converter': { component: <UnitConverter />, title: 'Unit Converter', subtitle: 'Seamless conversions across different systems.' },
  'bmi-calculator': { component: <BMICalculator />, title: 'BMI Calculator', subtitle: 'Calculate your Body Mass Index quickly and easily.' },
  'markdown-formatter': { component: <MarkdownFormatter />, title: 'Markdown Formatter', subtitle: 'Write and preview Markdown with real-time formatting.' },
  'short-url-generator': { component: <ShortURLGenerator />, title: 'Short URL Generator', subtitle: 'Turn long links into clean, shareable short URLs.' },
  'typing-speed-test': { component: <TypingSpeedTest />, title: 'Typing Speed Test', subtitle: 'How fast can you type? Test your WPM and accuracy.' },
  'stopwatch': { component: <Stopwatch />, title: 'Precision Stopwatch', subtitle: 'Measure time accurately with lap tracking support.' },
  'todo-list': { component: <ToDoList />, title: 'Online To-Do List', subtitle: 'Manage your tasks and stay organized without an account.' },
};

function AdScriptRunner({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;
    containerRef.current.innerHTML = "";
    const temp = document.createElement('div');
    temp.innerHTML = html;
    Array.from(temp.childNodes).forEach(node => {
      if (node.nodeName !== 'SCRIPT') {
        containerRef.current?.appendChild(node.cloneNode(true));
      }
    });
    const scripts = temp.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.innerHTML) {
        newScript.innerHTML = oldScript.innerHTML;
      }
      containerRef.current?.appendChild(newScript);
    });
  }, [html]);

  return <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden" />;
}

function AdSlot({ config, label }: { config: any, label: string }) {
  if (!config?.enabled) return null;
  const snippet = config.customSnippet;
  if (!snippet) return null;

  return (
    <div 
      className="border border-dashed bg-muted/5 flex flex-col items-center overflow-hidden shrink-0 mx-auto transition-all duration-500 animate-in fade-in"
      style={{ 
        width: config.width ? `${config.width}px` : 'auto', 
        height: config.height ? `${config.height}px` : 'auto',
        maxWidth: '100%'
      }}
    >
      <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1 mb-1">{label}</p>
      <AdScriptRunner html={snippet} />
    </div>
  );
}

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const db = useFirestore();

  const toolQuery = useMemoFirebase(() => {
    return query(collection(db, 'tools'), where('slug', '==', slug), limit(1));
  }, [db, slug]);
  
  const { data: toolResults } = useCollection(toolQuery);

  const localTool = tools.find(t => t.slug === slug);
  if (!localTool) notFound();

  const toolData = toolResults?.[0] || {
    id: localTool.id,
    name: localTool.title,
    isActive: true,
    accessType: 'free',
    slug: localTool.slug,
    description: localTool.description,
    ads: {
      top: { enabled: false },
      bottom: { enabled: false },
      left: { enabled: false },
      right: { enabled: false }
    }
  };

  const globalAdsRef = useMemoFirebase(() => doc(db, 'admin_settings', 'global_ads'), [db]);
  const { data: globalAds } = useDoc(globalAdsRef);

  useEffect(() => {
    if (globalAds?.headerScript) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = globalAds.headerScript;
      tempDiv.querySelectorAll('script').forEach(s => {
        const script = document.createElement('script');
        Array.from(s.attributes).forEach(attr => script.setAttribute(attr.name, attr.value));
        script.innerHTML = s.innerHTML;
        document.head.appendChild(script);
      });
    }
  }, [globalAds?.headerScript]);

  const toolConfig = toolComponentMap[slug];
  if (!toolConfig) notFound();

  const ads = toolData.ads || {};

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          
          <div className="hidden lg:flex flex-col gap-6 shrink-0 sticky top-24 min-w-0">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-secondary mb-2 transition-colors group">
              <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back
            </Link>
            <AdSlot config={ads.left} label="Advertisement" />
          </div>

          <div className="flex-1 w-full min-w-0 flex flex-col">
            <div className="lg:hidden mb-6">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-secondary transition-colors group">
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </Link>
            </div>

            <div className="mb-10 text-center animate-in fade-in duration-500">
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-3">{toolConfig.title}</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">{toolConfig.subtitle}</p>
              {toolData?.accessType === 'pro' && (
                <Badge className="mt-4 bg-purple-100 text-purple-700 hover:bg-purple-100 border-none font-bold uppercase tracking-wider text-[10px] px-3">Pro Utility</Badge>
              )}
            </div>

            <div className="mb-8 w-full">
              <AdSlot config={ads.top} label="Sponsored" />
            </div>

            <div className="relative w-full">
              {toolData?.isActive === false && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-6 rounded-3xl border-4 border-dashed">
                  <Info className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-2xl font-bold">Tool Under Maintenance</h3>
                  <p className="text-muted-foreground max-w-xs mt-2">This tool is currently being optimized by our team. Check back soon!</p>
                  <Button asChild className="mt-6" variant="secondary"><Link href="/">Go to Dashboard</Link></Button>
                </div>
              )}
              <div className="max-w-4xl mx-auto w-full">
                {toolConfig.component}
              </div>
              <OtherToolsNav currentSlug={slug} />
              <ToolDescriptionSection slug={slug} />
            </div>

            <div className="mt-12 w-full">
              <AdSlot config={ads.bottom} label="Advertisement" />
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-6 shrink-0 sticky top-24 min-w-0">
            <AdSlot config={ads.right} label="Sponsored" />
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 pb-10 md:pb-12 max-w-[1600px]">
        <WhyChooseUsSection className="mt-4" />
      </div>
    </div>
  );
}
