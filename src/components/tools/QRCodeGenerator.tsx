"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share2, QrCode as QrIcon } from "lucide-react";
import { trackToolUsage } from "@/lib/stats";

export function QRCodeGenerator() {
  const [content, setContent] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerateClick = () => {
    if (!content.trim()) return;
    generateQR();
  };

  const generateQR = () => {
    // Using a placeholder QR generator service for simplicity in this example
    const encoded = encodeURIComponent(content);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`;
    setQrUrl(url);
    trackToolUsage("qr-generator");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>QR Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Enter Text or URL</Label>
            <Textarea 
              placeholder="e.g. https://google.com or your secret message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <Button 
            onClick={handleGenerateClick} 
            disabled={!content.trim()}
            className="w-full h-12 text-lg font-bold" 
            variant="secondary"
          >
            Generate QR Code
          </Button>

          {qrUrl && (
            <div className="mt-8 flex flex-col items-center pt-6 border-t space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="p-4 bg-white rounded-2xl shadow-md border ring-4 ring-muted">
                <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
              </div>
              
              <div className="flex gap-4 w-full">
                <Button variant="outline" className="flex-1 gap-2" asChild>
                  <a href={qrUrl} download="qrcode.png" target="_blank">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 gap-2" onClick={() => {
                  navigator.share?.({ title: 'My QR Code', url: qrUrl }).catch(console.error);
                }}>
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}