import { useEffect, useState } from 'react';
import { getPlacements } from '../services/api';
import './Page.css';

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
        <div className="placement-stats animate-fade-in">
          <div className="p-stat">
            <div className="p-stat-value">95%</div>
            <div className="p-stat-label">Placement Rate</div>
          </div>
          <div className="p-stat">
            <div className="p-stat-value">32 LPA</div>
            <div className="p-stat-label">Highest Package</div>
          </div>
          <div className="p-stat">
            <div className="p-stat-value">150+</div>
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
      </div>
    </div>
  );
};

export default Placements;
