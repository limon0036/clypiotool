export type GuideStep = {
  title: string;
  description: string;
};

export type ToolGuide = {
  slug: string;
  title: string;
  summary: string;
  steps: GuideStep[];
  tips: string[];
};

export const whyChooseBenefits = [
  {
    title: "Secure & Reliable",
    description: "Modern stack with browser-first processing where possible.",
    accent: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    title: "Fast Performance",
    description: "Lightweight pages so tools open quickly on any device.",
    accent: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "All-in-One Platform",
    description: "Multiple utilities in one place—no extra installs.",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Easy for Everyone",
    description: "Clear labels, simple flows, and mobile-friendly layouts.",
    accent: "text-amber-600",
    bg: "bg-amber-50",
  },
] as const;

export const quickStartSteps: GuideStep[] = [
  {
    title: "Open a tool",
    description:
      "From the home page, pick a tool card—or use the Service menu in the header to jump to any utility.",
  },
  {
    title: "Enter your data",
    description:
      "Fill in the form (text, numbers, URL, etc.). Most tools work instantly in your browser without sign-up.",
  },
  {
    title: "Run & copy results",
    description:
      "Click Generate, Convert, Start, or similar. Copy, download, or save the output for your task.",
  },
  {
    title: "Try another tool",
    description:
      "Use the tool navigation on each page to switch utilities, or return home to explore more.",
  },
];

export const generalUsageNotes = [
  "No account is required for standard tools—open a page and start immediately.",
  "Use a modern browser (Chrome, Firefox, Safari, or Edge) for the best experience.",
  "On mobile, rotate to landscape for wider tools such as Markdown preview or typing test.",
  "Sensitive data (passwords, personal URLs) should be handled on trusted devices and networks.",
  "Scroll below each tool for in-depth articles explaining features and best practices.",
];

