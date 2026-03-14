import VideoGenerator from "@/components/video/VideoGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Video Textable
        </h1>
        <VideoGenerator />
      </main>
    </div>
  );
}
