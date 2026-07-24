import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLabs, getImageUrl, getSettings } from '../services/api';
import './Page.css';

const Academics = () => {
  const [labs, setLabs] = useState([]);
  const [curriculumPdfUrl, setCurriculumPdfUrl] = useState(null);
  const [curriculumPdf2021Url, setCurriculumPdf2021Url] = useState(null);
  const location = useLocation();

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
        if (data) {
          if (data.curriculumPdfUrl) setCurriculumPdfUrl(getImageUrl(data.curriculumPdfUrl));
          if (data.curriculumPdf2021Url) setCurriculumPdf2021Url(getImageUrl(data.curriculumPdf2021Url));
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
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>B.E. ECE - Regulations 2024 (R2024) & Regulations 2021 (R2021)</h3>
            <p style={{ fontWeight: 500, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Choice Based Credit System (CBCS)</p>
            
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

        <section className="about-section mt-12" id="curriculum">
          <h2>Undergraduate Program (B.E.) & Curriculum Downloads</h2>
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

            {/* Curriculum Downloads Grid for Regulations 2024 and 2021 */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>Curriculum & Syllabus Downloads</h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {/* Regulations 2024 Download Section */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>Autonomous Scheme</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.5rem 0' }}>Regulations 2024 (R2024)</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      Total Program Credits: 164. Choice Based Credit System focusing on innovation, interdisciplinary electives, and industry readiness.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {curriculumPdfUrl ? (
                      <>
                        <a href={curriculumPdfUrl} download className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                          Download R2024 PDF
                        </a>
                        <a href={curriculumPdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                          View PDF
                        </a>
                      </>
                    ) : (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>R2024 document is not available at the moment.</p>
                    )}
                  </div>
                </div>

                {/* Regulations 2021 Download Section */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#10b981', letterSpacing: '0.5px' }}>Anna University Scheme</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.5rem 0' }}>Regulations 2021 (R2021)</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      Total Program Credits: 165. Choice Based Credit System curriculum and syllabus prescribed by Anna University.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                    {curriculumPdf2021Url ? (
                      <>
                        <a href={curriculumPdf2021Url} download className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', backgroundColor: '#10b981', borderColor: '#10b981' }}>
                          Download R2021 PDF
                        </a>
                        <a href={curriculumPdf2021Url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                          View PDF
                        </a>
                      </>
                    ) : (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>R2021 document is not available at the moment.</p>
                    )}
                  </div>
                </div>
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

        <section className="about-section mt-12" id="labs">
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
            Laboratories & Facilities
          </h2>

          {labs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {labs.map((lab, index) => (
                <div
                  key={lab._id || lab.id || index}
                  className="card glass animate-fade-in"
                  style={{
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div style={{ width: '100%', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-color)', padding: '1rem' }}>
                    {lab.imageUrl ? (
                      <img src={getImageUrl(lab.imageUrl)} alt={lab.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ color: 'var(--primary)', opacity: 0.75, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <Beaker size={48} />
                      </div>
                    )}
                  </div>
                  
                  <div style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: '1.4' }}>
                      {lab.name}
                    </h3>
                    {lab.description && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.5' }}>
                        {lab.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card glass" style={{ textAlign: 'center', padding: '3rem' }}>
              <Beaker size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
              <h3>No laboratory cards uploaded yet</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Laboratories added in the Admin panel will automatically appear here.
              </p>
            </div>
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