export const toolGuides: ToolGuide[] = [
  {
    slug: "typing-speed-test",
    title: "Typing Speed Test",
    summary: "Measure words per minute (WPM) and accuracy while typing a sample passage.",
    steps: [
      {
        title: "Start the test",
        description:
          "Open the tool and click Start (or begin typing when prompted). A random passage appears in the preview area.",
      },
      {
        title: "Type the passage",
        description:
          "Type in the input box. Correct characters are highlighted; mistakes are marked so you can correct them.",
      },
      {
        title: "View live stats",
        description:
          "Watch WPM, accuracy, and error counts update as you type. Focus on accuracy first, then speed.",
      },
      {
        title: "Finish and review",
        description:
          "Complete the passage or stop the timer. Review your final WPM and accuracy, then retry or load a new text.",
      },
    ],
    tips: [
      "Practice daily with the same posture and keyboard for consistent results.",
      "Use the refresh option for a new random passage.",
    ],
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    summary: "Create strong random passwords with custom length and character types.",
    steps: [
      {
        title: "Set length",
        description: "Drag the slider to choose password length (4–64 characters). 16+ is recommended for accounts.",
      },
      {
        title: "Choose character types",
        description:
          "Enable uppercase, lowercase, numbers, and symbols. At least one type must be selected.",
      },
      {
        title: "Generate",
        description: "Click Generate to create a new password in the result field.",
      },
      {
        title: "Copy securely",
        description:
          "Use Copy, then paste into your password manager or app. Do not share passwords over chat or email.",
      },
    ],
    tips: [
      "Use a unique password for every website or service.",
      "Regenerate if the password is shown on a shared screen.",
    ],
  },
  {
    slug: "qr-generator",
    title: "QR Code Creator",
    summary: "Turn any text or URL into a scannable QR code image.",
    steps: [
      {
        title: "Enter content",
        description: "Paste a URL, phone number, Wi‑Fi string, or any text into the content field.",
      },
      {
        title: "Generate QR",
        description: "Click Generate. The QR image appears when the content is valid.",
      },
      {
        title: "Download or share",
        description: "Download the PNG for print or digital use. Test by scanning with your phone camera.",
      },
    ],
    tips: [
      "Use HTTPS links for public marketing materials.",
      "Print at sufficient size so cameras can read the code easily.",
    ],
  },
  {
    slug: "short-url-generator",
    title: "Short URL Generator",
    summary: "Shorten long links into a compact URL you can share.",
    steps: [
      {
        title: "Paste the long URL",
        description: "Enter the full link including https:// in the input field.",
      },
      {
        title: "Create short link",
        description: "Click Generate. A short URL based on this site is created and stored for redirects.",
      },
      {
        title: "Copy and share",
        description: "Copy the short link and use it in messages, bios, or QR codes. Open it to verify the destination.",
      },
    ],
    tips: [
      "Only shorten links you trust and own.",
      "Confirm the destination before sharing widely.",
    ],
  },
  {
    slug: "markdown-formatter",
    title: "Markdown Formatter",
    summary: "Write Markdown on the left and see a live HTML preview on the right.",
    steps: [
      {
        title: "Write Markdown",
        description:
          "Type in the editor using # headings, **bold**, lists, links, and code fences.",
      },
      {
        title: "Preview instantly",
        description: "The preview panel updates as you type so you can catch formatting errors early.",
      },
      {
        title: "Copy output",
        description:
          "Copy the rendered content or source Markdown for GitHub, Notion, blogs, or documentation.",
      },
    ],
    tips: [
      "Keep a blank line between paragraphs for correct preview spacing.",
      "Use backticks for inline code and triple backticks for code blocks.",
    ],
  },
  {
    slug: "stopwatch",
    title: "Precision Stopwatch",
    summary: "Track elapsed time with start, stop, reset, and lap recording.",
    steps: [
      {
        title: "Start timing",
        description: "Click Start to begin counting. The display shows minutes, seconds, and milliseconds.",
      },
      {
        title: "Record laps",
        description: "Press Lap while running to save split times—for workouts, races, or timed tasks.",
      },
      {
        title: "Stop or reset",
        description: "Stop to pause the session. Reset clears the timer and lap list for a new run.",
      },
    ],
    tips: [
      "Keep the browser tab active for the most accurate timing.",
      "Screenshot lap lists if you need a record after closing the tab.",
    ],
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    summary: "Convert length and weight values between common units.",
    steps: [
      {
        title: "Pick a category",
        description: "Select Length or Weight from the category control.",
      },
      {
        title: "Choose units",
        description: "Set “from” and “to” units (e.g. Meters → Feet or Kilograms → Pounds).",
      },
      {
        title: "Enter value & convert",
        description: "Type the amount and click Convert. The result appears immediately.",
      },
      {
        title: "Swap units",
        description: "Use the swap control to reverse direction and convert the other way.",
      },
    ],
    tips: [
      "Double-check critical measurements against official references.",
      "Use a dot or standard decimal format for fractional values.",
    ],
  },
  {
    slug: "todo-list",
    title: "Online To-Do List",
    summary: "Add, complete, and remove tasks in a simple session-based list.",
    steps: [
      {
        title: "Add a task",
        description: "Type in the input and press Add (or Enter). The task appears in your list.",
      },
      {
        title: "Mark complete",
        description: "Click the checkbox next to a task when finished. Progress shows at the top.",
      },
      {
        title: "Remove tasks",
        description: "Use delete on individual items to clear completed or unwanted entries.",
      },
    ],
    tips: [
      "Tasks are stored for your current session—note important items elsewhere if you close the tab.",
      "Break large projects into small, actionable task names.",
    ],
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    summary: "Calculate Body Mass Index from height and weight with a category label.",
    steps: [
      {
        title: "Enter measurements",
        description: "Select metric or imperial units, then enter your height and weight.",
      },
      {
        title: "Calculate BMI",
        description: "Click Calculate. Your BMI value and category (e.g. normal, overweight) are shown.",
      },
      {
        title: "Interpret responsibly",
        description:
          "Use results as a general screening guide—not a medical diagnosis. Consult a professional for health advice.",
      },
    ],
    tips: [
      "Measure height and weight at the same time of day for consistency.",
      "BMI does not account for muscle mass or age in all cases.",
    ],
  },
];
