import React, { useState, useEffect } from 'react';
import { Award, Calendar, Users } from 'lucide-react';
import { getAchievements, getImageUrl } from '../services/api';
import './Page.css';

const santhanaPandiData = [
  { title: "Winner – Technical Competition", desc: "Proud moment after winning a competition at Sri Eshwar College of Engineering. This achievement reflects my passion for innovation, technical excellence, and continuous learning." },
  { title: "Honored at Tamil Literary Event", desc: "Received recognition for excellence in public speaking during a prestigious Tamil literary event. The award celebrates my communication skills and commitment to promoting Tamil language and culture." },
  { title: "Special Prize Winner – Coimbatore's Got Talent", desc: "Awarded the Special Prize in the \"21 Above\" category at Coimbatore's Got Talent for delivering an impactful speech. This recognition strengthened my confidence as a motivational speaker and presenter." },
  { title: "Certificate of Excellence", desc: "Received a certificate of appreciation for outstanding performance in a Tamil speech competition, recognizing my effective communication and stage presence." },
  { title: "Honored by Distinguished Guests", desc: "Felicitated by eminent personalities for achievements in public speaking and Tamil literary competitions. A memorable milestone in my journey as a speaker." },
  { title: "Champion – Tamil Speech Competition 2026", desc: "Won first place in a state-level Tamil speech competition and received a trophy and cash award. This achievement reflects dedication, confidence, and strong oratory skills." },
  { title: "Guest Speaker", desc: "Delivering an engaging speech on the importance of preserving the Tamil language and literature. Passionate about inspiring audiences through meaningful communication." },
  { title: "Award of Appreciation", desc: "Received appreciation from respected educational and literary leaders for active contributions to Tamil language awareness and public speaking." },
  { title: "Literary Recognition", desc: "Honored during a Tamil literary program for participation and contributions toward language awareness and education initiatives." },
  { title: "First Prize – Speech Competition", desc: "Won First Prize in the Speech Competition conducted at Hindustan College of Arts and Science, along with a cash prize. This achievement showcases my confidence, communication, and presentation skills." },
  { title: "Event Excellence Award", desc: "Recognized during a major cultural event for outstanding performance and active participation in public speaking activities." }
];

const StudentAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const santhanaImages = Object.values(import.meta.glob('../assets/student achivement/*.{jpeg,jpg,png,JPEG,JPG,PNG}', { eager: true, import: 'default' }));

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await getAchievements();
        setAchievements(data);
      } catch (err) {
        console.error('Error fetching achievements:', err);
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
          <Award size={64} style={{ color: 'var(--primary-color)', margin: '0 auto 1.5rem auto' }} />
          <h2 className="gradient-text" style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 'bold' }}>Our Student Pride</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            We are incredibly proud of our students who continually excel in academics, sports, and extracurricular activities. Their dedication and talent bring immense prestige to the Department.
          </p>
        </div>

        {/* Dynamic Achievements */}
        {achievements.length > 0 && (
          <div className="animate-fade-in delay-100" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>Recent Achievements</h3>
            </div>
            
            <div className="achievement-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {achievements.map((item, index) => (
                <div key={item._id || index} className="achievement-card card glass" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {item.imageUrl && (
                    <div className="achievement-image-wrapper" style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                      <img src={getImageUrl(item.imageUrl)} alt={item.title} className="achievement-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className="achievement-content" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 className="achievement-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{item.title}</h4>
                    {item.studentNames && item.studentNames.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <Users size={16} /> <span>{item.studentNames.join(', ')}</span>
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
                        {item.tags.map((tag, i) => (
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
        )}

        {/* Legacy Sections below */}

        {/* Santhana Pandi Achievement */}
        <div className="animate-fade-in delay-100" style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>Outstanding Oratory Excellence</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
              <strong>Santhana Pandi</strong> has built a strong track record in Tamil oratory and public speaking over the past year, winning multiple prestigious competitions and setting a shining example for his peers.
            </p>
          </div>
          
          <div className="achievement-grid">
            {santhanaImages.map((imgSrc, index) => {
              const data = santhanaPandiData[index % santhanaPandiData.length];
              return (
                <div key={index} className="achievement-card">
                  <div className="achievement-image-wrapper">
                    <img src={imgSrc} alt={data.title} className="achievement-image" />
                  </div>
                  <div className="achievement-content">
                    <h4 className="achievement-title">{data.title}</h4>
                    <p className="achievement-desc">{data.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* IoT Workshop Achievement */}
        <div className="card glass animate-fade-in delay-200" style={{ padding: '2.5rem', marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Young Minds Dive Deep into IoT Technology</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            ECET is pleased to announce that <strong>Mr. T. Thichana Moorthy</strong> and <strong>Mr. D. Ragul</strong>, both first-year students of the ECE department, attended a workshop on "IoT using Python and Raspberry Pi" at the Indian Institute of Technology in Chennai on March 23rd, 2024. Their active participation reflects their dedication to learning and their eagerness to explore new frontiers in the field of electronics and communication engineering.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 mt-8" style={{ gap: '1.5rem' }}>
            {Object.values(import.meta.glob('../assets/stu achi 2/*.{jpeg,jpg,png,JPEG,JPG,PNG}', { eager: true, import: 'default' })).map((imgSrc, index) => (
              <div key={index} style={{ padding: '0.5rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={imgSrc} alt={`IoT Achievement ${index + 1}`} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', borderRadius: '0.5rem' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAchievements;
