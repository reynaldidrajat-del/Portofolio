export type Locale = "en" | "id";

/** Placeholder images — replace with your real system screenshots.
 *  Put files in portfolio/public/screenshots/ and change src to "/screenshots/xxx.png" */
const P = (seed: string, w = 960, h = 640) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const profile = {
  name: "Reynaldi Drajat Ageng Perwira",
  shortName: "Reynaldi Drajat",
  initials: "RD",
  email: "reynaldidrajat@gmail.com",
  github: "https://github.com/reynaldidrajat-del",
  githubUser: "reynaldidrajat-del",
  linkedin: "https://www.linkedin.com/in/reynaldidrajat",
  location: { en: "Surabaya, Indonesia", id: "Surabaya, Indonesia" },
  avatar: "https://avatars.githubusercontent.com/u/262280626?v=4",
  cv: "/Reynaldi-Drajat-CV.pdf",
};

export const hero = {
  roles: {
    en: ["System Analyst", "Business Analyst", "Solution Architect"],
    id: ["System Analyst", "Business Analyst", "Solution Architect"],
  },
  tagline: {
    en: "I design enterprise systems — and document them visually.",
    id: "Saya merancang sistem enterprise — dan mendokumentasikannya secara visual.",
  },
  heroIntro: {
    en: "Welcome to my visual portfolio. Below: the systems I've built, the people I've worked with, and the path that got me here — told mostly in pictures, because a good interface explains itself.",
    id: "Selamat datang di portofolio visual saya. Di bawah: sistem yang saya bangun, orang-orang yang bekerja bersama saya, dan jalur yang membawa saya ke sini — diceritakan sebagian besar dalam gambar, karena antarmuka yang baik menjelaskan dirinya sendiri.",
  },
  cta: { en: "Explore my work", id: "Lihat karya saya" },
  /** Featured shots for the hero slider */
  slides: [
    { src: P("rd-hero-1"), alt: { en: "Dashboard interface", id: "Tampilan dashboard" } },
    { src: P("rd-hero-2"), alt: { en: "Mobile app screens", id: "Tampilan aplikasi mobile" } },
    { src: P("rd-hero-3"), alt: { en: "Process mapping board", id: "Papan pemetaan proses" } },
    { src: P("rd-hero-4"), alt: { en: "Data analytics view", id: "Tampilan analitik data" } },
    { src: P("rd-hero-5"), alt: { en: "System architecture sketch", id: "Sketsa arsitektur sistem" } },
  ],
};

export const marquee = [
  "SDLC", "BRD", "Solution Architecture", "SAP SD", "HRIS", "LMS",
  "SQL", "Tableau", "Python", "Process Mapping", "Agile", "UAT",
];

export type Project = {
  slug: string;
  title: string;
  tagline: { en: string; id: string };
  tags: string[];
  accent: string;
  year: string;
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "lms",
    title: "Learning Management System",
    tagline: { en: "Enterprise learning platform, end-to-end.", id: "Platform pembelajaran enterprise, end-to-end." },
    tags: ["LMS", "SDLC", "UX"],
    accent: "#2563EB",
    year: "2025",
    images: [P("rd-lms-1"), P("rd-lms-2"), P("rd-lms-3"), P("rd-lms-4")],
  },
  {
    slug: "ekpi",
    title: "E-KPI & HRIS Integration",
    tagline: { en: "Performance monitoring inside HRIS.", id: "Monitoring kinerja terintegrasi HRIS." },
    tags: ["HRIS", "Integration", "KPI"],
    accent: "#E11D48",
    year: "2025",
    images: [P("rd-kpi-1"), P("rd-kpi-2"), P("rd-kpi-3"), P("rd-kpi-4")],
  },
  {
    slug: "caddie",
    title: "Caddie Attendance & Workforce",
    tagline: { en: "Scheduling, attendance, control.", id: "Penjadwalan, kehadiran, kontrol operasional." },
    tags: ["Workforce", "Scheduling"],
    accent: "#F97316",
    year: "2024",
    images: [P("rd-cad-1"), P("rd-cad-2"), P("rd-cad-3"), P("rd-cad-4")],
  },
  {
    slug: "land",
    title: "Land Acquisition & Assets",
    tagline: { en: "From land docs to asset registry.", id: "Dari dokumen lahan ke registri aset." },
    tags: ["Assets", "Mapping"],
    accent: "#65A30D",
    year: "2024",
    images: [P("rd-land-1"), P("rd-land-2"), P("rd-land-3"), P("rd-land-4")],
  },
  {
    slug: "property",
    title: "Property Systems & Portals",
    tagline: { en: "Reliable property ops, daily.", id: "Operasional properti yang andal." },
    tags: ["Property", "Support"],
    accent: "#8B5CF6",
    year: "2024",
    images: [P("rd-prop-1"), P("rd-prop-2"), P("rd-prop-3"), P("rd-prop-4")],
  },
  {
    slug: "eproc",
    title: "E-Procurement",
    tagline: { en: "Go + React procurement platform.", id: "Platform pengadaan dengan Go + React." },
    tags: ["Go", "React", "PostgreSQL"],
    accent: "#06B6D4",
    year: "2026",
    images: [P("rd-eproc-1"), P("rd-eproc-2"), P("rd-eproc-3"), P("rd-eproc-4")],
  },
];

