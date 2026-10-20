import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StarField from './components/StarField';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Games from './pages/Games';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <StarField />
      <div className="app-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/games" element={<Games />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
