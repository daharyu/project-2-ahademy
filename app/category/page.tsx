import FooterSection from '@/components/footer';
import HeaderSection from '@/components/header';
import CategoryUi from './uiPage';

const CategoryPage = () => {
  return (
    <>
      <HeaderSection isHomePage={false} />
      <CategoryUi />
      <FooterSection />
    </>
  );
};

export default CategoryPage;
