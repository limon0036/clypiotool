
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Timer, Play, Pause, RotateCcw, Flag } from "lucide-react";
import { trackToolUsage } from "@/lib/stats";

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
      trackToolUsage("stopwatch");
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps([time, ...laps]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-sm overflow-hidden bg-primary text-white">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-white/60 uppercase tracking-widest text-xs font-bold">Precision Stopwatch</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-12">
          <div className="text-7xl md:text-8xl font-mono font-bold tracking-tighter mb-12">
            {formatTime(time)}
          </div>
          
          <div className="flex gap-4 w-full max-w-sm">
            {!isRunning ? (
              <Button 
                onClick={() => setIsRunning(true)} 
                className="flex-1 h-14 bg-green-500 hover:bg-green-600 text-white border-none rounded-2xl"
              >
                <Play className="w-6 h-6 mr-2" /> Start
              </Button>
            ) : (
              <Button 
                onClick={() => setIsRunning(false)} 
                className="flex-1 h-14 bg-red-500 hover:bg-red-600 text-white border-none rounded-2xl"
              >
                <Pause className="w-6 h-6 mr-2" /> Pause
              </Button>
            )}
            
            <Button 
              onClick={isRunning ? handleLap : handleReset} 
              variant="outline"
              className="flex-1 h-14 bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-2xl"
            >
              {isRunning ? (
                <><Flag className="w-6 h-6 mr-2" /> Lap</>
              ) : (
                <><RotateCcw className="w-6 h-6 mr-2" /> Reset</>
              )}
            </Button>
          </div>

          {laps.length > 0 && (
            <div className="w-full mt-12 space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {laps.map((lapTime, i) => (
                <div key={i} className="flex justify-between items-center py-3 px-6 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 font-bold">Lap {laps.length - i}</span>
                  <span className="font-mono text-xl">{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
