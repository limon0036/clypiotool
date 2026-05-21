
import React from 'react';
import { 
  Key, 
  QrCode, 
  Scale, 
  Link2, 
  Keyboard, 
  Timer, 
  ListTodo, 
  Activity,
  FileText
} from "lucide-react";

export const tools = [
  {
    id: 'typing-speed-test',
    title: 'Typing Speed Test',
    description: 'Test your WPM and accuracy instantly.',
    icon: React.createElement(Keyboard, { className: "w-4 h-4" }),
    color: 'bg-amber-50 text-amber-600',
    slug: 'typing-speed-test'
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Create ultra-secure, customizable passwords.',
    icon: React.createElement(Key, { className: "w-4 h-4" }),
    color: 'bg-blue-50 text-blue-600',
    slug: 'password-generator'
  },
  {
    id: 'qr-generator',
    title: 'QR Code Creator',
    description: 'Instantly generate QR codes for any content.',
    icon: React.createElement(QrCode, { className: "w-4 h-4" }),
    color: 'bg-purple-50 text-purple-600',
    slug: 'qr-generator'
  },
  {
    id: 'short-url-generator',
    title: 'Short URL Generator',
    description: 'Turn long links into clean, shareable URLs.',
    icon: React.createElement(Link2, { className: "w-4 h-4" }),
    color: 'bg-emerald-50 text-emerald-600',
    slug: 'short-url-generator'
  },
  {
    id: 'markdown-formatter',
    title: 'Markdown Formatter',
    description: 'Write and preview Markdown in real-time.',
    icon: React.createElement(FileText, { className: "w-4 h-4" }),
    color: 'bg-indigo-50 text-indigo-600',
    slug: 'markdown-formatter'
  },
  {
    id: 'stopwatch',
    title: 'Precision Stopwatch',
    description: 'Measure time with lap tracking.',
    icon: React.createElement(Timer, { className: "w-4 h-4" }),
    color: 'bg-slate-50 text-slate-600',
    slug: 'stopwatch'
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert length, weight, and more with ease.',
    icon: React.createElement(Scale, { className: "w-4 h-4" }),
    color: 'bg-orange-50 text-orange-600',
    slug: 'unit-converter'
  },
  {
    id: 'todo-list',
    title: 'Online To-Do List',
    description: 'Track your daily tasks and stay organized.',
    icon: React.createElement(ListTodo, { className: "w-4 h-4" }),
    color: 'bg-secondary/10 text-secondary',
    slug: 'todo-list'
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Check your BMI and health status.',
    icon: React.createElement(Activity, { className: "w-4 h-4" }),
    color: 'bg-green-50 text-green-600',
    slug: 'bmi-calculator'
  }
];
