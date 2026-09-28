export const profile = {
  name: "Naman Dadhich",
  handle: "namannn04",
  role: "Full Stack Developer",
  location: "New Delhi, India",
  timezone: "Asia/Kolkata",
  email: "namandadhich15592@gmail.com",
  education: {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Maharaja Surajmal Institute of Technology",
    year: "2027",
  },
  intro:
    "I build scalable full-stack products, lead developer communities, and turn ambitious ideas into shipped experiences.",
  about: [
    "I'm a Full Stack Developer in my final year of Computer Science, with more than two years of hands-on experience building solid web applications. I started with the MERN stack and now build primarily with Next.js and TypeScript, focused on scalable, efficient solutions.",
    "As an SDE intern at Zelosify I learned from senior developers and helped build a complete end-to-end vendor and contract management system. I care equally about clean, responsive interfaces and robust backend systems.",
    "My path into web development started in my second semester. The real turning point came when I led development of a hackathon website as an organizer, which taught me to build collaboratively. Since then I've led development at GDG on Campus MSIT and Geek Room, organized hackathons from MLH-backed national events to a global one, and mentored teams along the way.",
    "Outside of code you'll usually find me playing chess, even during boring lectures, or recharging with music.",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/namannn04" },
    { label: "LinkedIn", href: "https://linkedin.com/in/namannn04" },
    { label: "X", href: "https://x.com/namannn04" },
    { label: "Instagram", href: "https://instagram.com/namannn04" },
    { label: "Discord", href: "https://discord.com/users/736213483581866053" },
  ],
};

export const stats = [
  { value: "2+", label: "Years building for the web" },
  { value: "2", label: "Developer communities led" },
  { value: "4", label: "Hackathons organized" },
  { value: "7", label: "Projects shipped" },
];

export type Experience = {
  title: string;
  company: string;
  period: string;
  image: string;
  description: string;
  skills: string[];
};

