import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Faculty from './pages/Faculty';
import Academics from './pages/Academics';
import Placements from './pages/Placements';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/placements" element={<Placements />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
