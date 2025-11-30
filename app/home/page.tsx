import HeaderSection from '@/components/header';
import CategorySection from './category';
import HeroSection from './hero';
import RecommendSection from './recomend';
import FooterSection from '@/components/footer';

const HomePage = () => {
  return (
    <>
      <HeaderSection />
      <HeroSection />
      <CategorySection />
      <RecommendSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
