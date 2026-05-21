"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Keyboard, RefreshCcw, Timer as TimerIcon, Zap, Target } from "lucide-react";
import { trackToolUsage } from "@/lib/stats";
import { cn } from "@/lib/utils";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. ",
  "In a world where technology evolves at a rapid pace, the ability to type quickly and accurately remains a vital skill. ",
  "Programming is not just about writing code; it's about solving complex problems and creating elegant solutions. ",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. ",
  "Design is not just what it looks like and feels like. Design is how it works. ",
  "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. ",
  "Consistency is the hallmark of the unimaginative. It is the last refuge of the failure. ",
  "Innovation distinguishes between a leader and a follower. ",
  "Your time is limited, so don't waste it living someone else's life. "
];

export function TypingSpeedTest() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0 });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const initialText = Array.from({ length: 3 }, () => SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]).join('');
    setText(initialText);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !isFinished && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isFinished, timeLeft]);

  useEffect(() => {
    if (text.length - userInput.length < 50) {
      const nextSegment = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
      setText(prev => prev + nextSegment);
    }
  }, [userInput.length, text.length]);

  const startTest = () => {
    setStartTime(Date.now());
    setIsFinished(false);
    trackToolUsage("typing-speed-test");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime) startTest();
    setUserInput(val);
  };

  const finishTest = () => {
    setIsFinished(true);
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) correct++;
    }
    const wpm = Math.round((correct / 5) / 1) || 0;
    const accuracy = userInput.length > 0 ? Math.round((correct / userInput.length) * 100) : 0;
    setStats({ wpm, accuracy });
  };

  const resetTest = () => {
    setStartTime(null);
    setUserInput("");
    setTimeLeft(60);
    setIsFinished(false);
    const initialText = Array.from({ length: 3 }, () => SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]).join('');
    setText(initialText);
  };

  const currentWpm = startTime ? Math.round(((userInput.split('').filter((c, i) => c === text[i]).length) / 5) / ((60 - timeLeft) / 60 || 1)) : 0;

  const charWidth = isMobile ? 18 : 24; 
  const offset = -(userInput.length * charWidth) + (scrollContainerRef.current?.offsetWidth || 0) / 2;

  return (
    <div className="w-full px-4 overflow-hidden">
      <Card className="border-none shadow-none bg-background py-4 flex flex-col justify-center items-center gap-6">
        <CardHeader className="text-center p-0 space-y-2">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-extrabold tracking-tight text-black">
            <Keyboard className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
            Typing Speed Test
          </CardTitle>
          <CardDescription className="text-xs md:text-sm max-w-lg mx-auto">
            Test your WPM in real-time. The text slides as you type.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="w-full max-w-5xl space-y-6 md:space-y-8 p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-gradient-to-b from-white to-muted/20 p-4 rounded-2xl text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Time Left</p>
                <p className="text-2xl md:text-3xl font-black flex items-center justify-center gap-2 text-black">
                   <TimerIcon className="w-5 h-5 text-orange-500" /> {timeLeft}s
                </p>
             </div>
             <div className="bg-gradient-to-b from-white to-muted/20 p-4 rounded-2xl text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Current WPM</p>
                <p className="text-2xl md:text-3xl font-black flex items-center justify-center gap-2 text-black">
                   <Zap className="w-5 h-5 text-yellow-500" /> {isFinished ? stats.wpm : currentWpm}
                </p>
             </div>
             <div className="bg-gradient-to-b from-white to-muted/20 p-4 rounded-2xl text-center border border-slate-200 shadow-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Accuracy</p>
                <p className="text-2xl md:text-3xl font-black flex items-center justify-center gap-2 text-black">
                   <Target className="w-5 h-5 text-blue-500" /> {isFinished ? stats.accuracy + '%' : '---'}
                </p>
             </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="h-16 md:h-24 bg-white border border-slate-200 rounded-2xl relative w-full overflow-hidden flex items-center shadow-sm"
          >
             <div 
               className="flex whitespace-nowrap font-mono text-lg md:text-3xl font-medium transition-transform duration-200 ease-out will-change-transform"
               style={{ transform: `translateX(${startTime && !isFinished ? offset : 0}px)` }}
             >
               {text.split('').map((char, i) => {
                 let color = "text-black/30"; 
                 let decoration = "";
                 
                 if (i < userInput.length) {
                   const isCorrect = userInput[i] === char;
                  color = isCorrect ? "text-black font-semibold" : "text-destructive bg-destructive/10";
                   decoration = !isCorrect ? "underline decoration-destructive" : "";
                 } else if (i === userInput.length && startTime && !isFinished) {
                  color = "text-black bg-secondary/20 animate-pulse rounded-md";
                 }
                 
                 return (
                   <span 
                     key={i} 
                     className={cn(color, decoration, "inline-block text-center transition-colors duration-150")}
                     style={{ width: `${charWidth}px` }}
                   >
                     {char}
                   </span>
                 );
               })}
             </div>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto w-full">
            {!isFinished ? (
              <Input 
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing the text above..."
                className="h-12 md:h-16 text-lg md:text-xl text-center rounded-xl shadow-sm border border-slate-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white transition-all text-black"
                autoFocus
              />
            ) : (
              <div className="p-6 md:p-10 bg-primary text-white rounded-3xl text-center space-y-4 shadow-xl animate-in zoom-in-95 duration-500">
                 <h3 className="text-2xl md:text-4xl font-black tracking-tighter">Performance Result</h3>
                 <div className="flex justify-center gap-8 md:gap-12">
                    <div className="space-y-1">
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Average WPM</p>
                      <p className="text-4xl md:text-5xl font-black">{stats.wpm}</p>
                    </div>
                    <div className="w-px bg-white/10 h-16 self-center" />
                    <div className="space-y-1">
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Accuracy</p>
                      <p className="text-4xl md:text-5xl font-black">{stats.accuracy}%</p>
                    </div>
                 </div>
                 <Button onClick={resetTest} variant="secondary" size="lg" className="mt-2 h-12 md:h-14 text-base md:text-lg font-black rounded-xl">
                    <RefreshCcw className="w-4 h-4 mr-2" /> Start New Session
                 </Button>
              </div>
            )}
            
            {!startTime && !isFinished && (
              <p className="text-center text-xs md:text-sm text-muted-foreground animate-pulse font-medium">
                The timer starts when you type the first character.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
