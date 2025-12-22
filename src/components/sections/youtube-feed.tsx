import React from "react";
import { useLanguage } from "@/components/language-provider";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";

interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
}

async function getLatestVideos(channelId: string): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
    const text = await response.text();

    const videoEntries = text.split("<entry>").slice(1);
    return videoEntries.slice(0, 3).map((entry) => {
      const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const linkMatch = entry.match(/<link rel="alternate" href="(.*?)"/);
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);

      const videoId = idMatch ? idMatch[1] : "";
      return {
        id: videoId,
        title: titleMatch ? titleMatch[1] : "YouTube Video",
        link: linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        published: publishedMatch ? publishedMatch[1] : new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

export default async function YouTubeFeed() {
  const channelId = "UCWmZTgDJmeGwpy2X5gS24zQ";
  const videos = await getLatestVideos(channelId);

  if (videos.length === 0) return null;

  return <YouTubeContent videos={videos} />;
}

// Client component part for translations
function YouTubeContent({ videos }: { videos: YouTubeVideo[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-black/5 dark:bg-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 uppercase">
              {t("youtube.title")}
            </h2>
            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
          </div>
          <a
            href="https://www.youtube.com/@ziyodulla_abdullayev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <FaYoutube className="text-xl" />
            {t("youtube.more")}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-300">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                    <FaYoutube size={24} />
                  </div>
                </div>
              </div>
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors text-lg leading-snug">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {new Date(video.published).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
