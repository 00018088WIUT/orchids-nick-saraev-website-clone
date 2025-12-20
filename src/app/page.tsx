import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import Footer from "@/components/sections/footer";
import LatestFeed from "@/components/sections/latest-feed";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <LatestFeed />
      </main>
      <Footer />
    </div>
  );
}
