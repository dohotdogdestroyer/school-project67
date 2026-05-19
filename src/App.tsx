import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PCParts from './components/PCParts';
import PCBuilding from './components/PCBuilding';
import Differences from './components/Differences';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <PCParts />
      <PCBuilding />
      <Differences />
      <Footer />
    </div>
  );
}
