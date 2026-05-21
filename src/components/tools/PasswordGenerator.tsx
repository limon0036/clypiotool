"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackToolUsage } from "@/lib/stats";

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerateClick = () => {
    generatePassword();
  };

  const generatePassword = () => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let characters = "";
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (characters === "") {
      toast({ title: "Error", description: "Select at least one character type", variant: "destructive" });
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setGeneratedPassword(password);
    trackToolUsage("password-generator");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Password copied to clipboard" });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Configure Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Password Length: <span className="text-secondary font-bold">{length}</span></Label>
            </div>
            <Slider 
              value={[length]} 
              onValueChange={(val) => setLength(val[0])} 
              max={64} 
              min={4} 
              step={1} 
              className="py-4"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="uppercase" checked={options.uppercase} onCheckedChange={(val) => setOptions({...options, uppercase: !!val})} />
              <Label htmlFor="uppercase">ABC (Uppercase)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lowercase" checked={options.lowercase} onCheckedChange={(val) => setOptions({...options, lowercase: !!val})} />
              <Label htmlFor="lowercase">abc (Lowercase)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="numbers" checked={options.numbers} onCheckedChange={(val) => setOptions({...options, numbers: !!val})} />
              <Label htmlFor="numbers">123 (Numbers)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="symbols" checked={options.symbols} onCheckedChange={(val) => setOptions({...options, symbols: !!val})} />
              <Label htmlFor="symbols">#$& (Symbols)</Label>
            </div>
          </div>

          <Button onClick={handleGenerateClick} className="w-full h-12 text-lg font-bold" variant="secondary">
            Generate Password
          </Button>

          {generatedPassword && (
            <div className="mt-8 space-y-2 pt-6 border-t">
              <Label>Generated Result</Label>
              <div className="flex gap-2">
                <Input value={generatedPassword} readOnly className="font-mono text-lg bg-muted border-none" />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={handleGenerateClick}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}