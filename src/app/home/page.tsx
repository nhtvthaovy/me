import HeroSection from '../components/HeroSection';
import ProjectSection from '../components/ProjectSection';

const Home = () => {
  return (
    <main className="bg-[#FEFFF0] flex min-h-screen flex-col items-center">
      <HeroSection />
      <ProjectSection />
      
    </main>
  );
};

export default Home;
