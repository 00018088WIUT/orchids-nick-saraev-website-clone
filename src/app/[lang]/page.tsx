import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import Footer from "@/components/sections/footer";
import LatestFeed from "@/components/sections/latest-feed";
import AffiliatesSection from "@/components/sections/affiliates-section";
import YouTubeFeed from "@/components/sections/youtube-feed";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AffiliatesSection />
        <LatestFeed />
        <YouTubeFeed />
      </main>
      <Footer />
    </div>
  );
}
