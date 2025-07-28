import HeroSection from '../components/HeroSection';
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <main className="bg-[#FEFFF0] flex min-h-screen flex-col items-center">
      <NavBar />
      <HeroSection />
    </main>
  );
};

export default Home;
