import DEFAULT_CONFIG from './default_config';
const defaultImageUrl = `${DEFAULT_CONFIG.baseUrl}${DEFAULT_CONFIG.siteImageUrl}`;

export const projectsList = [
  {
    id: 'scientific-calculator',
    date: '2025-08-24',
    title: 'Scientific Calculator',
    description: 'A powerful calculator with scientific functions, keyboard support, and DEG/RAD toggle.',
    author: 'Sony Mathew',
    tags: ['calculator', 'math', 'scientific'],
    readingTime: 2,
    imageUrl: defaultImageUrl
  },
  {
    id: 'typing-speed-test',
    date: '2025-08-23',
    title: 'Typing Speed Test',
    description: 'Typing Speed Test is a tool to help you test your typing speed.',
    author: 'Sony Mathew',
    tags: ['typing', 'speed', 'test'],
    readingTime: 3,
    imageUrl: defaultImageUrl
  },
  {
    id: 'simple-pomodoro-timer',
    date: '2025-08-22',
    title: 'Pomodoro Timer',
    description: 'Pomodoro Timer is a tool to help you focus on your work and improve your productivity.',
    author: 'Sony Mathew',
    tags: ['pomodoro', 'timer', 'productivity'],
    readingTime: 1,
    imageUrl: defaultImageUrl
  },
  {
    id: 'sip-calculator',
    date: '2021-03-13',
    title: 'SIP Calculator - Systematic Investment Plan Calculator',
    description: 'SIP Calculator - Systematic Investment Plan calculator is a tool to calculate your returns over a period of time when you invest in instruments like mutual funds, equity, commodities or any financial instrument for that matter.',
    author: 'Sony Mathew',
    tags: ['sip', 'calculator', 'mutual-funds', 'personal-finance'],
    readingTime: 2,
    imageUrl: defaultImageUrl
  },
];
