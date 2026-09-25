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
        "Architected an intelligent web scraping platform featuring a drag-and-drop workflow canvas and an LLM-driven structured schema normalization pipeline for dynamic web pages.",
        "Engineered scheduled cron execution with automated retry backoffs and schema fallback validation when target DOM trees mutate.",
      ],
    },
    stalker: {
      tagline: "Replacing brittle RegEx with schema-aware LLM parsing.",
      description: [
        "A drag-and-drop canvas where you wire nodes together and let the AI normalize the HTML chaos.",
        "Puppeteer does the heavy lifting, Gemini extracts structured JSON. Scheduled crons keep the database fed.",
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
      tagline: "Real-time communication with WebSocket architecture and client-side state optimization",
      description: [
        "WebSocket-based chat app with JWT authentication and binary file sharing up to 10MB.",
        "Eliminated message interleaving race conditions during concurrent room broadcasts via Zustand client state reconciliation.",
      ],
    },
    stalker: {
      tagline: "Real-time state sync and binary streaming.",
      description: [
        "Built this because I was tired of standard chat apps compressing my files into oblivion.",
        "Fixed room broadcast race conditions and state sync headaches with Zustand. Rock-solid persistence (as long as I don't trip over the server cable).",
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
        "Built a high-performance, multi-threaded web server and benchmarked it at 1M+ RPS over loopback with wrk.",
        "Created efficient thread pooling system that reduced memory usage by 35% compared to unbounded thread-per-connection baselines.",
      ],
    },
    stalker: {
      tagline: "Bare metal, zero frameworks, maximum throughput.",
      description: [
        "Decided to reinvent the wheel and build an HTTP/1.1 server in raw Java sockets to study connection scheduling.",
        "Pushed past 1M synthetic requests/sec on loopback benchmarks and turned my laptop into a space heater. Worth it.",
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
      tagline: "Relational social backend with Spring Boot and PostgreSQL",
      description: [
        "Designed the database schema and business logic for posts, follows, likes, and profiles using Spring Boot and PostgreSQL.",
        "Secured backend REST endpoints with Spring Security filter chains and stateless JWT authentication.",
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
    },
    founder: {
      tagline: "Serverless publishing platform deployed on Cloudflare Workers",
      description: [
        "Built a full-stack publishing platform running at the edge on Cloudflare Workers using HonoJS and Prisma.",
        "Designed lightweight API routes to keep cold starts near zero and response times minimal globally.",
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