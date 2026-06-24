export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  category: "academic" | "ieee";
  tags: string[]; // <-- NEW: Renders as little skill pills under the event
  stalkerText: string;
  founderText: string;
};

export const timelineData: TimelineEvent[] = [
  // --- ACADEMICS & CAREER TRACK ---
  {
    id: "sde-lolo",
    date: "May 2026 - Present",
    title: "SDE Intern @LOLO CAB",
    category: "academic",
    tags: ["Backend Architecture", "Production Code", "Optimization"],
    stalkerText: "Bagged the SDE intern role. Writing actual production code, optimizing systems, and finally getting paid to break (and fix) things.",
    founderText: "Software Development Engineer Intern. Focused on optimizing backend architecture, writing production-grade code, and engineering high-performance software solutions.",
  },
  {
    id: "college",
    date: "Nov 2022 - Jun 2026",
    title: "B.Tech IT @MAIT",
    category: "academic",
    tags: ["MERN Stack", "Spring Boot", "Agentic AI", "Ubuntu"],
    stalkerText: "Deep diving into backend architecture. Lots of late nights troubleshooting Ubuntu servers, managing IntelliJ Ultimate packages, and forcing LLMs to behave.",
    founderText: "Pursuing a B.Tech in Information Technology at MAIT (Current CGPA: 7.7). Cultivated deep technical expertise in scalable system design, serverless architecture, and full-stack AI integrations.",
  },
  {
    id: "high-school",
    date: "Aug 2019 - Jul 2021",
    title: "Intermediate @RPVV IP Extn.",
    category: "academic",
    tags: ["Mathematics", "Physics", "Computer Science"],
    stalkerText: "Where it all started. Survived high school, laid down the math groundwork, and geared up for the engineering grind.",
    founderText: "Completed Intermediate/High School Certificate at RPVV IP Extension, establishing a strong quantitative and analytical foundation.",
  },

  // --- IEEE MAIT TRACK ---
  {
    id: "ieee-mentor",
    date: "Mar 2026 - Present",
    title: "The Mentorship Pivot",
    category: "ieee",
    tags: ["Strategic Advisory", "Organizational Restructuring"],
    stalkerText: "Realized legacy > title. Willingly resigned from the VC role in March 2026 to mentor the next generation and rebuild the executive board's foundation.",
    founderText: "Transitioned to a strategic Mentor role. Actively advising the core executive team through a comprehensive organizational restructuring to sustain peak branch performance.",
  },
  {
    id: "ieee-vc",
    date: "Jun 2025 - Mar 2026",
    title: "Vice-Chairperson",
    category: "ieee",
    tags: ["Community Scaling", "Strategic Mentorship", "National Recognition"],
    stalkerText: "Took the reins when we were just a tight-knit group of 10. Shifted the focus from just running events to actually building an army of builders. Scaled the core team to 160+, mentored over 1,000 students, and ultimately bagged the national 'Outstanding Student Branch of the Year' award from the IEEE India Council.",
    founderText: "Spearheaded comprehensive community growth strategies, successfully scaling the core active membership from 10 to over 160 personnel. Mentored 1,000+ students in technical domains, establishing a sustainable ecosystem that was ultimately recognized with the prestigious 'Outstanding Student Branch' national award by the IEEE India Council.",
  },
  {
    id: "ieee-core",
    date: "Jan 2024 - Jun 2025",
    title: "Core Team to Core Lead",
    category: "ieee",
    tags: ["Cross-functional Leadership", "Project Delivery"],
    stalkerText: "Put in the hours. Promoted to Core Team, then Core Lead. Started directly managing teams, hosting coding bootcamps, and taking ownership of full-stack workshops.",
    founderText: "Rapidly advanced to Core Team Lead. Developed crucial skills in cross-functional coordination, resource allocation, and conducting technical mentorship bootcamps.",
  },
  {
    id: "ieee-vol",
    date: "Aug 2023 - Jan 2024",
    title: "The Starting Line (Volunteer)",
    category: "ieee",
    tags: ["Community Management", "Event Logistics"],
    stalkerText: "Joined the community. Hauled desks, managed crowds, and learned how tech events actually run behind the scenes.",
    founderText: "Initiated involvement as a Volunteer, gaining foundational exposure to technical event operations and grassroots community management.",
  }
];