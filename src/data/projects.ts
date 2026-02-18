export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'Office' | 'Personal' | 'Campus';
    stack: string[];
    images: string[];
    links?: {
        demo?: string;
        github?: string;
    };
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "JiChat - Realtime Social Media",
        description: "Aplikasi media sosial dengan fitur chat realtime, notifikasi, dan feed update. Dibangun untuk menangani koneksi konkuren secara efisien menggunakan goroutine Go dan WebSocket.",
        type: "Personal",
        stack: ["Go", "Next.js", "MongoDB", "WebSocket", "Redis", "TailwindCSS"],
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
        links: {
            github: "https://github.com",
            demo: "https://demo.com"
        }
    },
    {
        id: 2,
        title: "School Auditing System",
        description: "Platform audit enterprise untuk sekolah-sekolah Katolik di Indonesia. Mentransformasi dataset Excel yang kompleks menjadi dashboard analitik interaktif untuk mendukung pengambilan keputusan berbasis data bagi administrator.",
        type: "Campus",
        stack: ["Go", "React", "ExcelJS", "PostgreSQL"],
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
        links: {
            demo: "https://auditing-system.com"
        }
    },
    // {
    //     id: 3,
    //     title: "Smart POS System",
    //     description: "Sistem Point of Sale modern dengan fitur face recognition untuk absensi karyawan dan prediksi stok berbasis AI. Dirancang untuk menyederhanakan operasional harian coffee shop.",
    //     type: "Personal",
    //     stack: ["Next.js", "Tailwind", "FaceAPI.js", "Supabase"],
    //     images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    //     links: {
    //         github: "https://github.com"
    //     }
    // },
    {
        id: 3,
        title: "Sistem Satpam PT. Kanisius",
        description: "Sistem manajemen keamanan untuk PT. Kanisius Yogyakarta. Mengelola pencatatan dan perijinan pegawai keluar dan masuk, serta mencatat berbagai catatan kejadian, proyek diberikan oleh kampus pada beberapa grup mahasiswa terpilih.",
        type: "Campus",
        stack: ["PHP 8.0", "CodeIgniter 3", "MySQL", "Bootstrap"],
        images: ["/Kanisius/1.jpeg", "/Kanisius/login.jpeg", "/Kanisius/2.jpeg", "/Kanisius/3.jpeg", "/Kanisius/4.jpeg", "/Kanisius/5.jpeg", "/Kanisius/6.jpeg"],
    },
    {
        id: 4,
        title: "Promptory - Inventory & POS",
        description: "Sistem pencatatan barang, kasir, manajemen shifting, dan absensi karyawan dalam satu platform terintegrasi. Dibangun full-stack dengan backend realtime menggunakan WebSocket untuk sinkronisasi data antar perangkat secara instan.",
        type: "Personal",
        stack: ["Go (Fiber)", "WebSocket", "PostgreSQL", "React (TS)", "Tailwind", "Axios"],
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
        links: {
            github: "https://github.com"
        }
    },
    {
        id: 5,
        title: "Hospital Management System",
        description: "Sistem informasi rumah sakit swasta di Jakarta yang mencakup manajemen menu, user management, penjadwalan dokter, reporting, reservasi, dan antrian pasien. Dibangun dengan arsitektur yang scalable dan mendukung role-based access control.",
        type: "Office",
        stack: ["Next.js (TS)", "Material UI", "Redux", "Axios", "REST API"],
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    },
    {
        id: 6,
        title: "ORQLCI - RL Agent (Skripsi)",
        description: "Skripsi penelitian tentang Opportunistic Routing with Q-Learning and Contextual Information. Mengembangkan agen Reinforcement Learning Q-Learning yang belajar mandiri dengan dibekali informasi konteks berupa PROPHET, Buffer Awareness, dan Energy Awareness untuk optimasi routing di jaringan DTN.",
        type: "Personal",
        stack: ["Java", "ONE Simulator", "Q-Learning", "PROPHET"],
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    },
    {
        id: 7,
        title: "SPPK - Location Recommender",
        description: "Sistem Pendukung Pengambilan Keputusan yang memberikan rekomendasi lokasi toko berdasarkan pilihan user. Menampilkan peta interaktif, melakukan analisis multi-kriteria, dan memberikan peringkat lokasi yang paling direkomendasikan.",
        type: "Campus",
        stack: ["Next.js (TS)", "Material UI", "OpenStreetMap", "Leaflet"],
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    },
    {
        id: 8,
        title: "Hospital Demo App (v1)",
        description: "Versi awal aplikasi demo rumah sakit yang menyediakan fitur reservasi pasien, role-based access control, user management, dan penjadwalan dokter. Menjadi fondasi pengembangan sistem rumah sakit yang lebih komprehensif di kemudian hari.",
        type: "Office",
        stack: ["React (TS)", "Material UI", "Axios", "REST API"],
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    },
    {
        id: 9,
        title: "BeTe - Beli Ticket Event",
        description: "Platform ticketing online untuk berbagai event. Menyediakan fitur pendaftaran event, promosi, dan pembelian tiket secara digital. Memungkinkan penyelenggara mendaftarkan dan mempromosikan event mereka, sementara pembeli dapat mencari dan membeli tiket langsung melalui platform.",
        type: "Office",
        stack: ["React.js", "Tailwind CSS", "Axios", "REST API"],
        images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    },
];
