
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Info } from "lucide-react";
import { trackToolUsage } from "@/lib/stats";

export function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ bmi: string, status: string, color: string } | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      const bmi = bmiValue.toFixed(1);
      let status = "";
      let color = "";

      if (bmiValue < 18.5) { status = "Underweight"; color = "text-blue-500"; }
      else if (bmiValue < 25) { status = "Normal weight"; color = "text-green-500"; }
      else if (bmiValue < 30) { status = "Overweight"; color = "text-yellow-600"; }
      else { status = "Obese"; color = "text-red-500"; }

      setResult({ bmi, status, color });
      trackToolUsage("bmi-calculator");
    }
  };

  const handleCalculateClick = () => {
    if (!height || !weight) return;
    calculateBMI();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            BMI Calculator
          </CardTitle>
          <CardDescription>Enter your height and weight to get your Body Mass Index.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height"
                type="number" 
                placeholder="e.g. 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight"
                type="number" 
                placeholder="e.g. 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleCalculateClick}
            disabled={!height || !weight}
            className="w-full h-12 text-lg font-bold" 
            variant="secondary"
          >
            Calculate BMI
          </Button>

          {result && (
            <div className="mt-8 p-6 bg-muted/50 rounded-2xl text-center space-y-4 animate-in zoom-in-95">
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Your BMI</p>
                <p className={`text-5xl font-extrabold ${result.color}`}>{result.bmi}</p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border shadow-sm">
                 <div className={`w-3 h-3 rounded-full ${result.color.replace('text', 'bg')}`} />
                 <span className="font-bold text-primary">{result.status}</span>
              </div>
              
              <div className="pt-4 border-t text-left text-xs text-muted-foreground space-y-1">
                <p className="flex items-center gap-1 font-semibold text-primary"><Info className="w-3 h-3" /> BMI Categories:</p>
                <p>• Underweight: &lt; 18.5</p>
                <p>• Normal weight: 18.5 – 24.9</p>
                <p>• Overweight: 25 – 29.9</p>
                <p>• Obese: &gt; 30</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
