import React from 'react';
import './Page.css';
import curriculumFile from '../assets/staff/ECE_R2024_Curriculum.txt';

const labsData = [
  {
    name: "Circuits and Devices Laboratory",
    description: "Foundation lab for studying the characteristics of basic electronic devices such as diodes, transistors, and semiconductors, building the groundwork for analog circuit design.",
    subjectsSupported: ["Basic Electronic Devices"],
    equipment: ["Multimeters", "DC power supplies", "Breadboards", "CRO", "Function generators"],
    image: "/labs/lab_circuits_devices.png"
  },
  {
    name: "Analog and Digital Circuits Laboratory",
    description: "Hands-on design, construction, and testing of analog circuits (amplifiers, oscillators) and digital logic circuits (gates, flip-flops, counters).",
    subjectsSupported: ["Digital Electronics", "Analog Electronics"],
    equipment: ["Digital trainer kits", "IC trainer boards", "Oscilloscopes", "Signal generators"],
    image: "/labs/lab_analog_digital.png"
  },
  {
    name: "Circuits and Simulation Integrated Laboratory",
    description: "Simulation-based lab for verifying circuit behavior using EDA/CAD tools before hardware implementation, bridging theory and simulation.",
    subjectsSupported: ["Signals and Systems", "Circuit Theory"],
    equipment: ["PC workstations", "SPICE/MATLAB simulation software"],
    image: "/labs/lab_simulation.png"
  },
  {
    name: "Linear Integrated Circuits Laboratory",
    description: "Design and testing of op-amp based circuits including filters, oscillators, comparators, and instrumentation amplifiers.",
    subjectsSupported: ["Linear Integrated Circuits and Applications"],
    equipment: ["Op-amp ICs", "Trainer kits", "CRO", "Power supplies"],
    image: "/labs/lab_linear_ic.png"
  },
  {
    name: "Electrical Engineering and Control System Laboratory",
    description: "Practical exposure to control system modeling, stability analysis, and controller tuning alongside core electrical engineering principles.",
    subjectsSupported: ["Control System Engineering"],
    equipment: ["Control system trainer kits", "PID controllers", "Simulation software"],
    image: "/labs/lab_control_system.png"
  },
  {
    name: "Digital Signal Processing Laboratory",
    description: "Implementation of signal and image processing algorithms using DSP processors and simulation tools to reinforce theoretical DSP concepts.",
    subjectsSupported: ["Digital Signal Processing", "Digital Image Processing"],
    equipment: ["DSP trainer kits", "MATLAB", "Computers"],
    image: "/labs/lab_dsp.png"
  },
  {
    name: "Communication Systems Laboratory",
    description: "Hands-on experiments in analog and digital modulation techniques, giving students practical understanding of communication system design.",
    subjectsSupported: ["Analog and Digital Communications", "Wireless Communication"],
    equipment: ["AM/FM modulation trainer kits", "Digital modulation kits (ASK/FSK/PSK)", "CRO", "Spectrum analyzer"],
    image: "/labs/lab_communication.png"
  }
];

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
        <section className="about-section mb-12">
          <h2>Department Overview</h2>
          <div className="card glass">
            <h3 className="text-xl font-semibold mb-2">B.E. ECE - Regulations 2024 (R2024) - Choice Based Credit System</h3>
            <p className="font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>Total Program Credits: 164</p>
            
            <h4 className="text-xl font-bold mb-3 text-gradient" style={{ color: 'var(--primary-color)' }}>Vision</h4>
            <p className="mb-6">
              To be a leading hub in Electronics and Communication Engineering, driving innovation, interdisciplinary collaboration, and socially impactful solutions through cutting-edge Education, Research and Entrepreneurship.
            </p>

            <h4 className="text-xl font-bold mb-3 text-gradient" style={{ color: 'var(--primary-color)' }}>Mission</h4>
            <ol className="list-decimal list-outside ml-5 space-y-2 mb-6">
              <li>To advance knowledge and practice in Electronics and Communication Engineering through hands-on, industry-relevant education that prepares students for innovation, entrepreneurship and multidisciplinary collaboration.</li>
              <li>To foster a culture of research and development that addresses real-world challenges and creates transformative solutions at the intersection of Electronics, Communication and Computing.</li>
              <li>To empower individuals and communities by leveraging technology for positive social impact through inclusive education, collaborative outreach and interdisciplinary teamwork.</li>
            </ol>

            <h4 className="text-xl font-bold mb-3 text-gradient" style={{ color: 'var(--primary-color)' }}>Program Educational Objectives (PEOs)</h4>
            <ul className="list-none space-y-2">
              <li><strong>PEO1.</strong> Graduates will have a thorough grounding in the fundamental sciences, facilitating future academic pursuits in ECE.</li>
              <li><strong>PEO2.</strong> Graduates will demonstrate expertise in ECE, empowering them to excel in industry applications, advanced studies, and research.</li>
              <li><strong>PEO3.</strong> Graduates will have a spirit of inquiry and learning, staying current with industry trends and technological breakthroughs.</li>
              <li><strong>PEO4.</strong> Graduates will critically assess literature, identify knowledge gaps, and develop novel, ethics-guided research approaches.</li>
              <li><strong>PEO5.</strong> Graduates will integrate professional ethics with social awareness, addressing engineering challenges holistically.</li>
            </ul>
          </div>
        </section>

        <section className="about-section">
          <h2>Undergraduate Program (B.E.)</h2>
          <div className="card glass mb-8">
            <h3>B.E. in Electronics and Communication Engineering</h3>
            <p>A four-year program covering fundamental and advanced concepts in electronics, communication systems, signal processing, and embedded systems.</p>
            <ul className="styled-list mt-4">
              <li>Intake: 120 Students</li>
              <li>Duration: 4 Years (8 Semesters)</li>
              <li>Accreditation: NBA Accredited</li>
            </ul>
            <div className="mt-6">
              <h4>Core Subject Areas</h4>
              <p className="mt-2 mb-2">ECE program enables students to get a strong foundation in various aspects of electronics and communication engineering as following:</p>
              <ul className="grid grid-cols-2 gap-2 mt-2 list-disc list-inside">
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

            <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
              <h4>B.E. ECE - Regulations 2024 (R2024)</h4>
              <p className="mt-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                Total Program Credits: 164. The updated R2024 curriculum focuses on innovation, interdisciplinary collaboration, and industry readiness through a Choice Based Credit System.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <a href={curriculumFile} download="ECE_R2024_Curriculum.txt" className="btn btn-primary">
                  Download Full Curriculum
                </a>
                <a href={curriculumFile} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  View Curriculum Text
                </a>
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
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
            {labsData.map((lab, index) => (
              <div key={index} className="card glass" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                {lab.image && (
                  <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-color)' }}>
                    <img src={lab.image} alt={lab.name} style={{ width: '100%', height: '180px', objectFit: 'contain' }} />
                  </div>
                )}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 className="text-lg font-bold mb-2 text-gradient" style={{ color: 'var(--primary-color)' }}>{lab.name}</h3>
                  <p className="mb-4" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', flexGrow: 1 }}>{lab.description}</p>
                  <div className="mt-2" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <h4 className="text-sm font-semibold mb-1">Subjects Supported:</h4>
                    <p style={{ fontSize: '0.85rem' }}>{lab.subjectsSupported.join(', ')}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold mb-1">Key Equipment:</h4>
                    <p style={{ fontSize: '0.85rem' }}>{lab.equipment.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
