import React, { useState, useEffect } from 'react';
import { Award, Calendar, Users, Trophy } from 'lucide-react';
import { getAchievements, getImageUrl } from '../services/api';
import './Page.css';

const StudentAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await getAchievements();
        setAchievements(data);
      } catch (err) {
        console.error('Error fetching achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Student Achievements</h1>
          <p className="page-subtitle">Celebrating the outstanding accomplishments of our ECE students.</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        {/* Intro */}
        <div className="card glass animate-fade-in" style={{ padding: '3rem 2rem', textAlign: 'center', marginBottom: '3rem' }}>
          <Award size={64} style={{ color: 'var(--primary)', margin: '0 auto 1.5rem auto' }} />
          <h2 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 'bold' }}>Our Student Pride</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            We are incredibly proud of our students who continually excel in academics, sports, hackathons, and extracurricular activities. Their dedication and talent bring immense prestige to the Department.
          </p>
        </div>

        {/* Dynamic Achievements */}
        {loading ? (
          <div className="achievement-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card glass loading-skeleton" style={{ height: '280px' }}></div>
            <div className="card glass loading-skeleton" style={{ height: '280px' }}></div>
            <div className="card glass loading-skeleton" style={{ height: '280px' }}></div>
          </div>
        ) : achievements.length > 0 ? (
          <div className="animate-fade-in delay-100" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Recent Achievements</h3>
            </div>
            
            <div className="achievement-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {achievements.map((item, index) => (
                <div key={item._id || item.id || index} className="achievement-card card glass" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {item.imageUrl && (
                    <div className="achievement-image-wrapper" style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                      <img src={getImageUrl(item.imageUrl)} alt={item.title} className="achievement-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className="achievement-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 className="achievement-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{item.title}</h4>
                    {item.studentNames && item.studentNames.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <Users size={16} /> <span>{Array.isArray(item.studentNames) ? item.studentNames.join(', ') : item.studentNames}</span>
                      </div>
                    )}
                    {item.year && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <Calendar size={16} /> <span>{item.year}</span>
                      </div>
                    )}
                    <p className="achievement-desc" style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1 }}>{item.description}</p>
                    
                    {item.tags && item.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                        {(Array.isArray(item.tags) ? item.tags : [item.tags]).map((tag, i) => (
                          <span key={i} style={{ padding: '0.25rem 0.75rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', borderRadius: '1rem', fontSize: '0.8rem' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card glass" style={{ textAlign: 'center', padding: '3rem', marginTop: '2rem' }}>
            <Trophy size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
            <h3>No achievement records currently added</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Student achievement records added in the Admin panel will automatically appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAchievements;
