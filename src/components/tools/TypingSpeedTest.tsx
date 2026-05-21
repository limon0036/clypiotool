"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

function buildInitialText() {
  return Array.from({ length: 3 }, () => SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]).join('');
}

export function TypingSpeedTest() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0 });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userInputRef = useRef(userInput);
  const textRef = useRef(text);
  const [isMobile, setIsMobile] = useState(false);

  userInputRef.current = userInput;
  textRef.current = text;

  const finishTest = () => {
    const input = userInputRef.current;
    const target = textRef.current;
    setIsFinished(true);
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === target[i]) correct++;
    }
    const wpm = Math.round(correct / 5) || 0;
    const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 0;
    setStats({ wpm, accuracy });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setText(buildInitialText());
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
      setText((prev) => prev + nextSegment);
    }
  }, [userInput.length, text.length]);

  const startTest = () => {
    setStartTime(Date.now());
    setIsFinished(false);
    trackToolUsage("typing-speed-test");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    const val = e.target.value;
    if (val.length > userInput.length + 1) return;
    if (!startTime) startTest();
    setUserInput(val);
  };

  const resetTest = () => {
    setStartTime(null);
    setUserInput("");
    setTimeLeft(60);
    setIsFinished(false);
    setStats({ wpm: 0, accuracy: 0 });
    setText(buildInitialText());
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const focusTypingArea = () => {
    if (!isFinished) inputRef.current?.focus();
  };

  const currentWpm = startTime
    ? Math.round(
        (userInput.split('').filter((c, i) => c === text[i]).length / 5) /
          ((60 - timeLeft) / 60 || 1)
      )
    : 0;

  const liveAccuracy =
    userInput.length > 0
      ? Math.round(
          (userInput.split('').filter((c, i) => c === text[i]).length / userInput.length) * 100
        )
      : null;

  const charWidth = isMobile ? 18 : 24;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const centerOffset = containerWidth / 2 - userInput.length * charWidth;

  return (
    <div className="w-full px-4 overflow-hidden">
      <Card className="border-none shadow-none bg-background py-4 flex flex-col justify-center items-center gap-6">
        <CardHeader className="text-center p-0 space-y-2">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-extrabold tracking-tight text-black">
            <Keyboard className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
            Typing Speed Test
          </CardTitle>
          <CardDescription className="text-xs md:text-sm max-w-lg mx-auto">
            Click the text box and type directly. New text keeps appearing as you go.
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full max-w-5xl space-y-6 md:space-y-8 p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={cn(
                "p-4 rounded-2xl text-center border-2 shadow-md transition-all duration-300",
                "bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 border-orange-200/80",
                "animate-in fade-in slide-in-from-left-4 duration-500",
                timeLeft <= 10 && startTime && !isFinished && "animate-pulse ring-2 ring-orange-400/60"
              )}
            >
              <p className="text-[10px] font-bold text-orange-700/80 uppercase tracking-widest mb-1">Time Left</p>
              <p className="text-2xl md:text-3xl font-black flex items-center justify-center gap-2 text-orange-950">
                <TimerIcon className="w-5 h-5 text-orange-500" />
                <span className="tabular-nums">{timeLeft}s</span>
              </p>
            </div>
            <div
              className={cn(
                "p-4 rounded-2xl text-center border-2 shadow-md transition-all duration-300",
                "bg-gradient-to-br from-yellow-100 via-lime-50 to-amber-50 border-yellow-300/80",
                "animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100"
              )}
            >
              <p className="text-[10px] font-bold text-yellow-800/80 uppercase tracking-widest mb-1">Current WPM</p>
              <p className="text-2xl md:text-3xl font-black flex items-center justify-center gap-2 text-amber-950">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="tabular-nums">{isFinished ? stats.wpm : currentWpm}</span>
              </p>
            </div>
            <div
              className={cn(
                "p-4 rounded-2xl text-center border-2 shadow-md transition-all duration-300",
                "bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 border-blue-200/80",
                "animate-in fade-in slide-in-from-right-4 duration-500 delay-200"
              )}
            >
              <p className="text-[10px] font-bold text-blue-800/80 uppercase tracking-widest mb-1">Accuracy</p>
              <p className="text-2xl md:text-3xl font-black flex items-center justify-center gap-2 text-blue-950">
                <Target className="w-5 h-5 text-blue-500" />
                <span className="tabular-nums">
                  {isFinished ? `${stats.accuracy}%` : liveAccuracy !== null ? `${liveAccuracy}%` : '---'}
                </span>
              </p>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            role="textbox"
            tabIndex={isFinished ? -1 : 0}
            aria-label="Typing area — type the characters shown"
            onClick={focusTypingArea}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            className={cn(
              "min-h-[5.5rem] md:min-h-[7rem] rounded-2xl relative w-full overflow-hidden flex items-center border-0 shadow-md",
              "bg-gradient-to-r from-violet-100 via-cyan-50 to-emerald-100",
              !isFinished && "cursor-text"
            )}
          >
            {!isFinished && (
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onPaste={(e) => e.preventDefault()}
                className="absolute inset-0 w-full h-full opacity-0 cursor-text z-10"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-hidden
                tabIndex={-1}
              />
            )}

            <div
              className="flex whitespace-nowrap font-mono text-lg md:text-3xl font-medium text-black transition-transform duration-200 ease-out will-change-transform px-2 pointer-events-none select-none"
              style={{
                transform: `translateX(${centerOffset}px)`,
              }}
            >
              {text.split('').map((char, i) => {
                let color = "text-black";

                if (i < userInput.length) {
                  const isCorrect = userInput[i] === char;
                  color = isCorrect
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold bg-red-50";
                } else if (i === userInput.length && startTime && !isFinished) {
                  color = "text-black bg-secondary/30 rounded-sm ring-2 ring-secondary/50";
                }

                return (
                  <span
                    key={i}
                    className={cn(color, "inline-block text-center transition-colors duration-150")}
                    style={{ width: `${charWidth}px` }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>

          <Dialog
            open={isFinished}
            onOpenChange={(open) => {
              if (!open) resetTest();
            }}
          >
            <DialogContent className="max-w-md border-0 bg-white p-8 sm:p-10 rounded-3xl shadow-2xl text-center sm:max-w-md">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl md:text-3xl font-black tracking-tight text-primary text-center">
                  Performance Result
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center gap-10 py-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                    Average WPM
                  </p>
                  <p className="text-4xl md:text-5xl font-black text-green-600">{stats.wpm}</p>
                </div>
                <div className="w-px bg-border h-16 self-center" />
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                    Accuracy
                  </p>
                  <p className="text-4xl md:text-5xl font-black text-blue-600">{stats.accuracy}%</p>
                </div>
              </div>
              <Button
                onClick={resetTest}
                variant="secondary"
                size="lg"
                className="w-full h-12 md:h-14 text-base font-bold rounded-xl"
              >
                <RefreshCcw className="w-4 h-4 mr-2" /> Start New Session
              </Button>
            </DialogContent>
          </Dialog>

          {!startTime && !isFinished && (
            <p className="text-center text-xs md:text-sm text-muted-foreground font-medium">
              The timer starts when you type the first character.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
