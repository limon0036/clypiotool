"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  RefreshCcw,
  Timer as TimerIcon,
  Zap,
  Target,
  Hash,
  CheckCircle2,
  XCircle,
} from "lucide-react";
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

type TypingStats = {
  wpm: number;
  accuracy: number;
  totalWords: number;
  correctWords: number;
  wrongWords: number;
};

const EMPTY_STATS: TypingStats = {
  wpm: 0,
  accuracy: 0,
  totalWords: 0,
  correctWords: 0,
  wrongWords: 0,
};

function computeTypingStats(input: string, target: string): TypingStats {
  let correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === target[i]) correctChars++;
  }

  const inputWords = input.trim() ? input.trim().split(/\s+/) : [];
  const targetWords = target.trim() ? target.trim().split(/\s+/) : [];
  let correctWords = 0;
  for (let i = 0; i < inputWords.length; i++) {
    if (inputWords[i] === targetWords[i]) correctWords++;
  }

  const totalWords = inputWords.length;
  const wrongWords = Math.max(0, totalWords - correctWords);

  return {
    wpm: Math.round(correctChars / 5) || 0,
    accuracy: input.length > 0 ? Math.round((correctChars / input.length) * 100) : 0,
    totalWords,
    correctWords,
    wrongWords,
  };
}

function StatCard({
  label,
  value,
  icon,
  className,
  valueClassName,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  className: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn("p-3 md:p-4 rounded-2xl text-center border-2 shadow-md", className)}>
      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">{label}</p>
      <p
        className={cn(
          "text-xl md:text-2xl font-black flex items-center justify-center gap-1.5",
          valueClassName
        )}
      >
        {icon}
        <span className="tabular-nums">{value}</span>
      </p>
    </div>
  );
}

export function TypingSpeedTest() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState<TypingStats>(EMPTY_STATS);

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
    setStats(computeTypingStats(input, target));
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
    setStats(EMPTY_STATS);
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

  const liveStats = computeTypingStats(userInput, text);
  const displayStats: TypingStats = isFinished
    ? stats
    : { ...liveStats, wpm: currentWpm };

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

  const showStartHint = !startTime && !isFinished && userInput.length === 0;
  const textPadding = 16;

  // Keep caret centered; slide text horizontally as user types
  const caretLeft = containerWidth / 2;
  const textTranslate =
    containerWidth / 2 - textPadding - userInput.length * charWidth;

  return (
    <div className="w-full px-4 overflow-hidden">
      <Card className="border-none shadow-none bg-background py-4 flex flex-col justify-center items-center gap-6">
        <CardContent className="w-full max-w-5xl space-y-6 md:space-y-8 p-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            <StatCard
              label="Time Left"
              value={`${timeLeft}s`}
              icon={<TimerIcon className="w-4 h-4 md:w-5 md:h-5 text-orange-500 shrink-0" />}
              className={cn(
                "bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 border-orange-200/80 text-orange-950",
                timeLeft <= 10 && startTime && !isFinished && "animate-pulse ring-2 ring-orange-400/60"
              )}
            />
            <StatCard
              label="Current WPM"
              value={displayStats.wpm}
              icon={<Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 shrink-0" />}
              className="bg-gradient-to-br from-yellow-100 via-lime-50 to-amber-50 border-yellow-300/80 text-amber-950"
            />
            <StatCard
              label="Accuracy"
              value={userInput.length > 0 || isFinished ? `${displayStats.accuracy}%` : "---"}
              icon={<Target className="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0" />}
              className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 border-blue-200/80 text-blue-950"
            />
            <StatCard
              label="Total Words"
              value={displayStats.totalWords}
              icon={<Hash className="w-4 h-4 md:w-5 md:h-5 text-violet-500 shrink-0" />}
              className="bg-gradient-to-br from-violet-100 via-purple-50 to-fuchsia-50 border-violet-200/80 text-violet-950"
            />
            <StatCard
              label="Correct Words"
              value={displayStats.correctWords}
              icon={<CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 shrink-0" />}
              className="bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 border-green-200/80 text-green-950"
              valueClassName="text-green-700"
            />
            <StatCard
              label="Wrong Words"
              value={displayStats.wrongWords}
              icon={<XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0" />}
              className="bg-gradient-to-br from-red-100 via-rose-50 to-orange-50 border-red-200/80 text-red-950"
              valueClassName="text-red-600"
            />
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
              className="flex whitespace-nowrap font-serif text-xl md:text-3xl font-normal text-black transition-transform duration-150 ease-out will-change-transform pl-4 pointer-events-none select-none"
              style={{
                transform: `translateX(${textTranslate}px)`,
              }}
            >
              {text.split('').map((char, i) => {
                let color = "text-black";

                if (i < userInput.length) {
                  const isCorrect = userInput[i] === char;
                  color = isCorrect
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold bg-red-50";
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

            {!isFinished && (
              <div
                className="absolute top-1/2 z-20 pointer-events-none -translate-y-1/2"
                style={{ left: `${caretLeft}px` }}
                aria-hidden
              >
                {showStartHint && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                    <div className="relative bg-[#ffeb3b] text-gray-900 text-sm md:text-base font-semibold px-5 py-2 rounded-md shadow-md whitespace-nowrap">
                      Start typing
                      <span
                        className="absolute left-1/2 -translate-x-1/2 top-full block w-0 h-0"
                        style={{
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderTop: "8px solid #ffeb3b",
                        }}
                      />
                    </div>
                  </div>
                )}
                <span className="block w-[2px] md:w-[3px] h-7 md:h-9 bg-neutral-800 rounded-full typing-caret" />
              </div>
            )}
          </div>

          <Dialog
            open={isFinished}
            onOpenChange={(open) => {
              if (!open) resetTest();
            }}
          >
            <DialogContent className="max-w-lg border-0 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl text-center sm:max-w-lg">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-2xl md:text-3xl font-black tracking-tight text-primary text-center">
                  Performance Result
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
                {[
                  { label: "Time Left", value: "0s", className: "text-orange-600" },
                  { label: "WPM", value: stats.wpm, className: "text-amber-600" },
                  { label: "Accuracy", value: `${stats.accuracy}%`, className: "text-blue-600" },
                  { label: "Total Words", value: stats.totalWords, className: "text-violet-600" },
                  { label: "Correct Words", value: stats.correctWords, className: "text-green-600" },
                  { label: "Wrong Words", value: stats.wrongWords, className: "text-red-600" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-muted/40 border border-border/60 px-3 py-3 space-y-1"
                  >
                    <p className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    <p className={cn("text-2xl md:text-3xl font-black tabular-nums", item.className)}>
                      {item.value}
                    </p>
                  </div>
                ))}
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

        </CardContent>
      </Card>
    </div>
  );
}
