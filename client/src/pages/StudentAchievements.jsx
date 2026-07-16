import React from 'react';
import { Award } from 'lucide-react';
import './Page.css';

const StudentAchievements = () => {
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

        {/* Santhana Pandi Achievement */}
        <div className="card glass animate-fade-in delay-100" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Outstanding Oratory Excellence</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <strong>Santhana Pandi</strong> has built a strong track record in Tamil oratory and public speaking over the past year, winning three separate competitions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 mt-8" style={{ gap: '1.5rem' }}>
            {Object.values(import.meta.glob('../assets/student achivement/*.{jpeg,jpg,png}', { eager: true, import: 'default' })).map((imgSrc, index) => (
              <div key={index} style={{ padding: '0.5rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={imgSrc} alt={`Santhana Pandi Achievement ${index + 1}`} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', borderRadius: '0.5rem' }} />
              </div>
            ))}
          </div>
        </div>

        {/* IoT Workshop Achievement */}
        <div className="card glass animate-fade-in delay-200" style={{ padding: '2.5rem', marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Young Minds Dive Deep into IoT Technology</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            ECET is pleased to announce that <strong>Mr. T. Thichana Moorthy</strong> and <strong>Mr. D. Ragul</strong>, both first-year students of the ECE department, attended a workshop on "IoT using Python and Raspberry Pi" at the Indian Institute of Technology in Chennai on March 23rd, 2024. Their active participation reflects their dedication to learning and their eagerness to explore new frontiers in the field of electronics and communication engineering.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 mt-8" style={{ gap: '1.5rem' }}>
            {Object.values(import.meta.glob('../assets/stu achi 2/*.{jpeg,jpg,png}', { eager: true, import: 'default' })).map((imgSrc, index) => (
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
