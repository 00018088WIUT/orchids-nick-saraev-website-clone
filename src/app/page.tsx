import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import Footer from "@/components/sections/footer";
import LatestFeed from "@/components/sections/latest-feed";
import AffiliatesSection from "@/components/sections/affiliates-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AffiliatesSection />
        <LatestFeed />
      </main>
      <Footer />
    </div>
  );
}