export const experiences: Experience[] = [
  {
    title: "SDE Intern",
    company: "Zelosify",
    period: "Jul 2025 — Sep 2025",
    image: "/experience/zelosify.jpg",
    description:
      "Zelosify simplifies vendor and contract management for large enterprises, from contract creation and approvals to onboarding, workflow tracking and compliance. I built responsive landing pages and role-based dashboards, maintained CI/CD pipelines, implemented secure multi-user authentication with Keycloak, and managed cloud storage on AWS S3.",
    skills: ["Next.js", "TypeScript", "Keycloak", "Node.js", "PostgreSQL", "Prisma", "Docker", "AWS S3", "Postman"],
  },
  {
    title: "Development Head",
    company: "Google Developer Groups on Campus — MSIT",
    period: "2024 — Present",
    image: "/experience/gdg.jpeg",
    description:
      "Drove skill upliftment with regular progress check-ins and growth opportunities. Ran LinkedIn and GitHub profile challenges, assigned hands-on projects to strengthen members' professional presence, and worked closely with the design team to guide developers building the club website.",
    skills: ["Full Stack Development", "Team Leadership", "Project Management", "Technical Mentorship", "Code Review"],
  },
  {
    title: "Development Deputy Head",
    company: "Geek Room",
    period: "2025 — Present",
    image: "/experience/gr.jpg",
    description:
      "Supporting ongoing technical initiatives and collaborating with the team on new projects. I help with team coordination and skill development, and focus on helping members improve their professional profiles.",
    skills: ["Team Collaboration", "Communication", "Problem Solving", "Technical Support", "Community Building"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  video?: string;
  poster?: string;
  href?: string;
  contribution?: string;
  status?: string;
  year?: string;
};

export const featuredProjects: Project[] = [
  {
    title: "SPARK",
    status: "In development",
    description:
      "A platform for exploring and joining communities, events, internships and open-source projects, with a social feed to stay current on tech and events, all in one place.",
    contribution: "Frontend, authentication, backend logic and integration, plus UI design and implementation.",
    tags: ["React", "Node.js", "Express.js", "Firebase", "MongoDB", "Tailwind CSS"],
    video: "/groupProjects/SPARK.mkv",
    poster: "/groupProjects/spark.jpg",
  },
  {
    title: "CareerCompass",
    description:
      "Detailed career guidance powered by curated resources and AI. Explore 500+ careers, with paths, skills, qualifications, counselling and strategies for each.",
    contribution: "Full stack: frontend UI and design, backend logic, authentication, and the admin panel for counsellors and applications.",
    tags: ["React", "Node.js", "Express.js", "Firebase", "Tailwind CSS"],
    video: "/groupProjects/careercompass.mkv",
    poster: "/groupProjects/careercompass.jpg",
    href: "https://careercompass-xi.vercel.app/",
  },
  {
    title: "Bulk Certificate Sender",
    description: "Send personalised certificates to hundreds of recipients at once from a CSV import.",
    contribution: "Designed the complete frontend, including an HTML email-body editor with live preview.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    video: "/groupProjects/certificateSender.mkv",
  },
];

export const soloProjects: Project[] = [
  {
    title: "PicMorph",
    description: "Convert images from one format to another, right in the browser.",
    tags: ["Next.js", "Tailwind CSS"],
    video: "/projects/picmorph.mkv",
    href: "https://picmorph.namandadhich.me/",
  },
  {
    title: "bulkMailer",
    description: "Send custom-styled emails to many recipients at once over Gmail SMTP.",
    tags: ["Next.js", "Node.js", "Express.js", "Gmail SMTP", "Tailwind CSS"],
    video: "/projects/bulkmailer.mkv",
  },
  {
    title: "Portfolio v2",
    description: "My second portfolio, rebuilt with React and Three.js.",
    tags: ["React", "Three.js", "Tailwind CSS"],
    video: "/projects/portfolioReact.mkv",
    href: "https://namanportfoliov2.vercel.app/",
  },
  {
    title: "Portfolio v1",
    description: "Where it started: my first portfolio in plain HTML, CSS and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    video: "/projects/tempport.mkv",
    href: "https://github.com/namannn04/Portfolio-temp",
  },
];

export const skills: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "HTML", "CSS", "SQL"] },
  {
    label: "Frameworks & libraries",
    items: ["React", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Redux", "REST APIs", "Framer Motion", "Mongoose", "Prisma", "shadcn/ui", "JWT", "Material UI", "Three.js"],
  },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"] },
  { label: "Tools & platforms", items: ["Git", "GitHub Actions", "Docker", "AWS", "Vercel", "Netlify", "Render", "Cloudinary", "Postman", "Figma"] },
  { label: "Ways of working", items: ["Problem solving", "Teamwork", "Leadership", "Adaptability"] },
];

export type EventItem = {
  title: string;
  date: string;
  location: string;
  role: string;
  image: string;
  description: string;
};

export const events: EventItem[] = [
  {
    title: "Code Manipal",
    date: "Mar 2025",
    location: "Manipal University, Jaipur",
    role: "Organized & attended",
    image: "/groupProjects/codemanipal.jpg",
    description: "A national-level hackathon where I built scalable web applications and presented solutions to industry experts.",
  },
  {
    title: "Pears Hackathon",
    date: "Mar 2025",
    location: "Online",
    role: "Organized",
    image: "/groupProjects/pears.jpg",
    description: "Worked with a diverse team to ship an innovative solution under tight time constraints, across backend and frontend.",
  },
  {
    title: "Code Kshetra 2.0",
    date: "Feb 2025",
    location: "JIMS, Rohini",
    role: "Organized",
    image: "/groupProjects/ck2.jpg",
    description: "A competitive programming event built around real-world problems. I managed logistics and kept the contest running smoothly.",
  },
  {
    title: "Code Cubicle 3.0",
    date: "Sep 2024",
    location: "Microsoft Office, Gurugram",
    role: "Organized",
    image: "/groupProjects/cc3.jpg",
    description: "A large-scale hybrid coding contest on problem-solving and teamwork. I led planning, question setting and participant engagement.",
  },
];

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
