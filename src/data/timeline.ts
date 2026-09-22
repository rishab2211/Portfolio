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
      "B.Tech IT @ MAIT, Delhi. GPA 8. Spent most of my time building things outside the curriculum — the DSA and networks coursework still held up though.",
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
      "When I left as VC, I made sure the next team was set up to actually run it. Stayed on as mentor for 20+ people, mostly to answer 'what do I do now?' questions.",
    founderText:
      "Transitioned to an advisory role after my VC term to support the incoming 20+ member leadership team and mentor students on project delivery and technical architecture.",
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
    tags: ["10 → 160+ Engineers", "2,000+ Outreach", "50+ Initiatives", "National Events"],
    stalkerText:
      "Took the branch from 8 active members to 160+. Ran 50+ national level events. I was the one setting direction and making sure things shipped.",
    founderText:
      "Grew active membership from under 10 to 160+ student engineers and expanded outreach to 2,000+ students across 50+ technical initiatives and national hackathons.",
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