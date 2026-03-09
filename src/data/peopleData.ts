import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";
import hamza from "@/assets/hamza.jpeg";

export interface Leader {
  id: string;
  name: string;
  title: string;
  image: string;
  focusAreas: string[];
  bio: string;
  fullBio: string[];
  office: string;
  email: string;
  linkedin: string;
  expertise: string[];
  highlights: string[];
  education: string[];
  publications: { title: string; date: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  practiceArea: string;
  industry: string;
  office: string;
  image: string;
}

export const leaders: Leader[] = [
  {
    id: "james-odhiambo",
    name: "James Odhiambo",
    title: "Managing Partner",
    image: leader1,
    focusAreas: ["Strategy", "Public Sector", "Infrastructure"],
    bio: "James leads Noark's global operations, bringing over 25 years of experience advising heads of state, CEOs, and institutional leaders worldwide.",
    fullBio: [
      "James Odhiambo is the Managing Partner of Noark Advisory Group. With more than 25 years of experience in strategy consulting, he has advised heads of state, Fortune 500 CEOs, and institutional leaders on some of the most consequential decisions facing organisations globally.",
      "His work spans public finance reform, infrastructure development, and large-scale organisational transformation. James is widely recognised as one of the most influential strategic advisors in the field.",
      "Before joining Noark, James held senior positions at leading global institutions and served as an advisor to multiple national treasuries. He is a frequent keynote speaker on governance, economic development, and enterprise transformation.",
      "James holds an MBA from London Business School and a degree in Economics from the University of Nairobi. He serves on the boards of several non-profit organisations focused on education and youth empowerment."
    ],
    office: "Perugia",
    email: "j.odhiambo@noarkadvisory.com",
    linkedin: "#",
    expertise: ["Corporate Strategy", "Government Advisory", "Infrastructure", "Economic Development", "Organisational Transformation"],
    highlights: [
      "Led one of the largest public finance reform initiatives impacting 47 counties",
      "Advised the CEO of a leading telecom on a $2B digital transformation",
      "Designed a national infrastructure investment framework for 2020–2030",
      "Built strategic partnerships between governments and multilateral institutions"
    ],
    education: ["MBA, London Business School", "BSc Economics, University of Nairobi"],
    publications: [
      { title: "The Future of Public-Private Partnerships", date: "March 2026" },
      { title: "Building Resilient Institutions: A Framework for Governments", date: "January 2026" },
      { title: "Infrastructure as a Catalyst for Inclusive Growth", date: "October 2025" }
    ]
  },
  {
    id: "hamza-yussuf-sharif",
    name: "Hamza Yussuf Sharif",
    title: "Associate – Digital Solutions & Engineering",
    image: hamza,
    focusAreas: ["Web Development", "Software Engineering", "AI & Automation"],
    bio: "Hamza is a driven technologist and software engineer currently pursuing his university degree, already making an impact through his expertise in full-stack development and emerging technologies.",
    fullBio: [
      "Hamza Yussuf Sharif is an Associate at Noark Advisory Group's Digital Solutions & Engineering division. Currently completing his university studies, Hamza brings a rare combination of academic rigour and hands-on technical expertise to every engagement.",
      "With proficiency spanning HTML, CSS, JavaScript, Python, and C, Hamza has contributed to client-facing digital platforms, internal automation tools, and data-driven prototypes that accelerate Noark's consulting delivery.",
      "Hamza is passionate about leveraging technology to solve real-world problems. His work at Noark focuses on building scalable web applications, developing automation pipelines, and supporting the firm's AI-driven advisory tools.",
      "He is recognised within the firm for his rapid learning ability, collaborative spirit, and commitment to writing clean, maintainable code. Hamza represents the next generation of technology leaders shaping the future of advisory services."
    ],
    office: "Perugia",
    email: "h.sharif@noarkadvisory.com",
    linkedin: "#",
    expertise: ["HTML & CSS", "JavaScript & TypeScript", "Python", "C Programming", "Full-Stack Development", "AI & Automation"],
    highlights: [
      "Developed an internal automation tool that reduced report generation time by 40%",
      "Built and deployed client-facing web dashboards for real-time data visualization",
      "Contributed to the firm's AI-powered research assistant prototype",
      "Led the front-end development of Noark's redesigned digital presence"
    ],
    education: ["BSc Computer Science (In Progress), University"],
    publications: [
      { title: "Modern Web Development: Best Practices for Enterprise Applications", date: "February 2026" },
      { title: "Automation in Consulting: A Developer's Perspective", date: "November 2025" }
    ]
  },
  {
    id: "amina-wanjiku",
    name: "Amina Wanjiku",
    title: "Senior Partner – Digital & AI",
    image: leader2,
    focusAreas: ["Digital Transformation", "AI", "Technology Strategy"],
    bio: "Amina leads Noark's Digital & AI practice, helping enterprises worldwide harness technology to drive growth, efficiency, and competitive advantage.",
    fullBio: [
      "Amina Wanjiku is a Senior Partner and the head of Noark Advisory Group's Digital & AI practice. She is a recognised authority on digital transformation, having helped more than 40 organisations across banking, telecom, and healthcare adopt AI-driven strategies.",
      "Her approach combines deep technical understanding with commercial pragmatism, enabling clients to move from pilot to scale with confidence.",
      "Prior to Noark, Amina spent a decade at a leading Silicon Valley technology firm, where she led product strategy for emerging markets. She returned with a mission to accelerate the global digital economy.",
      "Amina holds a Master's in Computer Science from Stanford University and a BSc from Strathmore University. She mentors women in technology and is a board member of the Digital Council."
    ],
    office: "Perugia",
    email: "a.wanjiku@noarkadvisory.com",
    linkedin: "#",
    expertise: ["Artificial Intelligence", "Digital Strategy", "Data & Analytics", "Product Innovation", "Technology Operating Models"],
    highlights: [
      "Built an AI strategy for a major commercial bank, reducing fraud by 60%",
      "Led a continent-wide digital health platform reaching 15 million users",
      "Designed the technology roadmap for a $500M fintech expansion",
      "Advised three central banks on digital currency feasibility studies"
    ],
    education: ["MS Computer Science, Stanford University", "BSc Information Technology, Strathmore University"],
    publications: [
      { title: "AI: Moving from Hype to Impact", date: "February 2026" },
      { title: "Digital Leapfrogging: Lessons from Global Tech Ecosystems", date: "November 2025" },
      { title: "The CTO's Playbook for Responsible AI Adoption", date: "August 2025" }
    ]
  }
];

export const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Sarah Kimani", role: "Principal", practiceArea: "Strategy", industry: "Financial Services", office: "Perugia", image: leader1 },
  { id: "tm-2", name: "Peter Njoroge", role: "Associate Partner", practiceArea: "Digital & AI", industry: "Technology", office: "Milan", image: leader2 },
  { id: "tm-3", name: "Fatima Hassan", role: "Principal", practiceArea: "Sustainability", industry: "Energy", office: "London", image: leader3 },
];

export const practiceAreas = ["All", "Strategy", "Digital & AI", "Sustainability", "Public Sector", "Corporate Finance", "Risk & Resilience"];
export const industries = ["All", "Financial Services", "Technology", "Energy", "Government", "Healthcare", "Retail", "Infrastructure"];
export const offices = ["All", "Perugia", "Milan", "London", "Amsterdam"];
