export const PROFILE = {
    name: "Chornael Damar Kesuma",
    nickname: "Damar",
    role: "Web Developer",
    subRole: "& Go Enthusiast",
    tagline: "Crafting polished, high-performance web experiences with a focus on interaction design and scalability.",
    about: {
        intro: "Hai! Saya Damar — mahasiswa Informatika semester 8 di Universitas Sanata Dharma dengan pendalaman jaringan komputer. Di luar kurikulum, saya memiliki passion mendalam di ekosistem JavaScript dan web development. Selama lebih dari 1.5 tahun terakhir, saya terus mengasah kemampuan membangun arsitektur frontend yang scalable, sambil memperluas keahlian ke backend menggunakan Golang.",
        philosophy: "Saya percaya bahwa produk digital yang hebat lahir dari perpaduan performa, estetika, dan pengalaman pengguna. Dari memimpin departemen humas di BEM hingga berkompetisi di KRPAI tingkat nasional, saya terbiasa bekerja dalam tekanan dan berkolaborasi lintas tim. Kode yang saya tulis bukan sekadar fungsional — tapi dirancang untuk maintainable dan efisien.",
    },
    socials: {
        github: "https://github.com/Jikoyuo",
        linkedin: "https://www.linkedin.com/in/chornael-damar-kesuma-7a795429a/",
        email: "mailto:chornaeld@gmail.com",
    },
    education: [
        {
            school: "Universitas Sanata Dharma",
            degree: "S1 Informatika — Pendalaman Jaringan",
            year: "2022 - 2026 (Expected)",
            description: "Mendalami jaringan komputer dan software engineering. Aktif di komunitas teknologi kampus dan mengikuti berbagai kompetisi nasional.",
        }
    ],
    experience: [
        {
            company: "PT. Digital Nusantara Adisolusi", // ganti dengan nama perusahaan
            role: "Frontend Engineer",
            period: "2024 - Present",
            description: "Mengembangkan aplikasi berbasis web dengan fokus utama pada arsitektur frontend yang scalable dan performa yang tinggi menggunakan lingkungan JavaScript ",
            type: "work" as const,
        },
    ],
    organizations: [
        {
            org: "BEMFST",
            role: "Ketua Departemen Hubungan Masyarakat",
            period: "2023 - 2024",
            description: "Memimpin departemen humas, mengelola relasi dengan pihak eksternal kampus, dan mengkoordinasi publikasi kegiatan BEM.",
        },
        {
            org: "TERABYTE SASI",
            role: "Anggota Divisi IT Jurnalistik",
            period: "2019 - 2022",
            description: "Bertanggung jawab atas pengembangan dan pemeliharaan website serta platform digital organisasi jurnalistik.",
        },
    ],
    volunteering: [
        {
            event: "TechnoFest 6.0",
            role: "Steering Committee",
            year: "2024",
            description: "Menjadi bagian dari komite pengarah dalam event teknologi berskala kampus, mengawasi pelaksanaan acara secara keseluruhan.",
        },
    ],
    competitions: [
        {
            name: "KRPAI (Kontes Robot Pemadam Api Indonesia) - SAR",
            organizer: "KEMENDIKBUDRISTEK",
            year: "2023 & 2024",
            description: "Berpartisipasi dalam kompetisi robotika tingkat nasional kategori Search and Rescue.",
        },
    ],
    skills: {
        frontend: {
            level: "Intermediate",
            items: ["React.js", "Next.js (TypeScript)", "Material UI", "Tailwind CSS", "Redux", "Axios", "Framer Motion"],
        },
        backend: {
            level: "Beginner",
            items: ["Golang (Fiber, Gin)", "Nest.js"],
        },
        database: {
            level: "Tools",
            items: ["PostgreSQL", "Git", "Docker"],
        },
    }
};
