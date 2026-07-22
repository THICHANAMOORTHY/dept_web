import React, { useState, useEffect } from 'react';
import { getLabs, getImageUrl, getSettings } from '../services/api';
import './Page.css';



const Academics = () => {
  const [labs, setLabs] = useState([]);
  const [curriculumPdfUrl, setCurriculumPdfUrl] = useState(null);
  
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const { data } = await getLabs();
        if (data && data.length > 0) {
          setLabs(data);
        }
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };
    fetchLabs();

    const fetchSettings = async () => {
      try {
        const { data } = await getSettings();
        if (data && data.curriculumPdfUrl) {
          setCurriculumPdfUrl(getImageUrl(data.curriculumPdfUrl));
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Academics & Programs</h1>
          <p className="page-subtitle">Comprehensive curriculum designed to meet industry standards and research needs.</p>
        </div>
      </div>

      <div className="container page-content">
        <section className="about-section mb-12">
          <h2>Department Overview</h2>
          <div className="card glass">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>B.E. ECE - Regulations 2024 (R2024) - Choice Based Credit System</h3>
            <p style={{ fontWeight: 500, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Total Program Credits: 164</p>
            
            <h4 className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Vision</h4>
            <p style={{ marginBottom: '1.5rem' }}>
              To be a leading hub in Electronics and Communication Engineering, driving innovation, interdisciplinary collaboration, and socially impactful solutions through cutting-edge Education, Research and Entrepreneurship.
            </p>

            <h4 className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Mission</h4>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>To advance knowledge and practice in Electronics and Communication Engineering through hands-on, industry-relevant education that prepares students for innovation, entrepreneurship and multidisciplinary collaboration.</li>
              <li>To foster a culture of research and development that addresses real-world challenges and creates transformative solutions at the intersection of Electronics, Communication and Computing.</li>
              <li>To empower individuals and communities by leveraging technology for positive social impact through inclusive education, collaborative outreach and interdisciplinary teamwork.</li>
            </ol>

            <h4 className="gradient-text" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Program Educational Objectives (PEOs)</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>PEO1.</strong> Graduates will have a thorough grounding in the fundamental sciences, facilitating future academic pursuits in ECE.</li>
              <li><strong>PEO2.</strong> Graduates will demonstrate expertise in ECE, empowering them to excel in industry applications, advanced studies, and research.</li>
              <li><strong>PEO3.</strong> Graduates will have a spirit of inquiry and learning, staying current with industry trends and technological breakthroughs.</li>
              <li><strong>PEO4.</strong> Graduates will critically assess literature, identify knowledge gaps, and develop novel, ethics-guided research approaches.</li>
              <li><strong>PEO5.</strong> Graduates will integrate professional ethics with social awareness, addressing engineering challenges holistically.</li>
            </ul>
          </div>
        </section>

        <section className="about-section mt-12">
          <h2>Undergraduate Program (B.E.)</h2>
          <div className="card glass mb-8">
            <h3>B.E. in Electronics and Communication Engineering</h3>
            <p>A four-year program covering fundamental and advanced concepts in electronics, communication systems, signal processing, and embedded systems.</p>
            <ul className="styled-list mt-4">
              <li>Intake: 120 Students</li>
              <li>Duration: 4 Years (8 Semesters)</li>
              <li>Accreditation: NBA Accredited</li>
            </ul>
            <div className="mt-8">
              <h4>Core Subject Areas</h4>
              <p style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>ECE program enables students to get a strong foundation in various aspects of electronics and communication engineering as following:</p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                <li>Signals and Systems</li>
                <li>Digital Electronics</li>
                <li>Control System Engineering</li>
                <li>Digital Signal Processing</li>
                <li>Electromagnetic Theory</li>
                <li>Analog and Digital Communications</li>
                <li>Communication Networks</li>
                <li>Microprocessors and Microcontrollers</li>
                <li>VLSI Design</li>
                <li>Wireless Communication</li>
                <li>Optical Communication</li>
                <li>Antennas and Microwave Engineering</li>
                <li>Digital Image Processing</li>
                <li>Linear Integrated Circuits and Applications</li>
              </ul>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h4>B.E. ECE - Regulations 2024 (R2024)</h4>
              <p style={{ marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Total Program Credits: 164. The updated R2024 curriculum focuses on innovation, interdisciplinary collaboration, and industry readiness through a Choice Based Credit System.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {curriculumPdfUrl ? (
                  <>
                    <a href={curriculumPdfUrl} download className="btn btn-primary">
                      Download Full Curriculum
                    </a>
                    <a href={curriculumPdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      View Curriculum Text
                    </a>
                  </>
                ) : (
                  <p style={{ color: 'var(--text-secondary)' }}>Curriculum document is not available at the moment.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="about-section mt-12">
          <h2>Postgraduate Programs (M.Tech)</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="card glass">
              <h3>M.Tech in VLSI Design</h3>
              <p>Specialized program focusing on IC design, FPGA, testing and verification.</p>
              <ul className="styled-list mt-4">
                <li>Intake: 18 Students</li>
                <li>Duration: 2 Years</li>
              </ul>
            </div>
            <div className="card glass">
              <h3>M.Tech in Communication Systems</h3>
              <p>Advanced studies in wireless communication, optical networks, and RF engineering.</p>
              <ul className="styled-list mt-4">
                <li>Intake: 18 Students</li>
                <li>Duration: 2 Years</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section mt-12">
          <h2>Doctoral Program (Ph.D.)</h2>
          <div className="card glass">
            <p>The department offers full-time and part-time Ph.D. programs in various specializations including VLSI, Signal Processing, IoT, and Communication Networks.</p>
            <p className="mt-4">Currently, we have over 20 research scholars pursuing their doctoral studies under the guidance of our experienced faculty.</p>
          </div>
        </section>

        <section className="about-section mt-12">
          <h2>Laboratories & Facilities</h2>
          {labs.length > 0 ? (
            <div className="grid grid-cols-1" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
              {labs.map((lab, index) => (
                <div key={index} className="card glass" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                  {lab.imageUrl && (
                    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
                      <img src={getImageUrl(lab.imageUrl)} alt={lab.name} style={{ width: '100%', height: '180px', objectFit: 'contain' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 className="gradient-text" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{lab.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '1rem' }}>{lab.description}</p>
                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Subjects Supported:</h4>
                      <p style={{ fontSize: '0.85rem' }}>
                        {Array.isArray(lab.subjectsSupported) ? lab.subjectsSupported.join(', ') : lab.subjectsSupported}
                      </p>
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Key Equipment:</h4>
                      <p style={{ fontSize: '0.85rem' }}>
                        {Array.isArray(lab.equipmentList || lab.equipment) ? (lab.equipmentList || lab.equipment).join(', ') : (lab.equipmentList || lab.equipment)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
              No laboratories and facilities data available yet. Please check back later or contact the department for more information.
            </p>
          )}
        </section>

        <section className="about-section mt-12 mb-8">
          <h2>Video Gallery</h2>
          <div className="card glass">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '0.5rem' }}>
              <iframe 
                src="https://www.youtube.com/embed/iGND5XL0bJc?si=u3ImFdq7PWx_AdJ0" 
                title="Department Video Gallery" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Academics;
