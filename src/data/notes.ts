export interface Note {
  slug: string;
  title: string;
  date: string;     // YYYY-MM-DD
  readingTime: string;
  excerpt: string;
  /** Each item becomes a paragraph. Plain text only for now. */
  content: string[];
  draft?: boolean;
}

export const NOTES: Note[] = [
  {
    slug: "why-go-for-realtime-systems",
    title: "Why I reach for Go when real-time matters",
    date: "2026-04-12",
    readingTime: "5 min",
    excerpt:
      "Notes from building JiChat — what goroutines actually buy you, and where channels stop being clever.",
    content: [
      "When I first picked up Go, it was for a personal project that needed websockets and didn't want to feel slow. Node would have worked — I'd written JS backends for years — but I kept reading about the goroutine model and was curious.",
      "What surprised me wasn't speed. It was the calmness of the code. Concurrent code in Go doesn't feel concurrent until you look at it twice. You write what you mean. The compiler complains when you don't.",
      "Channels are the thing people market, but in production they often hide bugs. I now reach for them less and for mutexes plus context cancellation more. Boring is good. Boring is debuggable.",
      "I'll write more about specific patterns from JiChat in a follow-up — buffer management, fan-out for broadcasts, and how I handled disconnects without leaking goroutines.",
    ],
  },
  {
    slug: "on-craft-and-shipping",
    title: "On craft, and on shipping anyway",
    date: "2026-03-02",
    readingTime: "3 min",
    excerpt:
      "A note to my younger self about the tension between making things good and getting them out the door.",
    content: [
      "Every project I've ever done has had a moment where the part of me that wants the work to be excellent fights the part of me that wants to ship. Both are right.",
      "The trick I've learned is to write down the things that bother me, ship the version that works, and come back. Most of the time, half the items on the list don't matter anymore once real users have touched it.",
      "The other half, you revisit on Tuesday afternoon when you have an hour. That's how the work gets quietly better over months.",
    ],
  },
];

export function getNoteBySlug(slug: string) {
  return NOTES.find((n) => n.slug === slug && !n.draft);
}

export function listPublishedNotes() {
  return NOTES.filter((n) => !n.draft).sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}
