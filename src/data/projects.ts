export type Project = {
  id: string;
  name: string;
  tech_stack: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  founder: {
    tagline: string;
    description: string[];
  };
  stalker: {
    tagline: string;
    description: string[];
  };
};

export const projectsData: Project[] = [
  {
    id: "ai-scraper",
    name: "AI-powered Web Scraping Automation Tool",
    tech_stack: ["Next.js", "Puppeteer", "ReactFlow", "Gemini", "Cron"],
    links: {
      demo: "https://www.linkedin.com/posts/rishab2211_excited-to-unveil-my-latest-project-activity-7313520047497363457-DfRW",
      github: "https://github.com/rishab2211/AI-WebScraping-Automator",
    },
    founder: {
      tagline: "Intelligent, node-based custom scraping workflow builder",
      description: [
        "Architected an intelligent web scraping platform featuring a drag-and-drop UI for custom workflows and an AI-powered data extraction module delivering 85% accuracy on unstructured data.",
        "Implemented a robust, automated backend system using a cron-based scheduler and a comprehensive logging module for performance optimization and error tracking.",
      ],
    },
    stalker: {
      tagline: "Because writing RegEx makes me cry.",
      description: [
        "A drag-and-drop canvas where you just point at things and tell the AI to figure out the HTML mess.",
        "Puppeteer does the heavy lifting, Gemini does the reading. I just sit back and watch the database fill up.",
      ],
    },
  },
  {
    id: "chatx",
    name: "ChatX",
    tech_stack: ["React.js", "Node.js", "Express.js", "MongoDB", "TailwindCSS", "Zustand"],
    links: {
      live: "https://chat-x-three-gamma.vercel.app",
      github: "https://github.com/rishab2211/ChatX",
    },
    founder: {
      tagline: "High-availability (99.9% uptime) real-time communication platform",
      description: [
        "Engineered a high-availability (99.9% uptime) real-time chat application, implementing a WebSocket architecture for instantaneous messaging and securing all endpoints with JWT authentication.",
        "Made a comprehensive, multi-format file-sharing system (10MB upload capacity) and optimized UI performance by 40% through efficient state management with Zustand.",
      ],
    },
    stalker: {
      tagline: "WebSockets go brrr. 🚀",
      description: [
        "Built this because I was tired of standard chat apps compressing my files into oblivion.",
        "State management was a nightmare until I found Zustand. Uptime is 99.9% (as long as I don't trip over the server cable).",
      ],
    },
  },
  {
    id: "web-server",
    name: "Multithreaded TCP Server",
    tech_stack: ["Java", "Socket Programming", "Multi-threading"],
    links: {
      demo: "https://www.linkedin.com/posts/rishab2211_webservers-under-the-hood-from-50k-to-1-activity-7318576772684357632-iDon",
      github: "https://github.com/rishab2211/Webserver-JAVA",
    },
    founder: {
      tagline: "High-performance bare-metal network server implementation",
      description: [
        "Built a high-performance, multi-threaded web server and benchmarked it at 1M+ RPS.",
        "Created efficient thread pooling system that reduced memory usage by 35% compared to the naive implementation.",
      ],
    },
    stalker: {
      tagline: "Bare metal, zero frameworks, maximum throughput.",
      description: [
        "Decided to reinvent the wheel and build a web server in raw Java just to see how it works under the hood.",
        "Handled 1 Million RPS and turned my laptop into a space heater in the process. Worth it.",
      ],
    },
  },
  {
    id: "social-backend",
    name: "Social - A Social Media App (Backend)",
    tech_stack: ["Java", "Spring Boot", "PostgreSQL", "Spring Security", "JWT"],
    links: {
      github: "https://github.com/rishab2211/Social",
    },
    founder: {
      tagline: "Enterprise-grade relational social graph engine",
      description: [
        "Engineered robust user authentication leveraging Spring Security and JWT, successfully securing 15+ RESTful API endpoints and managing secure user sessions.",
        "Designed and developed a scalable, RESTful backend using Spring Boot and PostgreSQL, architecting the database schema and complex business logic for all core social features (posts, follows, likes & user profile).",
      ],
    },
    stalker: {
      tagline: "Who needs a frontend anyway?",
      description: [
        "Built a massive relational graph engine to handle all the messy logic of a social network.",
        "Just pure backend architecture, complex SQL queries, and JWTs. Handled the chaos of followers and likes without writing a single line of CSS.",
      ],
    },
  },
  {
    id: "edge-blog",
    name: "Serverless Blog on Edge",
    tech_stack: ["React", "HonoJS", "Cloudflare Workers", "Prisma"],
    links: {
      github: "https://github.com/rishab2211/Blogging-web-app",
      demo: "https://rishab2211.hashnode.dev",
    },
    founder: {
      tagline: "Type-safe dynamic publishing deployed on global edge runtimes",
      description: [
        "Developed a production-grade full-stack platform optimized for global edge compute networks.",
        "Utilized HonoJS and Prisma to build ultra-responsive API routes with near-zero cold-start latency.",
      ],
    },
    stalker: {
      tagline: "Traditional servers are too mainstream.",
      description: [
        "Deployed entirely on Cloudflare edge nodes because waiting 3 seconds for a server to wake up is unacceptable.",
        "Type-safe all the way down. If it compiles, it ships.",
      ],
    },
  },
];