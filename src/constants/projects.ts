export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'Office' | 'Personal';
    stack: string[];
    images: string[];
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "JiChat - Realtime Social Media",
        description: "Aplikasi media sosial dengan fitur chat realtime menggunakan WebSocket. Dibangun dengan Go (Golang) sebagai backend dan Next.js sebagai frontend.",
        type: "Personal",
        stack: ["Go", "Next.js", "MongoDB", "WebSocket"],
        images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
        id: 2,
        title: "Auditing System Sekolah Katolik",
        description: "Sistem pengolahan data dan audit kriteria sekolah Katolik se-Indonesia. Memproses ribuan data dari Excel menjadi dashboard yang interaktif.",
        type: "Office",
        stack: ["Go", "React", "ExcelJS"],
        images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    },
    {
        id: 3,
        title: "Coffee Shop POS System",
        description: "Point of Sale yang mencakup fitur absensi berbasis Face Detection dan manajemen stok dinamis.",
        type: "Personal",
        stack: ["Next.js", "Tailwind", "FaceAPI"],
        images: ["/api/placeholder/600/400", "/api/placeholder/600/400"]
    }
];