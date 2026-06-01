export type ToolDescription = {
  heading: string;
  paragraphs: string[];
};

export const toolDescriptions: Record<string, ToolDescription> = {
  'password-generator': {
    heading: 'Why strong passwords matter and how this tool helps',
    paragraphs: [
      'In today’s digital world, your password is the key to your online accounts. Weak or reused passwords are one of the easiest ways for attackers to break in. Data breaches, phishing, and brute-force attacks are more common than ever—so using a strong, unique password for every site is essential, not optional. If you use the same password for email, social media, and banking, one leak can put your entire digital life at risk.',
      'A secure password typically has at least twelve to sixteen characters and mixes uppercase letters, lowercase letters, numbers, and symbols. Common choices like "123456", "password", or your birthday can be cracked in seconds. Hackers start with leaked password lists and dictionary attacks. The best habit is a different long, random password for each account.',
      'To stay safe, passwords should be hard for humans to guess but nearly impossible for computers to crack. Longer passwords dramatically increase possible combinations—a random twenty-character password can take years to break. Never use personal details like names or phone numbers. Turn on two-factor authentication (2FA) and use a password manager so you only remember one master password while storing hundreds of strong ones securely.',
      'Our password generator runs entirely in your browser—passwords are not sent to our servers. It uses a cryptographically secure random source to create unpredictable strings. You can adjust length and toggle uppercase, lowercase, numbers, and symbols to match site requirements. Copy with one click, then save the password in your manager before closing the tab.',
      'Change passwords when you see suspicious login alerts, never share them over chat or email, and be extra careful on public Wi‑Fi. Each time you generate a new strong password here, you strengthen your first line of defense—free, fast, and easy to use.',
    ],
  },
  'typing-speed-test': {
    heading: 'Typing speed techniques and why WPM matters',
    paragraphs: [
      'When you work on a computer, your fingers often lag behind your thoughts. A typing speed test measures how many words per minute (WPM) you type and how accurate you are. Office workers often average forty to fifty WPM; skilled typists reach seventy or more. Regular practice increases speed, reduces errors, and makes long writing sessions less tiring.',
      'Learning proper finger placement—the home row—is the first step to faster typing. Keep your eyes on the screen, start slowly, and build speed over time. Touch typing saves the effort of hunting for keys. Typing with only one or two fingers limits speed and can strain your wrists. A comfortable chair and correct monitor height help for long sessions.',
      'Programmers, data entry staff, writers, support agents, and students all benefit from higher WPM. Finishing more work in the same time reduces stress and missed deadlines. Fast typing does not replace coding skill, but it speeds up documentation, comments, tickets, and chat. Data entry demands both speed and accuracy—one mistake can mean hours of fixes.',
      'Use our typing test to practice with real passages and see live WPM, accuracy, and error counts. Repeat tests weekly to track progress. Focus on weak keys or words after each run. A calm environment lets you measure your true speed without pressure.',
      'Remember that accuracy matters as much as speed. Slightly slower, correct typing beats fast typing full of errors over the long run. Take breaks, maintain good posture, and practice consistently—you can become a faster, more confident typist with patience and routine.',
    ],
  },
  'qr-generator': {
    heading: 'What QR codes are, where they are used, and how this tool helps',
    paragraphs: [
      'A QR (Quick Response) code is a two-dimensional barcode that phones scan instantly to open websites, text, contact details, event info, or Wi‑Fi credentials. It is one of the easiest ways to share long URLs or complex data on posters, packaging, and screens.',
      'Businesses put QR codes on menus, payment pages, product details, and promotions. Events use them for tickets and check-in. Stores display codes in windows for their websites. Personally, you can share Wi‑Fi, social profiles, forms, or group links without typing long addresses.',
      'Quality codes need strong contrast, adequate size, and error correction so damaged prints still scan. Very small or blurry codes fail on older cameras. Export a high-resolution PNG for print and digital use. Test by scanning before you print hundreds of copies.',
      'Our QR creator builds an image from any text, URL, email, or phone number in your browser—your data stays on your device. Download the image for posters, stickers, business cards, slides, or social posts. Offline ads can drive online traffic with a single scan.',
      'Be cautious with unknown codes—they may lead to phishing sites. Always use correct HTTPS links in codes you create. Schools, charities, and campaigns use QR codes to connect people quickly. This tool helps you create reliable codes for modern marketing and communication—free and instant.',
    ],
  },
  'short-url-generator': {
    heading: 'Why short URLs help and how to use them safely',
    paragraphs: [
      'Shared links are often long and messy—especially with tracking tags, affiliate codes, or deep page paths. A short URL generator turns a long address into a compact link that is easier to read in SMS, chat, social bios, print ads, and spoken conversation.',
      'Marketers use short links in email campaigns, QR codes, Instagram bios, and video descriptions. Some services show click counts or device stats to measure performance. Because the destination is hidden, use trusted tools and avoid clicking random short links from strangers.',
      'Short links reduce typos when people type URLs manually. Platforms with character limits leave more room for your message. On flyers and cards, a short URL fits on one line. Different short variants of the same link can track Facebook, email, and Instagram separately.',
      'Paste a long link into our generator and copy the shortened version in one step. Use it for portfolios, blog posts, affiliate links, Drive shares, or event sign-ups. Clean links look more professional and are easier to share.',
      'Verify that destination sites use HTTPS before you share. Only shorten links you trust, and warn others about phishing. Students, freelancers, and small businesses all benefit from tidy links—this tool helps you organize your online presence quickly.',
    ],
  },
  'markdown-formatter': {
    heading: 'What Markdown is and why a formatter helps',
    paragraphs: [
      'Markdown is a lightweight markup language for turning plain text into headings, lists, links, code blocks, tables, and images. It is supported on GitHub, Notion, Reddit, Stack Overflow, and many blogs—faster to write than full HTML and easy to read in source form.',
      'Use `#` for headings, `*` or `-` for lists, `**` for bold, backticks for inline code, and fenced blocks for multi-line code. Link and image syntax let you build notes, README files, and technical documents quickly. Broken syntax shows up immediately in preview—so a live formatter is invaluable.',
      'Developers write README files, issue templates, and wiki pages in Markdown. Students take structured notes; writers draft articles; technical authors build API docs and static sites with tools like Jekyll or MkDocs. Offices use it for checklists and meeting notes too.',
      'Type on the left and see instant preview on the right in our formatter. Confirm headings, bold, tables, and links render correctly, then paste into GitHub, Notion, or your blog. Comparing source and preview is the fastest way to learn syntax.',
      'Markdown takes little time to learn and pays off for years. Quotes, horizontal rules, and task lists help reports and project plans. No install required—format and preview in the browser whenever you need clear, professional documents.',
    ],
  },
  'stopwatch': {
    heading: 'Why measuring time matters and how to use a stopwatch',
    paragraphs: [
      'Accurate timing is the foundation of practice, work, sports, and exams. A stopwatch records elapsed time down to fractions of a second—for runs, swims, cooking steps, presentations, timed tests, or children’s practice sessions.',
      'Lap mode records each segment separately: every lap of a run, every workout set, every recipe step, or every project phase. Comparing laps shows where you slow down and where to improve.',
      'An online stopwatch needs no app install—open it in any browser. Use it for Pomodoro work blocks, meeting limits, mock exams, boiling eggs, or study timers. Start, stop, reset, and lap work just like a phone stopwatch.',
      'Our precision stopwatch shows milliseconds. Each lap appears in a list so you can spot your fastest and slowest intervals. Keep the tab open during a session; screenshot important results if needed. Coaches and parents can time practice reps easily.',
      'Respecting time improves productivity. Knowing how long email, reports, or chores take leads to realistic plans. Time-blocking with a stopwatch builds focus. Athletes, students, and cooks all benefit from this simple free tool.',
    ],
  },
  'unit-converter': {
    heading: 'Why unit conversion matters and how this tool helps',
    paragraphs: [
      'The world uses many units for length, weight, temperature, volume, and area—meters versus feet, kilograms versus pounds, Celsius versus Fahrenheit. International business, travel, online shopping, cooking, homework, and engineering drawings often need quick conversion between systems.',
      'Wrong conversions ruin recipes, cause engineering mistakes, or lead to medication errors. Historic failures like NASA’s Mars orbiter show how mixing metric and imperial units can be catastrophic. A reliable converter saves time and reduces risk.',
      'Manual multiplication invites mistakes, especially with decimals and multi-step formulas. An online converter gives instant results without memorizing every rate. Students see patterns; professionals decide faster on site or in meetings.',
      'Switch categories and enter a value to see the equivalent instantly—miles to kilometers, cups to milliliters, Fahrenheit to Celsius, pounds to kilograms, and more. Imported products and foreign recipes become easier to understand.',
      'Double-check critical values against official sources in medicine or engineering. This tool helps with daily life, school problems, fitness tracking, and travel—free in the browser with no tables to download.',
    ],
  },
  'todo-list': {
    heading: 'Why to-do lists work and how online task tracking helps',
    paragraphs: [
      'Keeping many tasks in your head leads to forgotten work, poor priorities, and unfinished projects. A to-do list stores tasks outside your brain, lowers mental load, and makes completion more likely. Research shows written lists improve focus and productivity.',
      'Effective lists use small, clear steps. Prefer "Draft email outline" or "Update slides 1–5" over vague goals like "Finish project." Prioritize urgent and important items so limited time goes to the right work. Checking items off shows progress and motivates you.',
      'An online list opens in any browser without signup. Build a quick list for shopping, office work, exam prep, chores, or travel packing. Session storage keeps your list when you return on the same browser.',
      'Add tasks, mark them done, and delete what you no longer need—no complex setup. It is enough for daily planning without heavy project software.',
      'Each morning or night, pick three main tasks for the next day. Split large projects into smaller steps. Simple lists often beat complicated tools because they are easy to start. Freelancers, students, and families can plan clearly with this lightweight companion.',
    ],
  },
  'bmi-calculator': {
    heading: 'What BMI is, how it is calculated, and its role in health',
    paragraphs: [
      'Body Mass Index (BMI) classifies weight relative to height: weight in kilograms divided by height in meters squared. For example, 70 kg at 1.70 m gives BMI ≈ 24.2. Categories include underweight, normal, overweight, and obesity. Doctors often use BMI as a quick screening tool.',
      'BMI is fast and widely used for adults, but it does not separate muscle from fat—athletes may score high with low body fat. Age, sex, and pregnancy can affect interpretation. Treat BMI as a starting point for awareness, not the only health measure.',
      'A healthy adult BMI is usually 18.5 to 24.9. Below that may signal underweight risk; above it may raise risks for heart disease, diabetes, and joint strain. Tracking BMI over months shows trends toward or away from your goals.',
      'Enter height and weight in metric or imperial units to see BMI and category instantly. Results are informational only—consult a doctor for medical decisions, diet plans, or treatment.',
      'Balanced nutrition, regular activity, sleep, hydration, and stress management support long-term health. BMI helps set goals, but muscle mass, waist size, and fitness matter too. Use this calculator to understand your current status and discuss next steps with a professional.',
    ],
  },
};
