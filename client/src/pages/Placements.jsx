import React, { useState, useEffect } from 'react';
import { getPlacements, getSettings, getImageUrl } from '../services/api';
import { Building2, Briefcase, Sparkles } from 'lucide-react';
import ProgressiveImage from '../components/ProgressiveImage';
import './Page.css';

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placementsRes, settingsRes] = await Promise.all([
          getPlacements(),
          getSettings(),
        ]);
        if (placementsRes.data) {
          setPlacements(placementsRes.data);
        }
        if (settingsRes.data) {
          setSettings(settingsRes.data);
        }
      } catch (error) {
        console.error('Error fetching placement data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const placementRate = settings?.placementRatio || '95%';
  const hasHighlight = settings?.placementHighlightUrl;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Training & Placements</h1>
          <p className="page-subtitle">A track record of excellence in securing top opportunities for our graduates.</p>
        </div>
      </div>

      <div className="container">
        {/* Dynamic Placement Highlights Section (Admin Managed) */}
        {hasHighlight && (
          <section className="about-section mb-12 animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Sparkles size={28} color="var(--primary)" />
              <h2 style={{ margin: 0, fontSize: '2rem' }}>
                {settings.placementHighlightTitle || 'Placement Highlights - 2026'}
              </h2>
            </div>
            {settings.placementHighlightText && (
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                {settings.placementHighlightText}
              </p>
            )}

            <div className="card glass" style={{ padding: '1.5rem', overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ width: '100%', overflow: 'hidden', borderRadius: '12px', marginBottom: '1rem' }}>
                <ProgressiveImage 
                  src={getImageUrl(settings.placementHighlightUrl)} 
                  alt={settings.placementHighlightTitle || "Placement Highlights"} 
                  containerStyle={{ width: '100%', borderRadius: '12px' }}
                  style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain', display: 'block' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(79, 70, 229, 0.08)', borderRadius: '10px', textAlign: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 800 }}>{placementRate}</h3>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Overall Placement Rate</p>
                </div>
                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(79, 70, 229, 0.08)', borderRadius: '10px', textAlign: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 800 }}>2026 Batch</h3>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Recruitment Drive</p>
                </div>
                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(79, 70, 229, 0.08)', borderRadius: '10px', textAlign: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 800 }}>50+ Companies</h3>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Core & IT Corporate Partners</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Placement Cell Activities & Support */}
        <section className="about-section mb-12">
          <h2>Placement Cell Activities & Support</h2>
          <div className="grid grid-cols-2 mt-8" style={{ gap: '1.5rem' }}>
            <div className="card glass">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={22} color="var(--primary)" /> Pre-Placement Training
              </h3>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>
                Rigorous training programs covering aptitude, technical skills, competitive coding, soft skills, and mock interview preparation starting from the 3rd year.
              </p>
            </div>
            <div className="card glass">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={22} color="var(--primary)" /> Industry Internships
              </h3>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)' }}>
                Facilitating 6-month internships with leading technology and core engineering companies during the final semester for hands-on industry experience.
              </p>
            </div>
          </div>
        </section>

        {/* Placement Photos & Recruiter Cards */}
        <section className="about-section mt-12 mb-12">
          <h2>Placement Photos & Recruiter Gallery</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '2rem' }}>
            Placement event photos, offer letters, and recruiting company highlights.
          </p>

          {loading ? (
            <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
              <div className="card glass loading-skeleton" style={{ height: '220px' }}></div>
              <div className="card glass loading-skeleton" style={{ height: '220px' }}></div>
              <div className="card glass loading-skeleton" style={{ height: '220px' }}></div>
            </div>
          ) : placements.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {placements.map((item, index) => (
                <div key={item._id || item.id || index} className="card glass animate-fade-in" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '12px' }}>
                  {item.logoUrl ? (
                    <div style={{ width: '100%', height: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                      <ProgressiveImage
                        src={getImageUrl(item.logoUrl)}
                        alt={item.company}
                        containerStyle={{ width: '100%', height: '100%' }}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: '180px', borderRadius: '8px', backgroundColor: 'rgba(79, 70, 229, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1rem' }}>
                      <Building2 size={48} />
                    </div>
                  )}

                  <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>{item.company}</h3>
                    {item.recruiterName && (
                      <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        {item.recruiterName}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card glass" style={{ textAlign: 'center', padding: '3rem' }}>
              <Building2 size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
              <h3>No placement photos uploaded yet</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Photos uploaded in the Admin panel will automatically appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Placements;
