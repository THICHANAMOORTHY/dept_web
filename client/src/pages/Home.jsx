import { useEffect, useState } from 'react';
import { ArrowRight, Award, BookOpen, Users, Calendar } from 'lucide-react';
import { getNews } from '../services/api';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await getNews();
        setNews(data.slice(0, 3)); // Get top 3 news items
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">
            Department of <br />
            <span className="gradient-text">Electronics & Communication</span>
          </h1>
          <p className="hero-subtitle">
            Innovating the future with state-of-the-art research, industry-aligned curriculum, and world-class faculty.
          </p>
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

      {/* Highlights Section */}
      <section className="highlights-section container">
        <div className="grid grid-cols-3">
          <div className="card glass animate-fade-in delay-100">
            <Award className="card-icon" size={40} />
            <h3>Excellence in Research</h3>
            <p>Multiple funded projects from DST, DRDO, and industry partners focusing on VLSI and IoT.</p>
          </div>
          <div className="card glass animate-fade-in delay-200">
            <BookOpen className="card-icon" size={40} />
            <h3>Industry Curriculum</h3>
            <p>Curriculum designed with inputs from top tech companies to make students industry-ready.</p>
          </div>
          <div className="card glass animate-fade-in delay-300">
            <Users className="card-icon" size={40} />
            <h3>Strong Alumni Network</h3>
            <p>Our alumni are leaders in top tech giants like Intel, Qualcomm, and Texas Instruments.</p>
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
                <p>{item.content}</p>
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
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" alt="HOD" className="hod-image" />
          </div>
          <div className="hod-content">
            <h2>Welcome from the <span className="gradient-text">Director</span></h2>
            <p className="quote">"Welcome to the Department of Electronics and Communication Engineering. Our department is dedicated to providing an environment that fosters intellectual growth, innovation, and leadership among our students. We are proud of our state-of-the-art infrastructure and highly qualified faculty who are committed to delivering quality education."</p>
            <Link to="/about" className="btn btn-secondary mt-4">Read Full Message</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
