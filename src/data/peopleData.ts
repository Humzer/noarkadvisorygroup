import leader1 from "@/assets/leader-1.jpg";
import leader2 from "@/assets/leader-2.jpg";
import leader3 from "@/assets/leader-3.jpg";
import leader4 from "@/assets/leader-4.jpg";
import leader5 from "@/assets/leader-5.jpg";
import leader6 from "@/assets/leader-6.jpg";

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
      "James Odhiambo is the Managing Partner of Noark Advisory Group's Kenya office. With more than 25 years of experience in strategy consulting, he has advised heads of state, Fortune 500 CEOs, and institutional leaders on some of the most consequential decisions facing the region.",
      "His work spans public finance reform, infrastructure development, and large-scale organisational transformation. James is widely recognised as one of East Africa's most influential strategic advisors, having shaped policy frameworks that have impacted millions of citizens.",
      "Before joining Noark, James held senior positions at leading global institutions and served as an advisor to Kenya's National Treasury. He is a frequent keynote speaker on governance, economic development, and the future of African enterprise.",
      "James holds an MBA from London Business School and a degree in Economics from the University of Nairobi. He serves on the boards of several non-profit organisations focused on education and youth empowerment."
    ],
    office: "Perugia",
    email: "j.odhiambo@noarkadvisory.com",
    linkedin: "#",
    expertise: ["Corporate Strategy", "Government Advisory", "Infrastructure", "Economic Development", "Organisational Transformation"],
    highlights: [
      "Led Kenya's largest public finance reform initiative impacting 47 counties",
      "Advised the CEO of East Africa's leading telecom on a $2B digital transformation",
      "Designed the national infrastructure investment framework for 2020–2030",
      "Built strategic partnerships between East African governments and multilateral institutions"
    ],
    education: ["MBA, London Business School", "BSc Economics, University of Nairobi"],
    publications: [
      { title: "The Future of Public-Private Partnerships in East Africa", date: "March 2026" },
      { title: "Building Resilient Institutions: A Framework for African Governments", date: "January 2026" },
      { title: "Infrastructure as a Catalyst for Inclusive Growth", date: "October 2025" }
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
      "Amina Wanjiku is a Senior Partner and the head of Noark Advisory Group's Digital & AI practice in East Africa. She is a recognised authority on digital transformation, having helped more than 40 organisations across banking, telecom, and healthcare adopt AI-driven strategies.",
      "Her approach combines deep technical understanding with commercial pragmatism, enabling clients to move from pilot to scale with confidence. Amina has been instrumental in building Kenya's reputation as a regional technology hub.",
      "Prior to Noark, Amina spent a decade at a leading Silicon Valley technology firm, where she led product strategy for emerging markets. She returned to Nairobi with a mission to accelerate Africa's digital economy.",
      "Amina holds a Master's in Computer Science from Stanford University and a BSc from Strathmore University. She mentors women in technology and is a board member of the East African Digital Council."
    ],
    office: "Perugia",
    email: "a.wanjiku@noarkadvisory.com",
    linkedin: "#",
    expertise: ["Artificial Intelligence", "Digital Strategy", "Data & Analytics", "Product Innovation", "Technology Operating Models"],
    highlights: [
      "Built the AI strategy for Kenya's largest commercial bank, reducing fraud by 60%",
      "Led a continent-wide digital health platform reaching 15 million users",
      "Designed the technology roadmap for a $500M fintech expansion",
      "Advised three central banks on digital currency feasibility studies"
    ],
    education: ["MS Computer Science, Stanford University", "BSc Information Technology, Strathmore University"],
    publications: [
      { title: "AI in Africa: Moving from Hype to Impact", date: "February 2026" },
      { title: "Digital Leapfrogging: Lessons from Kenya's Tech Ecosystem", date: "November 2025" },
      { title: "The CTO's Playbook for Responsible AI Adoption", date: "August 2025" }
    ]
  },
  {
    id: "rajesh-patel",
    name: "Rajesh Patel",
    title: "Senior Partner – Corporate Finance",
    image: leader3,
    focusAreas: ["Corporate Finance", "M&A", "Private Equity"],
    bio: "Rajesh brings deep expertise in corporate finance and M&A across emerging markets, having structured over $8 billion in transactions across East and Southern Africa.",
    fullBio: [
      "Rajesh Patel is a Senior Partner at Noark Advisory Group with over 20 years of experience in corporate finance, mergers and acquisitions, and private equity across emerging markets.",
      "He has structured and advised on more than $8 billion in transactions spanning infrastructure, energy, financial services, and technology. His clients include some of the largest conglomerates and private equity firms operating in Africa.",
      "Rajesh is known for his rigorous analytical approach and his ability to navigate complex cross-border transactions. He has been recognised as one of East Africa's top dealmakers by multiple industry publications.",
      "He holds a CFA charter, an MBA from INSEAD, and a degree in Finance from the University of Mumbai. Rajesh is an active contributor to policy discussions on capital markets development in Africa."
    ],
    office: "Milan",
    email: "r.patel@noarkadvisory.com",
    linkedin: "#",
    expertise: ["Mergers & Acquisitions", "Corporate Finance", "Private Equity", "Capital Markets", "Valuation & Due Diligence"],
    highlights: [
      "Advised on the largest cross-border M&A transaction in East African history ($1.2B)",
      "Structured the financing for Kenya's first green bond issuance",
      "Led due diligence for a pan-African private equity fund's $400M portfolio",
      "Designed the capital restructuring strategy for a state-owned enterprise"
    ],
    education: ["MBA, INSEAD", "BCom Finance, University of Mumbai", "CFA Charterholder"],
    publications: [
      { title: "The State of M&A in East Africa: 2026 Outlook", date: "January 2026" },
      { title: "Green Bonds and Sustainable Finance in Frontier Markets", date: "September 2025" },
      { title: "Navigating Cross-Border Deals in Africa", date: "June 2025" }
    ]
  },
  {
    id: "grace-muthoni",
    name: "Grace Muthoni",
    title: "Partner – Sustainability & ESG",
    image: leader4,
    focusAreas: ["Sustainability", "ESG", "Climate Strategy"],
    bio: "Grace is a leading voice on sustainability and ESG in Africa, helping corporations and governments integrate climate strategy into core operations.",
    fullBio: [
      "Grace Muthoni is a Partner at Noark Advisory Group and leads the firm's Sustainability & ESG practice. She works with corporate boards, investors, and government agencies to embed environmental, social, and governance principles into strategy and operations.",
      "Grace has advised on climate strategy for some of Kenya's largest companies and has played a key role in shaping national sustainability policy. She is passionate about demonstrating that sustainable business practices drive both impact and returns.",
      "Before consulting, Grace worked with the United Nations Environment Programme in Nairobi, where she led initiatives on climate finance and green economy transitions across sub-Saharan Africa.",
      "She holds a Master's in Environmental Management from Yale University and a BSc in Environmental Science from Kenyatta University."
    ],
    office: "London",
    email: "g.muthoni@noarkadvisory.com",
    linkedin: "#",
    expertise: ["ESG Strategy", "Climate Risk", "Sustainable Finance", "Carbon Markets", "Circular Economy"],
    highlights: [
      "Designed Kenya's first corporate net-zero roadmap for a major manufacturer",
      "Advised the government on the National Climate Action Plan 2025–2030",
      "Structured a $200M green investment fund for renewable energy projects",
      "Led ESG integration for a leading East African pension fund"
    ],
    education: ["MEM, Yale School of the Environment", "BSc Environmental Science, Kenyatta University"],
    publications: [
      { title: "ESG in Africa: From Compliance to Competitive Advantage", date: "March 2026" },
      { title: "Carbon Markets and the Future of African Agriculture", date: "December 2025" },
      { title: "The Business Case for Climate Resilience", date: "July 2025" }
    ]
  },
  {
    id: "helen-van-der-berg",
    name: "Helen van der Berg",
    title: "Senior Partner – Risk & Resilience",
    image: leader5,
    focusAreas: ["Risk Management", "Resilience", "Governance"],
    bio: "Helen is a globally recognised expert in enterprise risk management, helping institutions build resilience in an increasingly uncertain world.",
    fullBio: [
      "Helen van der Berg is a Senior Partner at Noark Advisory Group, leading the Risk & Resilience practice. With 28 years of experience spanning Europe, Asia, and Africa, she brings a truly global perspective to risk management and institutional governance.",
      "Helen specialises in helping organisations anticipate, prepare for, and respond to complex risks—from geopolitical uncertainty to cyber threats and regulatory change. Her frameworks have been adopted by central banks and regulatory bodies across multiple continents.",
      "Prior to joining Noark, Helen held senior risk leadership positions at major European financial institutions and served as an advisor to the European Central Bank.",
      "Helen holds a PhD in Risk Management from the London School of Economics and is a Fellow of the Institute of Risk Management."
    ],
    office: "Amsterdam",
    email: "h.vanderberg@noarkadvisory.com",
    linkedin: "#",
    expertise: ["Enterprise Risk Management", "Cyber Risk", "Regulatory Strategy", "Crisis Management", "Board Governance"],
    highlights: [
      "Designed the risk management framework for Kenya's central bank modernisation programme",
      "Led crisis response strategy for three multinational corporations during COVID-19",
      "Advised on regulatory reform across four East African banking jurisdictions",
      "Built a cyber resilience programme for the region's largest financial services group"
    ],
    education: ["PhD Risk Management, London School of Economics", "MSc Finance, University of Amsterdam"],
    publications: [
      { title: "Enterprise Resilience in an Age of Uncertainty", date: "February 2026" },
      { title: "Cyber Risk in African Financial Services: A Board-Level Guide", date: "October 2025" },
      { title: "Building Anti-Fragile Institutions", date: "May 2025" }
    ]
  },
  {
    id: "daniel-kipchoge",
    name: "Daniel Kipchoge",
    title: "Partner – Public Sector Transformation",
    image: leader6,
    focusAreas: ["Public Sector", "Governance", "Service Delivery"],
    bio: "Daniel focuses on modernising public institutions, bringing private-sector discipline to government agencies to improve service delivery and citizen outcomes.",
    fullBio: [
      "Daniel Kipchoge is a Partner at Noark Advisory Group specialising in public sector transformation and governance reform. He works with national and county governments to modernise institutions, improve service delivery, and strengthen accountability.",
      "His work combines deep understanding of African governance structures with global best practices in public administration. Daniel has led reform programmes across health, education, and revenue administration for multiple government clients.",
      "Before joining Noark, Daniel served in Kenya's public service, where he was instrumental in designing the devolution framework and building capacity in newly created county governments.",
      "He holds a Master's in Public Administration from Harvard Kennedy School and a law degree from the University of Nairobi."
    ],
    office: "Perugia",
    email: "d.kipchoge@noarkadvisory.com",
    linkedin: "#",
    expertise: ["Government Reform", "Service Delivery", "Revenue Administration", "Devolution", "Healthcare Systems"],
    highlights: [
      "Led the design of Kenya's county government performance management system",
      "Advised on health sector reforms improving access for 8 million citizens",
      "Designed the digital government strategy for three East African nations",
      "Built capacity-building programmes for 2,000+ public sector leaders"
    ],
    education: ["MPA, Harvard Kennedy School", "LLB, University of Nairobi"],
    publications: [
      { title: "Reinventing Government: Lessons from Kenya's Devolution Journey", date: "January 2026" },
      { title: "Digital Government and Citizen Trust", date: "September 2025" },
      { title: "Healthcare Reform in East Africa: A Systems Approach", date: "April 2025" }
    ]
  }
];

