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
    id: "chatx",
    name: "ChatX",
    tech_stack: ["React", "Node.js", "WebSockets", "MongoDB", "Zustand"],
    links: {
      live: "https://chat-x-three-gamma.vercel.app",
      github: "https://github.com/rishab2211/ChatX"
    },
    founder: {
      tagline: "High-availability real-time communication platform",
      description: [
        "Engineered a highly scalable WebSocket architecture for instantaneous, zero-latency messaging.",
        "Implemented secure JWT authentication and a robust multi-format file-sharing system supporting up to 10MB payloads."
      ]
    },
    stalker: {
      tagline: "WebSockets go brrr. 🚀",
      description: [
        "Built this because I was tired of standard chat apps compressing my files into oblivion.",
        "State management was a nightmare until I found Zustand. Uptime is 99.9% (as long as I don't trip over the server cable)."
      ]
    }
  },
  {
    id: "ai-scraper",
    name: "AI Web Automation",
    tech_stack: ["Next.js", "Puppeteer", "ReactFlow", "Gemini AI", "MySQL"],
    links: {
      demo: "https://www.linkedin.com/posts/rishab2211_excited-to-unveil-my-latest-project-activity-7313520047497363457-DfRW",
      github: "https://github.com/rishab2211/AI-WebScraping-Automator"
    },
    founder: {
      tagline: "Intelligent, node-based custom scraping workflow builder",
      description: [
        "Architected an intuitive drag-and-drop UI for building complex, automated web scraping pipelines.",
        "Integrated Gemini AI for data extraction, achieving 85% accuracy on highly unstructured web layouts."
      ]
    },
    stalker: {
      tagline: "Because writing RegEx makes me cry.",
      description: [
        "A drag-and-drop canvas where you just point at things and tell the AI to figure out the HTML mess.",
        "Puppeteer does the heavy lifting, Gemini does the reading. I just sit back and watch the database fill up."
      ]
    }
  },
  {
    id: "edge-blog",
    name: "Serverless Blog",
    tech_stack: ["React", "HonoJS", "Cloudflare Workers", "Prisma"],
    links: {
      github: "https://github.com/rishab2211/Blogging-web-app"
    },
    founder: {
      tagline: "Type-safe dynamic publishing deployed on global edge runtimes",
      description: [
        "Developed a production-grade full-stack platform optimized for global edge compute networks.",
        "Utilized HonoJS and Prisma to build ultra-responsive API routes with near-zero cold-start latency."
      ]
    },
    stalker: {
      tagline: "Traditional servers are too mainstream.",
      description: [
        "Deployed entirely on Cloudflare edge nodes because waiting 3 seconds for a server to wake up is unacceptable.",
        "Type-safe all the way down. If it compiles, it ships."
      ]
    }
  },
  {
    id: "web-server",
    name: "Java Web Server",
    tech_stack: ["Java", "Socket Programming", "Multi-threading"],
    links: {
      demo: "https://www.linkedin.com/posts/rishab2211_webservers-under-the-hood-from-50k-to-1-activity-7318576772684357632-iDon",
      github: "https://github.com/rishab2211/Webserver-JAVA"
    },
    founder: {
      tagline: "High-performance bare-metal network server implementation",
      description: [
        "Built a raw, highly optimized web server from the ground up using native socket programming.",
        "Engineered a custom thread-pooling system that handled 1M+ Requests Per Second while reducing memory usage by 35%."
      ]
    },
    stalker: {
      tagline: "Bare metal, zero frameworks, maximum chaos.",
      description: [
        "Decided to reinvent the wheel and build a web server in raw Java just to see how it works under the hood.",
        "Handled 1 Million RPS and turned my laptop into a space heater in the process. Worth it."
      ]
    }
  },
  {
    id: "social-backend",
    name: "Social Media App (Backend)",
    tech_stack: ["Java", "Spring Boot", "PostgreSQL"],
    links: {
      github: "https://github.com/rishab2211/Social"
    },
    founder: {
      tagline: "Enterprise-grade robust relational social graph backend engine",
      description: [
        "Engineered a secure, robust end-to-end user authentication and authorization system leveraging Spring Security and stateless JWTs.",
        "Architected highly scalable RESTful endpoints and complex database schemas to handle intensive relational mechanics (follows, likes, state management)."
      ]
    },
    stalker: {
      tagline: "Who needs a frontend anyway?",
      description: [
        "Built a massive relational graph engine to handle all the messy logic of a social network.",
        "Just pure backend architecture, complex SQL queries, and JWTs. Handled the chaos of followers and likes without writing a single line of CSS."
      ]
    }
  }
];