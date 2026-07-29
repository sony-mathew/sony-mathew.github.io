export const TOOL_PRESENTATIONS = {
  "simple-replace": {
    accent: "coral",
    category: "Text utility",
    title: "Simple Replace",
    description: "Find and replace text with plain-text or regex controls."
  },
  "password-generator": {
    accent: "green",
    category: "Security",
    title: "Password Generator",
    description: "Create strong passwords with custom length and character controls."
  },
  "base64-encoder-decoder": {
    accent: "blue",
    category: "Developer utility",
    title: "Base64 Encoder Decoder",
    description: "Encode or decode UTF-8 text directly in your browser."
  },
  "scientific-calculator": {
    accent: "purple",
    category: "Mathematics",
    title: "Scientific Calculator",
    description: "Calculate with scientific functions, keyboard input, and DEG/RAD modes."
  },
  "typing-speed-test": {
    accent: "gold",
    category: "Practice",
    title: "Typing Speed Test",
    description: "Measure your typing speed and accuracy with timed exercises."
  },
  "simple-pomodoro-timer": {
    accent: "teal",
    category: "Productivity",
    title: "Pomodoro Timer",
    description: "Stay focused with a simple timer for structured work sessions."
  },
  "sip-calculator": {
    accent: "indigo",
    category: "Finance",
    title: "SIP Calculator",
    description: "Estimate systematic investment growth over time."
  }
};

export function getToolPresentation(id, fallback = {}) {
  return {
    accent: "coral",
    category: "Utility",
    ...fallback,
    ...TOOL_PRESENTATIONS[id]
  };
}

export function ToolIcon({ id }) {
  const commonProps = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24"
  };

  switch (id) {
    case "simple-replace":
      return (
        <svg {...commonProps}>
          <path d="M4 7h14" />
          <path d="m15 4 3 3-3 3" />
          <path d="M20 17H6" />
          <path d="m9 14-3 3 3 3" />
        </svg>
      );
    case "password-generator":
      return (
        <svg {...commonProps}>
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <path d="M12 14v3" />
        </svg>
      );
    case "base64-encoder-decoder":
      return (
        <svg {...commonProps}>
          <path d="m8 8-4 4 4 4" />
          <path d="m16 8 4 4-4 4" />
          <path d="m14 5-4 14" />
        </svg>
      );
    case "scientific-calculator":
      return (
        <svg {...commonProps}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 7h8" />
          <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h4" />
        </svg>
      );
    case "typing-speed-test":
      return (
        <svg {...commonProps}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 13h.01M10 13h.01M13 13h.01M16 13h.01M8 16h8" />
        </svg>
      );
    case "simple-pomodoro-timer":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 1.5M9 2h6M12 2v3M18.5 6.5l1-1" />
        </svg>
      );
    case "sip-calculator":
      return (
        <svg {...commonProps}>
          <path d="M4 20V10M10 20V6M16 20v-4M3 20h18" />
          <path d="m14 11 3-3 3 3M17 8v7" />
        </svg>
      );
    default:
      return null;
  }
}
