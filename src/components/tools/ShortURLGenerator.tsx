
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link2, Copy, Check, ExternalLink } from "lucide-react";
import { trackToolUsage } from "@/lib/stats";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function ShortURLGenerator() {
  const [url, setUrl] = useState("");
  const [shortResult, setShortResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerateClick = () => {
    if (!url.trim()) return;
    generateShortUrl();
  };

  const generateShortUrl = async () => {
    // Basic short code generation logic for simulation
    const code = Math.random().toString(36).substring(2, 8);
    const shortUrl = `${window.location.origin}/s/${code}`;
    
    try {
      await setDoc(doc(db, "shortUrls", code), {
        originalUrl: url,
        shortCode: code,
        clicks: 0,
        createdAt: new Date().toISOString()
      });
      
      setShortResult(shortUrl);
      trackToolUsage("short-url-generator");
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to create short URL", variant: "destructive" });
    }
    
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Short URL copied to clipboard" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-600" />
            URL Shortener
          </CardTitle>
          <CardDescription>Paste your long link below to get a clean, short version.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="long-url">Destination URL</Label>
            <Input 
              id="long-url"
              placeholder="https://very-long-website-address.com/some/deep/path"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleGenerateClick} 
            disabled={!url.trim()}
            className="w-full h-12 text-lg font-bold" 
            variant="secondary"
          >
            Shorten URL
          </Button>

          {shortResult && (
            <div className="mt-8 p-6 bg-muted/50 rounded-2xl space-y-4 animate-in zoom-in-95">
              <Label>Your Short Link</Label>
              <div className="flex gap-2">
                <Input value={shortResult} readOnly className="font-mono bg-white" />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="icon" asChild>
                   <a href={shortResult} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                   </a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
