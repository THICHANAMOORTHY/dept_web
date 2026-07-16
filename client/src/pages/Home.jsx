import { useEffect, useState } from 'react';
import { ArrowRight, Award, BookOpen, Users, Calendar, Briefcase, Cpu } from 'lucide-react';
import { getNews } from '../services/api';
import './Home.css';
import { Link } from 'react-router-dom';
import hodImg from '../assets/WhatsApp Image 2026-07-14 at 9.44.25 PM.jpeg';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await getNews();
        setNews(data.slice(0, 3)); // Get top 3 news items
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to mock data so UI still works without backend/MongoDB
        setNews([
          {
            _id: 'mock0',
            title: "5-Day Online FDP on AI-Based Signal Processing – Speech, Image and Wireless Data Intelligence",
            content: "The Department of Electronics and Communication Engineering, EASA College of Engineering and Technology (Coimbatore), organized a 5-Day Online Faculty Development Programme (FDP) on \"AI-Based Signal Processing – Speech, Image and Wireless Data Intelligence,\" commencing 18 December 2025.\n\n[Add: resource persons/speakers, registration/participation details, and target audience — e.g. faculty/research scholars/students — once available]",
            type: "announcement",
            date: new Date("2025-12-18"),
            shortDescription: "A 5-day online Faculty Development Program covering AI-based signal processing applications in speech, image, and wireless data intelligence, organized by the ECE Department, EASA College of Engineering and Technology, Coimbatore."
          },
          {
            _id: 'mock1',
            title: "Important Update – GTT Foundation × Accenture Advanced EV Training Program",
            content: "GTT Foundation – Accenture Advanced EV CSR Training Program begins 15 July 2026, conducted in two phases at the college campus and Chennai.",
            type: "news",
            date: new Date("2026-07-14"),
            shortDescription: "GTT Foundation – Accenture Advanced EV CSR Training Program begins 15 July 2026, conducted in two phases at the college campus and Chennai."
          },
          {
            _id: 'mock2',
            title: "NBA Accreditation Renewed",
            content: "The B.E. ECE program has been accredited by NBA for another 3 years.",
            type: "news",
            date: new Date()
          },
          {
            _id: 'mock3',
            title: "International Conference on VLSI",
            content: "Call for papers is now open for ICVLSI 2026. Submit your abstracts by August.",
            type: "announcement",
            date: new Date()
          }
        ]);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title" style={{ fontWeight: 600, letterSpacing: '2px', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <span style={{ fontSize: '0.5em', display: 'block', marginBottom: '10px', letterSpacing: '4px', fontWeight: 500 }}>WELCOME TO</span>
            EASA COLLEGE OF ENGINEERING <br />
            AND TECHNOLOGY <br />
            <span style={{ fontSize: '0.45em', display: 'block', marginTop: '10px', fontWeight: 500 }}>(AUTONOMOUS)</span>
          </h1>
          <div className="hero-actions">
            <Link to="/academics" className="btn btn-primary">
              Explore Programs <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Discover More
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">NBA</span>
              <span className="stat-label">Accredited</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Placement Asst.</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Faculty Members</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ECE Section (New Style) */}
      <section className="why-choose-section container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <div className="section-header" style={{ marginBottom: '3rem', justifyContent: 'center' }}>
          <h2>Why Choose ECE at <span className="gradient-text">EASA</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Card 1 */}
          <div className="card glass animate-fade-in delay-100" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem' }}>
            <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={36} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Autonomous Curriculum</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>With industry-aligned electives ensuring you learn the latest technologies.</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="card glass animate-fade-in delay-200" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem' }}>
            <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={36} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Hands-on Labs</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>State-of-the-art VLSI/FPGA, DSP, and Communication Systems laboratories.</p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="card glass animate-fade-in delay-300" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem' }}>
            <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={36} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Consistent Placements</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Excellent placement record with both core engineering and IT recruiters.</p>
            </div>
          </div>
          
          {/* Card 4 */}
          <div className="card glass animate-fade-in delay-400" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem' }}>
            <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={36} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Expert Faculty</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Learn from faculty with active research and strong industry ties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Announcements */}
      <section className="news-section container">
        <div className="section-header">
          <h2>Latest Updates</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="grid grid-cols-3">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div key={item._id || index} className="news-card card">
                <div className="news-type">{item.type === 'news' ? 'News' : 'Announcement'}</div>
                <h4>{item.title}</h4>
                <p>{item.shortDescription || item.content}</p>
                <div className="news-date">
                  <Calendar size={16} /> {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="news-card card loading-skeleton"></div>
              <div className="news-card card loading-skeleton"></div>
              <div className="news-card card loading-skeleton"></div>
            </>
          )}
        </div>
      </section>

      {/* HOD Message Teaser */}
      <section className="hod-teaser-section">
        <div className="container hod-grid">
          <div className="hod-image-wrapper">
            <img src={hodImg} alt="HOD" className="hod-image" />
          </div>
          <div className="hod-content">
            <h2>Welcome from the <span className="gradient-text">Head of the Department</span></h2>
            <p className="quote">"Welcome to the Department of Electronics and Communication Engineering. Our department is dedicated to providing an environment that fosters intellectual growth, innovation, and leadership among our students. We are proud of our state-of-the-art infrastructure and highly qualified faculty who are committed to delivering quality education."</p>
            <Link to="/about" className="btn btn-secondary mt-4">Read Full Message</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
