export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  category: "academic" | "ieee";
  tags: string[];
  stalkerText: string;
  founderText: string;
};

export const timelineData: TimelineEvent[] = [
  // --- ACADEMICS & CAREER TRACK ---
  {
    id: "sde-lolo",
    date: "May 2026 - Present",
    title: "Software Development Engineer Intern @ Lolocab",
    category: "academic",
    tags: ["Node.js", "Express.js", "React.js", "MongoDB", "TailwindCSS", "Vite", "AWS"],
    stalkerText:
      "Engineered carpooling platforms, automated SEO pre-rendering pipelines, and built coupon & investor analytics workflows in production.",
    founderText:
      "Built full-stack carpool search, ride offering, and booking flow across React and Node.js microservices. Integrated coupon validation APIs, investor analytics panels, dynamic SEO pre-rendering scripts, and administrative document workflows.",
  },
  {
    id: "college",
    date: "Nov 2022 - Jun 2026",
    title: "B.Tech in IT @ Maharaja Agrasen Institute of Technology (GPA: 8)",
    category: "academic",
    tags: ["DSA", "DBMS", "Algorithms", "Computer Networks", "Operating Systems", "OOPs"],
    stalkerText:
      "Deep diving into systems programming, backend architectures, Ubuntu servers, and managing high-performance packages.",
    founderText:
      "Pursuing B.Tech in Information Technology at Maharaja Agrasen Institute of Technology (GPA: 8). Core coursework in Data Structures & Algorithms, DBMS, Computer Networks, Operating Systems, Compiler Design, and OOPs.",
  },
  {
    id: "high-school",
    date: "Aug 2019 - Jul 2021",
    title: "Intermediate @ RPVV IP Extn.",
    category: "academic",
    tags: ["Mathematics", "Physics", "Computer Science"],
    stalkerText:
      "Where it all started. Survived high school, laid down the math groundwork, and geared up for the engineering grind.",
    founderText:
      "Completed Senior Secondary Education at RPVV IP Extension, establishing rigorous quantitative and analytical foundations.",
  },

  // --- IEEE MAIT TRACK ---
  {
    id: "ieee-award-pal",
    date: "Jun 2026",
    title: "Dr. J.K. Pal Memorial Award",
    category: "ieee",
    tags: ["National Honor", "IEEE Delhi SSN", "Leadership"],
    stalkerText:
      "Awarded the prestigious Dr. J.K. Pal Memorial Award by IEEE Delhi SSN in recognition of leadership, community scaling, and technical impact.",
    founderText:
      "Awarded with the Dr. J.K. Pal Memorial Award by IEEE Delhi SSN in recognition of exemplary engineering leadership and community contributions.",
  },
  {
    id: "ieee-mentor",
    date: "Mar 2026 - Present",
    title: "Mentor • IEEE MAIT Student Branch",
    category: "ieee",
    tags: ["Advisory", "20+ Member Exec Team", "160+ Community"],
    stalkerText:
      "Orchestrated proactive restructuring to transition to an advisory role, empowering the 20+ member executive team and mentoring 160+ engineers.",
    founderText:
      "Orchestrated a proactive, mid-tenure organizational restructuring, transitioning to an advisory role to empower a 20+ member executive team and mentoring an engineering community of 160+ students on technical architecture and project delivery.",
  },
  {
    id: "ieee-award-council",
    date: "Dec 2025",
    title: "Outstanding Student Branch Award",
    category: "ieee",
    tags: ["National Award", "IEEE India Council", "Excellence"],
    stalkerText:
      "Received the Outstanding Student Branch Award from IEEE India Council under my executive leadership.",
    founderText:
      "Received the prestigious Outstanding Student Branch Award from IEEE India Council under my leadership.",
  },
  {
    id: "ieee-vc",
    date: "Aug 2023 - Mar 2026",
    title: "Vice Chairperson • IEEE MAIT Student Branch",
    category: "ieee",
    tags: ["10 → 160+ Engineers", "2,000+ Outreach", "50+ Initiatives", "Agentic AI Hackathon"],
    stalkerText:
      "Scaled core active membership from under 10 to 160+ student engineers, impacted 2,000+ students, and spearheaded 50+ initiatives including a national Agentic AI Hackathon.",
    founderText:
      "Drove massive organizational growth by scaling active core membership from under 10 to 160+ student engineers, while expanding overall outreach to impact 2,000+ students across 50+ technical initiatives, including architecting a national-level Agentic AI Hackathon.",
  },
  {
    id: "ieee-core",
    date: "Jan 2024 - Jun 2025",
    title: "Core Team to Core Lead",
    category: "ieee",
    tags: ["Cross-functional Leadership", "Bootcamps"],
    stalkerText:
      "Put in the hours. Promoted to Core Team, then Core Lead. Managed teams, hosted coding bootcamps, and took ownership of workshops.",
    founderText:
      "Rapidly advanced to Core Team Lead. Developed crucial skills in cross-functional coordination, resource allocation, and conducting technical mentorship bootcamps.",
  },
  {
    id: "ieee-vol",
    date: "Aug 2023 - Jan 2024",
    title: "The Starting Line (Volunteer)",
    category: "ieee",
    tags: ["Community Management", "Event Operations"],
    stalkerText:
      "Joined the community. Hauled desks, managed crowds, and learned how tech events actually run behind the scenes.",
    founderText:
      "Initiated involvement as a Volunteer, gaining foundational exposure to technical event operations and grassroots community management.",
  },
];