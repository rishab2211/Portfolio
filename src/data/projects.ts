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
      github: "https://github.com/rishab2211/AI-WebScraping-Automator",
    },
    founder: {
      tagline: "Intelligent, node-based custom scraping workflow builder",
      description: [
        "Built an intelligent web scraping platform featuring a drag-and-drop workflow canvas and an LLM-driven structured schema normalization pipeline for dynamic web pages.",
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
        "Reconciled WebSocket message ordering client-side via Zustand to eliminate message interleaving during concurrent room broadcasts.",
      ],
    },
    stalker: {
      tagline: "Real-time state sync and binary streaming.",
      description: [
        "Built this because I was tired of standard chat apps compressing my files into oblivion.",
        "Fixed room broadcast race conditions by reconciling WebSocket message ordering client-side with Zustand. Binary file sharing up to 10MB without the compression most chat apps force on you.",
      ],
    },
  },
  {
    id: "web-server",
    name: "Multithreaded TCP Server",
    tech_stack: ["Java", "Socket Programming", "Multi-threading"],
    links: {
      github: "https://github.com/rishab2211/Webserver-JAVA",
    },
    founder: {
      tagline: "High-performance bare-metal network server implementation",
      description: [
        "Built a bare-metal HTTP server in raw Java sockets, benchmarking 1M+ requests/sec on loopback (wrk) to profile thread scheduling and connection lifecycle bottlenecks.",
        "Implemented custom thread pooling that cut memory overhead 35% compared to thread-per-connection baselines, maintaining stable socket reuse under concurrency.",
      ],
    },
    stalker: {
      tagline: "Bare metal, zero frameworks, maximum throughput.",
      description: [
        "Decided to build an HTTP/1.1 server from scratch in raw Java sockets to study connection scheduling at the OS layer.",
        "1M+ requests/sec on loopback — synthetic, but it forced me to understand where the bottleneck actually was (the thread scheduler, not the network). Built custom thread pooling to cut memory overhead 35%.",
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
      tagline: "Relational social graph backend with Spring Boot and PostgreSQL",
      description: [
        "Engineered a relational social graph backend focused on asymmetric read/write patterns in follow graphs and fan-out feeds using PostgreSQL and Spring Boot.",
        "Secured REST endpoints with Spring Security filter chains and stateless JWT authentication, optimizing relational joins across user activities.",
      ],
    },
    stalker: {
      tagline: "Who needs a frontend anyway?",
      description: [
        "Built this after realizing I didn't understand how a social graph actually works at the database level — follows are bidirectional relationships with asymmetric read patterns.",
        "Pure backend architecture, indexing strategies, and relational schema design to handle follower queries cleanly without ORM overhead.",
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