export type Locale = "en" | "id";

/** Placeholder images — replace with your real system screenshots.
 *  Put files in portfolio/public/screenshots/ and change src to "/screenshots/xxx.png" */
const P = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/** Curated Unsplash photos (verified live) — thematically matched per project.
 *  Replace with real system screenshots in /public/screenshots when ready. */
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&fit=crop&auto=format`;

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
    en: "I design enterprise systems and document them visually.",
    id: "Saya merancang sistem enterprise dan mendokumentasikannya secara visual.",
  },
  heroIntro: {
    en: "Most of this site is pictures. The screenshots come from systems I built for real operations: scheduling, procurement, HR, land, and property. I added a few words only where the pictures need context.",
    id: "Sebagian besar situs ini berisi gambar. Tangkapan layarnya berasal dari sistem yang saya bangun untuk operasional nyata: penjadwalan, pengadaan, HR, lahan, dan properti. Saya menambahkan beberapa kata hanya sebagai konteks.",
  },
  cta: { en: "Explore my work", id: "Lihat karya saya" },
  /** Featured shots for the hero slider — sized above the largest stage width so they never upscale */
  slides: [
    { src: U("photo-1498050108023-c5249f4df085", 1600), alt: { en: "Writing code on a laptop", id: "Menulis kode di laptop" } },
    { src: U("photo-1522071820081-009f0129c71c", 1600), alt: { en: "Team working together", id: "Tim bekerja bersama" } },
    { src: U("photo-1551288049-bebda4e38f71", 1600), alt: { en: "Analytics dashboard", id: "Dashboard analitik" } },
    { src: U("photo-1497366216548-37526070297c", 1600), alt: { en: "Modern office workspace", id: "Ruang kerja kantor modern" } },
    { src: U("photo-1516321318423-f06f85e504b3", 1600), alt: { en: "Planning with a laptop", id: "Perencanaan dengan laptop" } },
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
  description: { en: string; id: string };
  tags: string[];
  accent: string;
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "lms",
    title: "Learning Management System",
    tagline: { en: "Enterprise learning platform, end-to-end.", id: "Platform pembelajaran enterprise, end-to-end." },
    description: {
      en: "A company-wide learning platform with course catalogs, progress tracking, and certification. Requirements came from HR and department heads; I turned them into module flows and saw the build through to rollout.",
      id: "Platform pembelajaran untuk seluruh perusahaan dengan katalog kursus, pemantauan progres, dan sertifikasi. Kebutuhan datang dari HR dan kepala departemen; saya mengubahnya menjadi alur modul dan mendampingi pengembangan hingga peluncuran.",
    },
    tags: ["LMS", "SDLC", "UX"],
    accent: "#2563EB",
    images: [U("photo-1501504905252-473c47e087f8"), U("photo-1522202176988-66273c2fd55f"), U("photo-1516321318423-f06f85e504b3"), U("photo-1551288049-bebda4e38f71")],
  },
  {
    slug: "ekpi",
    title: "E-KPI & HRIS Integration",
    tagline: { en: "Performance monitoring inside HRIS.", id: "Monitoring kinerja terintegrasi HRIS." },
    description: {
      en: "Employee KPIs used to live in scattered spreadsheets. Now targets, reviews, and dashboards sit inside the HRIS. I mapped the data model and designed the review workflow, then coordinated integration testing.",
      id: "Dulu KPI karyawan tersebar di berbagai spreadsheet. Kini target, review, dan dashboard ada di dalam HRIS. Saya memetakan model data dan merancang alur review, lalu mengoordinasikan integration testing.",
    },
    tags: ["HRIS", "Integration", "KPI"],
    accent: "#E11D48",
    images: [U("photo-1551288049-bebda4e38f71"), U("photo-1460925895917-afdab827c52f"), U("photo-1543286386-713bdd548da4"), U("photo-1551288049-bebda4e38f71")],
  },
  {
    slug: "caddie",
    title: "Caddie Attendance & Workforce",
    tagline: { en: "Scheduling, attendance, control.", id: "Penjadwalan, kehadiran, kontrol operasional." },
    description: {
      en: "Field crews check in with GPS-verified attendance, and supervisors build shift schedules against actual coverage. I ran the requirements workshops and wrote the BRD, then stayed on through UAT and go-live.",
      id: "Pekerja lapangan melakukan check-in dengan kehadiran terverifikasi GPS, dan supervisor menyusun jadwal shift sesuai kebutuhan aktual. Saya menjalankan workshop kebutuhan dan menyusun BRD, lalu mendampingi hingga UAT dan go-live.",
    },
    tags: ["Workforce", "Scheduling"],
    accent: "#F97316",
    images: [U("photo-1504328345606-18bbc8c9d7d1"), U("photo-1581091226825-a6a2a5aee158"), U("photo-1521737711867-e3b97375f902"), U("photo-1522202176988-66273c2fd55f")],
  },
  {
    slug: "land",
    title: "Land Acquisition & Assets",
    tagline: { en: "From land docs to asset registry.", id: "Dari dokumen lahan ke registri aset." },
    description: {
      en: "Stacks of land certificates and permits became a searchable, auditable registry. I designed the document flow with the legal team; the asset data structure grew out of those conversations.",
      id: "Tumpukan sertifikat dan izin lahan menjadi registri digital yang mudah dicari dan bisa diaudit. Saya merancang alur dokumen bersama tim legal; struktur data aset tumbuh dari diskusi-diskusi tersebut.",
    },
    tags: ["Assets", "Mapping"],
    accent: "#65A30D",
    images: [U("photo-1500382017468-9049fed747ef"), U("photo-1625246333195-78d9c38ad449"), U("photo-1524661135-423995f22d0b"), U("photo-1500382017468-9049fed747ef")],
  },
  {
    slug: "property",
    title: "Property Systems & Portals",
    tagline: { en: "Reliable property ops, daily.", id: "Operasional properti yang andal." },
    description: {
      en: "Tenant portals, work orders, and reporting for a public property company. My part is keeping the lifecycle moving: analysis, releases, and day-to-day support across business units.",
      id: "Portal tenant, work order, dan pelaporan untuk perusahaan properti publik. Tugas saya menjaga siklusnya tetap berjalan: analisis, rilis, dan support harian lintas unit bisnis.",
    },
    tags: ["Property", "Support"],
    accent: "#8B5CF6",
    images: [U("photo-1486406146926-c627a92ad1ab"), U("photo-1545324418-cc1a3fa10c00"), U("photo-1560518883-ce09059eeffa"), U("photo-1486406146926-c627a92ad1ab")],
  },
  {
    slug: "eproc",
    title: "E-Procurement",
    tagline: { en: "Go + React procurement platform.", id: "Platform pengadaan dengan Go + React." },
    description: {
      en: "A procurement platform in Go and React, with vendors, bidding, and approval chains that leave a full audit trail. The API contract and process flows are documented in the repo's OpenAPI spec.",
      id: "Platform pengadaan berbasis Go dan React, dengan vendor, bidding, dan rantai approval yang meninggalkan jejak audit lengkap. Kontrak API dan alur proses terdokumentasi di OpenAPI spec pada repo.",
    },
    tags: ["Go", "React", "PostgreSQL"],
    accent: "#06B6D4",
    images: [U("photo-1553413077-190dd305871c"), U("photo-1586528116311-ad8dd3c8310d"), U("photo-1555066931-4365d14bab8c"), U("photo-1553413077-190dd305871c")],
  },
];

export const about = {
  heading: { en: "About", id: "Tentang" },
  intro: {
    en: "The person behind the systems: how I turn business problems into working software.",
    id: "Orang di balik sistem tersebut: bagaimana saya mengubah masalah bisnis menjadi perangkat lunak yang bekerja.",
  },
  title: { en: "Analyst who ships systems.", id: "Analis yang melahirkan sistem." },
  lines: {
    en: [
      "Assistant Manager & Business Analyst with 3+ years delivering enterprise systems: property, HR, learning, workforce, land & assets.",
      "From requirements to deployment: process maps, BRDs, solution design, testing, support.",
    ],
    id: [
      "Assistant Manager & Business Analyst dengan 3+ tahun menghadirkan sistem enterprise: properti, HR, pembelajaran, workforce, lahan & aset.",
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
    en: "If you're hiring, or have a project in mind, or just want to talk systems, email me. I usually reply within a day.",
    id: "Jika Anda sedang merekrut, punya proyek, atau hanya ingin berdiskusi soal sistem, kirim email saja. Saya biasanya membalas dalam sehari.",
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
    en: "Six systems I led from first workshop to go-live. Slide through each project's screenshots to see how the requirements turned into working software.",
    id: "Enam sistem yang saya pimpin dari workshop pertama hingga go-live. Geser tangkapan layar setiap proyek untuk melihat bagaimana kebutuhan berubah menjadi perangkat lunak yang bekerja.",
  },
  workNote: { en: "Slide through each project →", id: "Geser tiap proyek →" },
  dragHint: { en: "Scroll / swipe", id: "Gulir / geser" },
  pathLabel: { en: "The path so far", id: "Jalur sejauh ini" },
  pathIntro: {
    en: "Three years across consulting and enterprise IT, from SAP blueprints and data dashboards to leading application lifecycles at a public property company. My degree and certifications are listed here too.",
    id: "Tiga tahun di konsultansi dan IT enterprise, dari blueprint SAP dan dashboard data hingga memimpin siklus aplikasi di perusahaan properti publik. Gelar dan sertifikasi saya tercantum di sini juga.",
  },
  aboutIntro: {
    en: "A closer look at who I am and what I care about when building systems.",
    id: "Pengenalan lebih dekat tentang siapa saya dan apa yang saya utamakan dalam membangun sistem.",
  },
  educationLabel: { en: "Education", id: "Pendidikan" },
  certsLabel: { en: "Certifications", id: "Sertifikasi" },
  scroll: { en: "scroll", id: "gulir" },
  prev: { en: "Previous image", id: "Gambar sebelumnya" },
  next: { en: "Next image", id: "Gambar berikutnya" },
  goto: { en: "Go to image", id: "Ke gambar" },
};
