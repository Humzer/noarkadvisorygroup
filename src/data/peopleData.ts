import shuaib from "@/assets/shuaib.jpeg";
import hamza from "@/assets/hamza.jpeg";
import yahya from "@/assets/yahya.jpeg";

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
    id: "shuaib-yussuf-sharif",
    name: "Shuaib Yussuf Sharif",
    title: "Co-Founder & Managing Partner",
    image: shuaib,
    focusAreas: ["Finance", "Statistics", "Quantitative Economics"],
    bio: "Shuaib is the co-founder of Noark Advisory Group, bringing deep expertise in statistics, financial consulting, and quantitative methods for economics to guide the firm's strategic vision.",
    fullBio: [
      "Shuaib Yussuf Sharif is the Co-Founder and Managing Partner of Noark Advisory Group. A skilled statistician and finance consultant, he combines rigorous quantitative analysis with strategic foresight to deliver transformative outcomes for clients across multiple sectors.",
      "His expertise spans financial modelling, econometric analysis, risk assessment, and data-driven decision-making. Shuaib has advised organisations on capital allocation strategies, market entry feasibility, and macroeconomic policy frameworks.",
      "As the driving force behind Noark's founding vision, Shuaib is committed to building a firm that bridges the gap between academic rigour and real-world business impact. He champions evidence-based consulting that empowers leaders to make confident, informed decisions.",
      "Shuaib holds advanced qualifications in Statistics and Economics and continues to contribute to thought leadership in quantitative finance and economic development."
    ],
    office: "Perugia",
    email: "s.sharif@noarkadvisory.com",
    linkedin: "#",
    expertise: ["Financial Consulting", "Statistical Analysis", "Quantitative Methods", "Econometrics", "Risk Assessment", "Economic Development"],
    highlights: [
      "Co-founded Noark Advisory Group with a vision for evidence-based global consulting",
      "Developed proprietary financial models used across multiple client engagements",
      "Advised on capital allocation strategies for institutional investors",
      "Led quantitative analysis for macroeconomic policy advisory projects"
    ],
    education: ["Advanced Studies in Statistics & Economics"],
    publications: [
      { title: "Quantitative Methods in Modern Financial Consulting", date: "March 2026" },
      { title: "Data-Driven Decision Making for Emerging Markets", date: "January 2026" },
      { title: "Statistical Frameworks for Economic Resilience", date: "October 2025" }
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
    id: "yahya-yussuf-sharif",
    name: "Yahya Yussuf Sharif",
    title: "Associate – Digital Solutions & Mobile Engineering",
    image: yahya,
    focusAreas: ["Mobile Development", "Web Development", "Android Engineering"],
    bio: "Yahya is a dedicated software developer currently pursuing his degree, with a growing expertise in web technologies and Android application development.",
    fullBio: [
      "Yahya Yussuf Sharif is an Associate in Noark Advisory Group's Digital Solutions division, specialising in mobile and web development. Currently pursuing his software development degree, Yahya brings enthusiasm and a strong technical foundation to the firm's digital initiatives.",
      "Proficient in HTML, CSS, and Android Studio, Yahya contributes to the design and development of mobile applications and responsive web interfaces that support Noark's client-facing digital products.",
      "His focus on Android engineering positions him at the intersection of mobile technology and business advisory, enabling Noark to deliver solutions that reach clients wherever they are.",
      "Yahya is recognised for his collaborative approach, attention to detail, and commitment to continuous learning. He represents the firm's investment in cultivating emerging talent to drive future innovation."
    ],
    office: "Perugia",
    email: "y.sharif@noarkadvisory.com",
    linkedin: "#",
    expertise: ["HTML & CSS", "Android Studio", "Mobile Development", "UI/UX Design", "Responsive Web Design"],
    highlights: [
      "Developed Android prototypes for client engagement tools",
      "Contributed to the responsive redesign of Noark's web platform",
      "Built mobile-first interfaces for internal project management tools",
      "Supported cross-platform testing and quality assurance workflows"
    ],
    education: ["BSc Software Development (In Progress), University"],
    publications: [
      { title: "Mobile-First Design in Enterprise Advisory", date: "January 2026" },
      { title: "Android Development for Business Applications", date: "November 2025" }
    ]
  }
];

export const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Shuaib Yussuf Sharif", role: "Co-Founder & Managing Partner", practiceArea: "Corporate Finance", industry: "Financial Services", office: "Perugia", image: shuaib },
  { id: "tm-2", name: "Hamza Yussuf Sharif", role: "Associate", practiceArea: "Digital & AI", industry: "Technology", office: "Perugia", image: hamza },
  { id: "tm-3", name: "Yahya Yussuf Sharif", role: "Associate", practiceArea: "Digital & AI", industry: "Technology", office: "Perugia", image: yahya },
];

export const practiceAreas = ["All", "Strategy", "Digital & AI", "Sustainability", "Corporate Finance", "Risk & Resilience"];
export const industries = ["All", "Financial Services", "Technology", "Energy", "Healthcare"];
export const offices = ["All", "Perugia"];
