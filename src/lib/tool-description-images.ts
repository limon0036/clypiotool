export type ToolDescriptionImage = {
  src: string;
  alt: string;
  caption: string;
};

export const toolDescriptionImages: Record<string, ToolDescriptionImage[]> = {
  'password-generator': [
    {
      src: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=360&fit=crop',
      alt: 'Cyber security lock on digital screen',
      caption: 'Strong passwords are your first line of defense online.',
    },
    {
      src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=360&fit=crop',
      alt: 'Developer working on secure code',
      caption: 'Use unique passwords for every account you create.',
    },
    {
      src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=360&fit=crop',
      alt: 'Person using smartphone authentication',
      caption: 'Enable two-factor authentication whenever possible.',
    },
    {
      src: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=600&h=360&fit=crop',
      alt: 'Password field on laptop login screen',
      caption: 'Avoid predictable words like birthdays or pet names.',
    },
    {
      src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=360&fit=crop',
      alt: 'Abstract digital encryption visualization',
      caption: 'Random mixed characters make brute-force attacks impractical.',
    },
  ],
  'typing-speed-test': [
    {
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=360&fit=crop',
      alt: 'Laptop with code on screen for typing practice',
      caption: 'Touch typing keeps your eyes on the screen, not the keys.',
    },
    {
      src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=360&fit=crop',
      alt: 'Mechanical keyboard close-up',
      caption: 'Proper finger placement on the home row builds speed over time.',
    },
    {
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=360&fit=crop',
      alt: 'Workspace with laptop for focused typing',
      caption: 'Programmers and writers benefit from higher WPM and accuracy.',
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=360&fit=crop',
      alt: 'Team collaborating at computers',
      caption: 'Data entry roles require both speed and near-perfect accuracy.',
    },
    {
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=360&fit=crop',
      alt: 'Office desk with keyboard and monitor',
      caption: 'Regular short tests help you track improvement week by week.',
    },
  ],
  'qr-generator': [
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=360&fit=crop',
      alt: 'Person scanning QR code with smartphone',
      caption: 'Scanning a QR code opens links instantly without typing URLs.',
    },
    {
      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=360&fit=crop',
      alt: 'Contactless payment with phone at store',
      caption: 'Restaurants and shops use QR codes for menus and payments.',
    },
    {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=360&fit=crop',
      alt: 'Business analytics on laptop screen',
      caption: 'Marketing teams link offline posters to online landing pages.',
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=360&fit=crop',
      alt: 'Team meeting with presentation screen',
      caption: 'Event tickets and check-in often rely on QR verification.',
    },
    {
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=360&fit=crop',
      alt: 'Developers planning project at desk',
      caption: 'Print high-contrast codes so older phones scan them easily.',
    },
  ],
  'short-url-generator': [
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=360&fit=crop',
      alt: 'Social media apps on smartphone screen',
      caption: 'Short links look cleaner in bios, posts, and SMS messages.',
    },
    {
      src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=360&fit=crop',
      alt: 'Person typing on laptop for sharing links',
      caption: 'Long tracking URLs are hard to read and easy to mistype.',
    },
    {
      src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=360&fit=crop',
      alt: 'Business handshake in office meeting',
      caption: 'Campaign teams use short URLs to compare channel performance.',
    },
    {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=360&fit=crop',
      alt: 'Newspaper and media concept',
      caption: 'Print ads work better when the URL fits on one line.',
    },
    {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=360&fit=crop',
      alt: 'Laptop showing messaging and email apps',
      caption: 'Paste a long link once, then copy the compact version to share.',
    },
  ],
  'markdown-formatter': [
    {
      src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=360&fit=crop',
      alt: 'Programming code on computer monitor',
      caption: 'Markdown is widely used in README files and developer docs.',
    },
    {
      src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=360&fit=crop',
      alt: 'Person writing notes on laptop',
      caption: 'Headings and lists structure long notes without heavy HTML.',
    },
    {
      src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=360&fit=crop',
      alt: 'Split screen code editor view',
      caption: 'Live preview shows how formatted text will look when published.',
    },
    {
      src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=360&fit=crop',
      alt: 'Developer at desk with multiple monitors',
      caption: 'Technical writers draft API docs faster with Markdown syntax.',
    },
    {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop',
      alt: 'Collaborative team working on laptops',
      caption: 'Copy formatted output to GitHub, Notion, or your blog in seconds.',
    },
  ],
  'stopwatch': [
    {
      src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=360&fit=crop',
      alt: 'Athlete training in gym with timer focus',
      caption: 'Athletes use lap times to analyze each interval of a workout.',
    },
    {
      src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=360&fit=crop',
      alt: 'Fitness training with stopwatch concept',
      caption: 'Rest periods between sets are easier to manage with a timer.',
    },
    {
      src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=360&fit=crop',
      alt: 'Kitchen cooking preparation',
      caption: 'Cooking steps often need precise timing for best results.',
    },
    {
      src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=360&fit=crop',
      alt: 'Student studying with books and laptop',
      caption: 'Mock exams train you to finish each section within time limits.',
    },
    {
      src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=360&fit=crop',
      alt: 'Desk planner and productivity tools',
      caption: 'Time-blocking work sessions improves focus and realistic planning.',
    },
  ],
  'unit-converter': [
    {
      src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=360&fit=crop',
      alt: 'Laboratory measurement equipment',
      caption: 'Science and engineering depend on accurate unit conversions.',
    },
    {
      src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=360&fit=crop',
      alt: 'Food ingredients for recipe measurements',
      caption: 'Recipes from other countries may use cups, grams, or ounces.',
    },
    {
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=360&fit=crop',
      alt: 'Traveler with map planning a trip',
      caption: 'Travelers convert miles to kilometers and Fahrenheit to Celsius.',
    },
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=360&fit=crop',
      alt: 'Engineer reviewing technical drawings',
      caption: 'Blueprint dimensions may mix metric and imperial measurements.',
    },
    {
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=360&fit=crop',
      alt: 'Medical health measurement concept',
      caption: 'Health and fitness apps often show weight in different units.',
    },
  ],
  'todo-list': [
    {
      src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=360&fit=crop',
      alt: 'Planner with checklist on desk',
      caption: 'Writing tasks down frees mental space and reduces forgetfulness.',
    },
    {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=360&fit=crop',
      alt: 'Business planning with notebook and laptop',
      caption: 'Break big projects into small, actionable steps.',
    },
    {
      src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=360&fit=crop',
      alt: 'Team coordinating tasks in office',
      caption: 'Shared task lists help teams divide work clearly.',
    },
    {
      src: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=360&fit=crop',
      alt: 'Organized home kitchen workspace',
      caption: 'Shopping and household chores fit perfectly on a simple to-do list.',
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=360&fit=crop',
      alt: 'Students studying together with laptops',
      caption: 'Students track assignments and exam prep with daily task lists.',
    },
  ],
  'bmi-calculator': [
    {
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=360&fit=crop',
      alt: 'Person exercising in gym for healthy weight',
      caption: 'BMI is a quick screening tool based on height and weight.',
    },
    {
      src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=360&fit=crop',
      alt: 'Healthy balanced meal on table',
      caption: 'Nutrition and exercise matter as much as the number on the scale.',
    },
    {
      src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=360&fit=crop',
      alt: 'Fresh vegetables for healthy diet',
      caption: 'A balanced diet supports long-term health beyond BMI alone.',
    },
    {
      src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=360&fit=crop',
      alt: 'Yoga and wellness practice',
      caption: 'Athletes may have higher BMI due to muscle, not excess fat.',
    },
    {
      src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=360&fit=crop',
      alt: 'Doctor consultation about health metrics',
      caption: 'Always discuss health goals with a qualified medical professional.',
    },
  ],
};
