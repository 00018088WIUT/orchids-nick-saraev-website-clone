import React from 'react';
import { Youtube, ExternalLink } from 'lucide-react';

interface YoutubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
}

async function getYoutubeVideos(channelId: string) {
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) return [];
    
    const xml = await response.text();
    
    // Simple regex parsing for atom feed entries
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
    
    return entries.slice(0, 3).map(entry => {
      // Decode XML entities like &amp; to &
      const decodeHtml = (html: string) => {
        return html
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
      };

      const title = entry.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const link = entry.match(/<link rel="alternate" href="(.*?)"\/>/)?.[1] || '';
      const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] || '';
      const published = entry.match(/<published>(.*?)<\/published>/)?.[1] || '';
      
      return {
        id: videoId,
        title: decodeHtml(title),
        link,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        published
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

export default async function YoutubeFeed({ lang, t }: { lang: string, t: (key: string) => string }) {
  const channelId = 'UCWmZTgDJmeGwpy2X5gS24zQ';
  const videos = await getYoutubeVideos(channelId);

  if (videos.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 mb-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="border-b border-border mb-8 flex justify-between items-end">
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.05em] text-muted-foreground pb-2.5">
            {t("youtube.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4"
            >
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted relative shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to hqdefault if maxresdefault doesn't exist
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <Youtube className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 px-1">
                <h3 className="text-[17px] font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <span className="text-[13px] text-muted-foreground font-medium">
                  {new Date(video.published).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:justify-start">
           <a 
            href={`https://www.youtube.com/channel/${channelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-muted/50"
          >
            <Youtube size={16} className="text-red-600" />
            {t("youtube.more")}
            <ExternalLink size={14} className="opacity-50" />
          </a>
        </div>
      </div>
    </section>
  );
}