export const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Sarah Kimani", role: "Principal", practiceArea: "Strategy", industry: "Financial Services", office: "Perugia", image: leader4 },
  { id: "tm-2", name: "Peter Njoroge", role: "Associate Partner", practiceArea: "Digital & AI", industry: "Technology", office: "Milan", image: leader6 },
  { id: "tm-3", name: "Fatima Hassan", role: "Principal", practiceArea: "Sustainability", industry: "Energy", office: "London", image: leader2 },
  { id: "tm-4", name: "Michael Omondi", role: "Senior Associate", practiceArea: "Public Sector", industry: "Government", office: "Perugia", image: leader1 },
  { id: "tm-5", name: "Priya Sharma", role: "Associate Partner", practiceArea: "Corporate Finance", industry: "Financial Services", office: "Amsterdam", image: leader5 },
  { id: "tm-6", name: "Thomas Kariuki", role: "Principal", practiceArea: "Risk & Resilience", industry: "Healthcare", office: "London", image: leader3 },
  { id: "tm-7", name: "Lilian Achieng", role: "Senior Associate", practiceArea: "Digital & AI", industry: "Retail", office: "Milan", image: leader4 },
  { id: "tm-8", name: "David Mutua", role: "Principal", practiceArea: "Strategy", industry: "Infrastructure", office: "Perugia", image: leader6 },
];

export const practiceAreas = ["All", "Strategy", "Digital & AI", "Sustainability", "Public Sector", "Corporate Finance", "Risk & Resilience"];
export const industries = ["All", "Financial Services", "Technology", "Energy", "Government", "Healthcare", "Retail", "Infrastructure"];
export const offices = ["All", "Perugia", "Milan", "London", "Amsterdam"];
