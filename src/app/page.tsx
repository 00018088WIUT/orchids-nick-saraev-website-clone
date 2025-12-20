import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import PopularProducts from "@/components/sections/popular-products";
import LatestFeed from "@/components/sections/latest-feed";
import Footer from "@/components/sections/footer";
import FloatingNav from "@/components/sections/floating-nav";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularProducts />
        <LatestFeed />
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
