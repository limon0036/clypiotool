"use client"

import React from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools-data';
import { ArrowRight, CheckCircle2, Cpu, Globe, ShieldCheck, Sparkles } from 'lucide-react';

export default function Home() {
  const popularTools = tools.slice(0, 6);

  return (
    <>
      <section className="w-full min-h-[420px] md:min-h-[500px] bg-gradient-to-br from-cyan-50 via-white to-indigo-50 py-12 md:py-16 lg:py-20 animate-in fade-in slide-in-from-top-3">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700">
                <Sparkles className="w-3.5 h-3.5" />
                Premium Utility Platform
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
                Free Online Tools For Everyone
              </h1>
              <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Use powerful online tools for image, PDF, text, SEO, developer, and AI tasks.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="#popular-tools" className="inline-flex h-11 md:h-12 items-center justify-center rounded-md bg-secondary px-6 text-sm font-bold text-secondary-foreground hover:bg-secondary/90">
                  Explore Tools
                </Link>
                <Link href="#featured-tool" className="inline-flex h-11 md:h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-bold text-primary hover:bg-muted">
                  Popular Tools
                </Link>
              </div>
            </div>
            <div className="relative w-full min-h-[300px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[440px]">
              <div className="absolute right-0 top-4 h-44 w-44 md:h-52 md:w-52 rounded-3xl bg-cyan-200/70 rotate-[8deg] animate-in zoom-in-95" />
              <div className="absolute left-6 top-16 h-36 w-36 md:h-40 md:w-40 rounded-2xl bg-indigo-200/70 -rotate-[10deg] animate-in fade-in" />
              <div className="absolute inset-0 m-auto h-48 w-72 sm:h-56 sm:w-80 md:h-64 md:w-96 rounded-3xl bg-white/90 shadow-xl flex items-center justify-center rotate-[2deg]">
                <div className="text-center space-y-2 px-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Modern Illustration</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-primary">{tools.length}+ Smart Tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12 space-y-10">
      <section id="featured-tool" className="rounded-3xl bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 p-6 md:p-8 animate-in fade-in slide-in-from-left-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Featured Tool</p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{popularTools[0]?.title || "Featured Tool"}</h2>
            <p className="text-muted-foreground max-w-xl">{popularTools[0]?.description}</p>
          </div>
          <Link href={`/tools/${popularTools[0]?.slug || "typing-speed-test"}`} className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90">
            Open Tool <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section id="popular-tools" className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Popular Tools Grid</h2>
          <p className="text-sm text-muted-foreground">{tools.length} total tools</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="rounded-2xl p-4 bg-white hover:bg-muted/40 transition-all hover:-translate-y-0.5"
            >
              <p className="font-bold text-primary">{tool.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-r from-slate-50 to-cyan-50 p-6 md:p-8 animate-in fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-5">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white p-4 space-y-2">
            <ShieldCheck className="w-5 h-5 text-cyan-600" />
            <p className="font-bold text-primary">Secure & Reliable</p>
            <p className="text-sm text-muted-foreground">Built with trusted modern technologies.</p>
          </div>
          <div className="rounded-xl bg-white p-4 space-y-2">
            <Cpu className="w-5 h-5 text-violet-600" />
            <p className="font-bold text-primary">Fast Performance</p>
            <p className="text-sm text-muted-foreground">Optimized UI for quick tool access.</p>
          </div>
          <div className="rounded-xl bg-white p-4 space-y-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            <p className="font-bold text-primary">All-in-One Platform</p>
            <p className="text-sm text-muted-foreground">Multiple categories in one dashboard.</p>
          </div>
          <div className="rounded-xl bg-white p-4 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-amber-600" />
            <p className="font-bold text-primary">User-Friendly</p>
            <p className="text-sm text-muted-foreground">Simple navigation for everyone.</p>
          </div>
        </div>
      </section>

      </div>
    </>
  );
}