export const about = {
  heading: { en: "About", id: "Tentang" },
  intro: {
    en: "The person behind the systems — a short story of how I turn business problems into working software.",
    id: "Orang di balik sistem tersebut — kisah singkat bagaimana saya mengubah masalah bisnis menjadi perangkat lunak yang bekerja.",
  },
  title: { en: "Analyst who ships systems.", id: "Analis yang melahirkan sistem." },
  lines: {
    en: [
      "Assistant Manager & Business Analyst with 3+ years delivering enterprise systems — property, HR, learning, workforce, land & assets.",
      "From requirements to deployment: process maps, BRDs, solution design, testing, support.",
    ],
    id: [
      "Assistant Manager & Business Analyst dengan 3+ tahun menghadirkan sistem enterprise — properti, HR, pembelajaran, workforce, lahan & aset.",
      "Dari kebutuhan hingga deployment: peta proses, BRD, desain solusi, testing, support.",
    ],
  },
  chips: ["ITS Alumnus", "GPA 3.58", "EF SET C2", "Jakarta → Surabaya"],
};

export const experiences = [
  { company: "PT. Modernland Realty, Tbk", role: { en: "Assistant Manager", id: "Assistant Manager" }, period: "2026—", current: true },
  { company: "PT. Modernland Realty, Tbk", role: { en: "Business Analyst (Management Trainee)", id: "Business Analyst (Management Trainee)" }, period: "2023—2026", current: false },
  { company: "Wilmar Consultancy Services", role: { en: "Business Process Analyst · SAP SD", id: "Business Process Analyst · SAP SD" }, period: "2023", current: false },
  { company: "CECT, Trisakti University", role: { en: "Data Analyst", id: "Data Analyst" }, period: "2021", current: false },
];

export const education = {
  school: "Institut Teknologi Sepuluh Nopember (ITS)",
  degree: { en: "B. Information Systems", id: "S. Sistem Informasi" },
  period: "2018—2022",
  detail: { en: "Thesis: FP-Growth for MSME promotion strategy", id: "Skripsi: FP-Growth untuk strategi promosi UMKM" },
};

export const certifications = [
  "Google Data Analytics — Coursera",
  "SQL Advanced",
  "EF SET C2",
  "ISO 27001 Basics",
  "SAP S/4HANA Intro",
];

export const certificationsShort = [
  "Google Data Analytics — Coursera",
  "SQL Advanced",
  "EF SET C2",
  "ISO 27001 Basics",
];

export const contact = {
  heading: { en: "Let's build something.", id: "Mari membangun sesuatu." },
  intro: {
    en: "If you're hiring, have a project in mind, or just want to talk systems and design — my inbox is always open. I usually reply within a day.",
    id: "Jika Anda sedang merekrut, punya proyek dalam pikiran, atau hanya ingin berdiskusi soal sistem dan desain — inbox saya selalu terbuka. Saya biasanya membalas dalam sehari.",
  },
  blurb: { en: "Open to new opportunities & collaboration.", id: "Terbuka untuk peluang baru & kolaborasi." },
  cta: { en: "Say hello", id: "Sapa saya" },
};

export const nav = {
  work: { en: "Work", id: "Karya" },
  about: { en: "About", id: "Tentang" },
  path: { en: "Path", id: "Jalur" },
  contact: { en: "Contact", id: "Kontak" },
};

export const ui = {
  workLabel: { en: "Selected work", id: "Karya pilihan" },
  workIntro: {
    en: "Enterprise systems I've led from first workshop to go-live. Each project is shown through its interface — slide through the screenshots to see how the story of requirements, design, and delivery turned into working software.",
    id: "Sistem enterprise yang saya pimpin dari workshop pertama hingga go-live. Setiap proyek ditampilkan melalui antarmukanya — geser tangkapan layar untuk melihat bagaimana kebutuhan, desain, dan deliveri berubah menjadi perangkat lunak yang bekerja.",
  },
  workNote: { en: "Slide through each project →", id: "Geser tiap proyek →" },
  dragHint: { en: "Scroll / swipe", id: "Gulir / geser" },
  pathLabel: { en: "The path so far", id: "Jalur sejauh ini" },
  pathIntro: {
    en: "Three years across consulting and enterprise IT — from SAP blueprints and data dashboards to leading application lifecycles at a public property company. Education and certifications that back it up.",
    id: "Tiga tahun di konsultansi dan IT enterprise — dari blueprint SAP dan dashboard data hingga memimpin siklus aplikasi di perusahaan properti publik. Pendidikan dan sertifikasi yang menopangnya.",
  },
  aboutIntro: {
    en: "A closer look at who I am, what I value in building systems, and the principles I bring to every project.",
    id: "Pengenalan lebih dekat tentang siapa saya, apa yang saya utamakan dalam membangun sistem, dan prinsip yang saya bawa ke setiap proyek.",
  },
  educationLabel: { en: "Education", id: "Pendidikan" },
  certsLabel: { en: "Certifications", id: "Sertifikasi" },
  scroll: { en: "scroll", id: "gulir" },
  prev: { en: "Previous image", id: "Gambar sebelumnya" },
  next: { en: "Next image", id: "Gambar berikutnya" },
  goto: { en: "Go to image", id: "Ke gambar" },
};
