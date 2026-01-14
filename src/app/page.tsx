import Footer from '@/shared/ui/footer';
import Header from '@/shared/ui/header';
import HomeFeedSection from '@/widget/home-feed';

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">
        <HomeFeedSection />
      </main>
      <Footer />
    </div>
  );
}
