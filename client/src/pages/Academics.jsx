import React from 'react';
import './Page.css';

const Academics = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Academics & Programs</h1>
          <p className="page-subtitle">Comprehensive curriculum designed to meet industry standards and research needs.</p>
        </div>
      </div>

      <div className="container page-content">
        <section className="about-section">
          <h2>Undergraduate Program (B.Tech)</h2>
          <div className="card glass mb-8">
            <h3>B.Tech in Electronics and Communication Engineering</h3>
            <p>A four-year program covering fundamental and advanced concepts in electronics, communication systems, signal processing, and embedded systems.</p>
            <ul className="styled-list mt-4">
              <li>Intake: 120 Students</li>
              <li>Duration: 4 Years (8 Semesters)</li>
              <li>Accreditation: NBA Accredited</li>
            </ul>
            <button className="btn btn-secondary mt-4">Download Syllabus</button>
          </div>
        </section>

        <section className="about-section mt-12">
          <h2>Postgraduate Programs (M.Tech)</h2>
          <div className="grid grid-cols-2">
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
      </div>
    </div>
  );
};

export default Academics;
