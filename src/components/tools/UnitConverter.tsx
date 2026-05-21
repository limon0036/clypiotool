"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight, Calculator } from "lucide-react";
import { trackToolUsage } from "@/lib/stats";

const conversionData = {
  length: {
    units: ["Meters", "Kilometers", "Miles", "Feet", "Inches"],
    ratios: {
      Meters: 1,
      Kilometers: 0.001,
      Miles: 0.000621371,
      Feet: 3.28084,
      Inches: 39.3701,
    }
  },
  weight: {
    units: ["Grams", "Kilograms", "Pounds", "Ounces"],
    ratios: {
      Grams: 1,
      Kilograms: 0.001,
      Pounds: 0.00220462,
      Ounces: 0.035274,
    }
  }
};

export function UnitConverter() {
  const [category, setCategory] = useState<"length" | "weight">("length");
  const [fromUnit, setFromUnit] = useState("Meters");
  const [toUnit, setToUnit] = useState("Kilometers");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState<string | null>(null);

  const handleConvertClick = () => {
    convert();
  };

  const convert = () => {
    const data = conversionData[category];
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("Invalid Input");
    } else {
      // Base conversion (to common base 1)
      const base = val / (data.ratios as any)[fromUnit];
      // To target
      const final = base * (data.ratios as any)[toUnit];
      setResult(final.toLocaleString(undefined, { maximumFractionDigits: 6 }));
    }
    trackToolUsage("unit-converter");
  };

  const swap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Converter Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Measurement Category</Label>
            <Select value={category} onValueChange={(val: any) => {
              setCategory(val);
              setFromUnit(conversionData[val].units[0]);
              setToUnit(conversionData[val].units[1]);
              setResult(null);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="length">Length</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={(val) => { setFromUnit(val); setResult(null); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conversionData[category].units.map(u => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="ghost" size="icon" onClick={swap} className="mb-0.5 rounded-full hover:bg-secondary/10">
              <ArrowLeftRight className="w-4 h-4" />
            </Button>

            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toUnit} onValueChange={(val) => { setToUnit(val); setResult(null); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conversionData[category].units.map(u => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input 
              type="number" 
              value={inputValue} 
              onChange={(e) => { setInputValue(e.target.value); setResult(null); }} 
              className="h-12 text-lg"
            />
          </div>

          <Button 
            onClick={handleConvertClick}
            className="w-full h-12 text-lg font-bold" 
            variant="secondary"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Convert Now
          </Button>

          {result !== null && (
            <div className="mt-8 p-6 bg-secondary/5 border-2 border-secondary/20 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Conversion Result</p>
              <p className="text-3xl font-extrabold text-primary">
                {inputValue} {fromUnit} = <span className="text-secondary">{result}</span> {toUnit}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}