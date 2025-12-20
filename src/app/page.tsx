import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* Blog section will be added here after Supabase setup */}
      </main>
      <Footer />
    </div>
  );
}
