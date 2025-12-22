import React from "react";
import YouTubeContent from "./youtube-content";
import { translations, Language } from "@/lib/translations";

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
    
    if (!response.ok) {
        throw new Error(`Failed to fetch YouTube feed: ${response.statusText}`);
    }

    const text = await response.text();

    const videoEntries = text.split("<entry>").slice(1);
    // User requested one video is enough
    return videoEntries.slice(0, 1).map((entry) => {
      const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const linkMatch = entry.match(/<link rel="alternate" href="(.*?)"/);
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);

      const videoId = idMatch ? idMatch[1] : "";
      return {
        id: videoId,
        title: titleMatch ? titleMatch[1] : "YouTube Video",
        link: linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        published: publishedMatch ? publishedMatch[1] : new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

export default async function YouTubeFeed({ lang = "en" }: { lang: string }) {
  const channelId = "UCWmZTgDJmeGwpy2X5gS24zQ";
  const videos = await getLatestVideos(channelId);

  if (videos.length === 0) return null;

  const currentTranslations = translations[lang as "uz" | "en"] || translations.en;

  return (
    <YouTubeContent 
        videos={videos} 
        title={currentTranslations["youtube.title"]}
        moreText={currentTranslations["youtube.more"]}
    />
  );
}
