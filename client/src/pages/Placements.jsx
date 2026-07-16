import { useEffect, useState } from 'react';
import { getPlacements } from '../services/api';
import './Page.css';
import placementImg1 from '../assets/009.jpg';
import placementImg2 from '../assets/images (1).jpg';
import placementImg3 from '../assets/013.jpg';
import placementHighlightsImg from '../assets/Placement.jpg';

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  
  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const { data } = await getPlacements();
        setPlacements(data);
      } catch (error) {
        console.error('Error fetching placements:', error);
      }
    };
    fetchPlacements();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Training & Placements</h1>
          <p className="page-subtitle">A track record of excellence in securing top opportunities for our graduates.</p>
        </div>
      </div>

      <div className="container">
        {/* Overall Placement Highlights */}
        <section className="about-section mb-12 animate-fade-in">
          <h2>Overall Placement Highlights</h2>
          <div className="mt-8">
            <img src={placementHighlightsImg} alt="Overall Placement Highlights" style={{ width: '100%', height: 'auto', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>
        </section>
        <div className="placement-stats animate-fade-in">
          <div className="p-stat">
            <div className="p-stat-value">95%</div>
            <div className="p-stat-label">Placement Rate</div>
          </div>
          <div className="p-stat">
            <div className="p-stat-value">6 LPA</div>
            <div className="p-stat-label">Highest Package</div>
          </div>
          <div className="p-stat">
            <div className="p-stat-value">50</div>
            <div className="p-stat-label">Recruiters</div>
          </div>
        </div>

        <section className="about-section mb-12">
          <h2>Top Recruiters</h2>
          <div className="recruiters-grid mt-8">
            {placements.map(p => (
              <div key={p._id} className="card recruiter-card animate-fade-in">
                <img src={p.logoUrl} alt={p.company} className="recruiter-logo" title={`${p.company} - ${p.package}`} />
              </div>
            ))}
          </div>
        </section>

        <section className="about-section mt-12">
          <h2>Placement Cell Activities</h2>
          <div className="grid grid-cols-2 mt-8">
            <div className="card glass">
              <h3>Pre-Placement Training</h3>
              <p>Rigorous training programs covering aptitude, technical skills, coding, and interview preparation starting from the 3rd year.</p>
            </div>
            <div className="card glass">
              <h3>Industry Internships</h3>
              <p>Facilitating 6-month internships with leading tech companies during the final semester for hands-on industry experience.</p>
            </div>
          </div>
        </section>

        {/* Placement Records Gallery */}
        <section className="about-section mt-12 mb-12">
          <h2>Placement Records Gallery</h2>
          <div className="grid grid-cols-3 mt-8" style={{ gap: '2rem' }}>
            <div className="card glass animate-fade-in delay-100" style={{ padding: '1rem' }}>
              <img src={placementImg1} alt="Placement Record 1" style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }} />
            </div>
            <div className="card glass animate-fade-in delay-200" style={{ padding: '1rem' }}>
              <img src={placementImg2} alt="Placement Record 2" style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }} />
            </div>
            <div className="card glass animate-fade-in delay-300" style={{ padding: '1rem' }}>
              <img src={placementImg3} alt="Placement Record 3" style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Placements;
