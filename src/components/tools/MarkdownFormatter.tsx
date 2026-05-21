
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Eye, Code, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackToolUsage } from "@/lib/stats";

export function MarkdownFormatter() {
  const [markdown, setMarkdown] = useState("# Welcome to MD Formatter\n\nStart typing your **markdown** here to see it formatted.\n\n- List item 1\n- List item 2");
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerateClick = () => {
    processMarkdown();
  };

  const processMarkdown = () => {
    setView('preview');
    trackToolUsage("markdown-formatter");
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast({ title: "Copied!", description: "Markdown text copied" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Markdown Formatter
            </CardTitle>
            <CardDescription>Format and preview your markdown notes.</CardDescription>
          </div>
          <div className="flex bg-muted p-1 rounded-lg">
            <Button 
              variant={view === 'edit' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setView('edit')}
            >
              <Code className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button 
              variant={view === 'preview' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={handleGenerateClick}
            >
              <Eye className="w-4 h-4 mr-1" /> Preview
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {view === 'edit' ? (
            <div className="space-y-4">
              <Textarea 
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Type markdown here..."
              />
              <div className="flex gap-2">
                <Button onClick={copyMarkdown} variant="outline" className="flex-1">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Markdown
                </Button>
                <Button onClick={handleGenerateClick} className="flex-1" variant="secondary">
                   Show Preview
                </Button>
              </div>
            </div>
          ) : (
            <div className="min-h-[400px] p-6 bg-muted/30 rounded-lg border prose prose-sm max-w-none">
              {/* Very basic MD previewer for MVP */}
              {markdown.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-4 mb-2">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-3 mb-1">{line.replace('## ', '')}</h2>;
                if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
                return <p key={i} className="mb-2">{line}</p>;
              })}
              <Button 
                variant="outline" 
                className="mt-8"
                onClick={() => setView('edit')}
              >
                Back to Editor
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
