import { useEffect, useState } from 'react';
import { ArrowRight, Award, BookOpen, Users, Calendar, Briefcase, Cpu, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { getNews, getImageUrl, getActivities, getLinks } from '../services/api';
import './Home.css';
import './Page.css';
import { Link, useLocation } from 'react-router-dom';
import hodImg from '../assets/WhatsApp Image 2026-07-14 at 9.44.25 PM.jpeg';

const Home = () => {
  const [news, setNews] = useState([]);
  const [activities, setActivities] = useState([]);
  const [links, setLinks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data } = await getLinks();
        if (data && data.length > 0) {
          setLinks(data);
        }
      } catch (err) {
        console.error('Error fetching links:', err);
      }
    };
    fetchLinks();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

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

    const fetchActivities = async () => {
      try {
        const { data } = await getActivities();
        setActivities(data);
      } catch (err) {
        console.error('Error fetching activities:', err);
      }
    };
    fetchActivities();
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
            <Link to="/#about" className="btn btn-secondary">
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))', gap: '2rem' }}>
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
              <div key={item._id || index} className="news-card card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
                {item.thumbnailUrl && (
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <img 
                      src={getImageUrl(item.thumbnailUrl)} 
                      alt={item.title} 
                      style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'contain', display: 'block' }} 
                    />
                  </div>
                )}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="news-type" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
                    {item.type === 'news' ? 'News' : 'Announcement'}
                  </div>
                  <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{item.title}</h4>
                  <p style={{ marginBottom: '1.5rem', flex: 1 }}>{item.shortDescription || item.content}</p>
                  <div className="news-date" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Calendar size={16} /> {new Date(item.date).toLocaleDateString()}
                  </div>
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

      {/* Quick Links / Important Portals Section */}
      {links.length > 0 && (
        <section className="container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <div className="section-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2rem' }}>
            <h2><span className="gradient-text">Important Links</span> & Portals</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Access official forms, portals, and student resources</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {links.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card glass animate-fade-in"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  borderRadius: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'rgba(44, 44, 108, 0.1)', padding: '0.65rem', borderRadius: '10px', color: '#2c2c6c' }}>
                    <LinkIcon size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>{link.title}</h4>
                    {link.description && <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{link.description}</p>}
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--primary-color)', marginTop: '0.25rem', display: 'inline-block' }}>
                      {link.category || 'Important Link'}
                    </span>
                  </div>
                </div>
                <ExternalLink size={18} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* HOD Message Teaser */}
      <section className="hod-teaser-section">
        <div className="container hod-grid">
          <div className="hod-image-wrapper">
            <img src={hodImg} alt="HOD" className="hod-image" />
          </div>
          <div className="hod-content">
            <h2>Welcome from the <span className="gradient-text">Head of the Department</span></h2>
            <p className="quote">"Welcome to the Department of Electronics and Communication Engineering. Our department is dedicated to providing an environment that fosters intellectual growth, innovation, and leadership among our students. We are proud of our state-of-the-art infrastructure and highly qualified faculty who are committed to delivering quality education."</p>
            <Link to="/#about" className="btn btn-secondary mt-4">Read Full Message</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div id="about">
        <div className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
          <div className="section-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem' }}>
            <h2>About the <span className="gradient-text">Department</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.1rem' }}>Pioneering excellence in Electronics & Communication since 1995.</p>
            <div className="section-line" style={{ marginTop: '1rem' }}></div>
          </div>

          <div className="page-content">
            <section className="about-section">
              <h2>Vision</h2>
              <p className="lead-text">To be a leader of innovation, research and education in the field of Electronics and Communication Engineering, committed to address the real-world challenges and opportunities through cutting-edge technology and design.</p>
              
              <h2 className="mt-8">Mission</h2>
              <ul className="styled-list">
                <li>To advance the frontier of knowledge and practice in Electronics and Communication Engineering.</li>
                <li>To provide industry-related education that includes hands-on training, preparing students to work effectively in diverse teams and innovate in their jobs or entrepreneurial pursuits.</li>
                <li>To foster a culture of excellence in research and development that addresses real-world problems and creates new opportunities at the intersection of electronics, communication and computing.</li>
                <li>To empower individuals and communities with the knowledge and skills to leverage the power of technology for positive social impact through our education, research and outreach.</li>
                <li>To provide a multidisciplinary education that prepares students to collaborate across disciplines and work effectively in diverse teams.</li>
              </ul>
            </section>

            <section className="about-section mt-12">
              <h2>About Course</h2>
              <div className="card glass">
                <p>Electronics and communication engineering involves applying knowledge in electronics to facilitate communication and solve engineering problems. While building a solid foundation of the fundamentals, EASA exposes its students to emerging trends in the industry and moulds them to be quality professionals of the future.</p>
                <p className="mt-4">The curriculum focuses primarily on the knowledge and skills that emerging engineers need to possess. The knowledge gained allows them to be prepared for success in a broad range of industries, including electronics, communication, software, bioengineering, and robotics, among others.</p>
                <p className="mt-4">Department of Electronics and Communication Engineering has well-equipped laboratories. The faculty members of the department are experts in diversified fields. They are equipped with good research potential and are committed to the well-being of students. Students are encouraged to work on real-time projects and actively participate in technical conferences and workshops. The ECE program at EASA continually focuses on creating model students who can succeed in their chosen career path, contribute to their professional sector, and serve as role models for the community. Electronics and Communication Engineering has a good and consistent placement record with students placed in many industry-leading Core and IT organizations.</p>
              </div>
            </section>

            <section className="about-section mt-12">
              <h2>Department Activities</h2>

              {/* Dynamic Admin Gallery */}
              {activities.length > 0 ? (
                <div className="card glass mt-8" style={{ padding: '2rem', marginBottom: '3rem' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem' }}>
                    {activities.map((item, index) => (
                      <div key={item._id || index} className="card glass animate-fade-in" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ width: '100%', display: 'flex', overflowX: 'auto', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', scrollSnapType: 'x mandatory' }}>
                          {(item.images && item.images.length > 0 ? item.images : [item.imageUrl]).map((imgUrl, i) => (
                            <img 
                              key={i}
                              src={getImageUrl(imgUrl)} 
                              alt={`${item.title} ${i}`} 
                              style={{ minWidth: '100%', height: 'auto', maxHeight: '250px', objectFit: 'contain', display: 'block', flexShrink: 0, scrollSnapAlign: 'start' }} 
                            />
                          ))}
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                          {item.description && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
                              {item.description}
                            </p>
                          )}
                          {item.category && (
                            <span style={{ display: 'inline-block', marginTop: '1rem', padding: '0.25rem 0.75rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600, alignSelf: 'flex-start' }}>
                              {item.category}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <p>More updates and activities coming soon.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
