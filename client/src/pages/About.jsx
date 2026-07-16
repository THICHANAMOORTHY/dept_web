import React from 'react';
import './Page.css'; // Common styles for inner pages

const About = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">About the Department</h1>
          <p className="page-subtitle">Pioneering excellence in Electronics & Communication since 1995.</p>
        </div>
      </div>

      <div className="container page-content">
        <section className="about-section">
          <h2>Vision</h2>
          <p className="lead-text">To be a leader of innovation, research and education in the field of Electronics and Communication Engineering, committed to address the real-world challenges and opportunities through cutting-edge technology and design.</p>
          
          <h2 className="mt-8">Mission</h2>
          <ul className="styled-list">
            <li>To advance the frontier of knowledge and practice in Electronics and Communication Engineering.</li>
            <li>To provide industry-related education that includes hands-on training, preparing students to work effectively in diverse teams and innovate in their jobs or entrepreneurial pursuits.</li>
            <li>To foster a culture of excellence in research and development that addresses real-world problems and creates new opportunities at the intersection of electronics, communication and computing.</li>
            <li>To empower individuals and communities with the knowledge and skills to leverage the power of technology for positive social impact through our education, research and outreach.</li>
            <li>To provide a multidisciplinary education that prepares students to collaborate across disciplines and work effectively in diverse teams.</li>
          </ul>
        </section>

        <section className="about-section mt-12">
          <h2>About Course</h2>
          <div className="card glass">
            <p>Electronics and communication engineering involves applying knowledge in electronics to facilitate communication and solve engineering problems. While building a solid foundation of the fundamentals, EASA exposes its students to emerging trends in the industry and moulds them to be quality professionals of the future.</p>
            <p className="mt-4">The curriculum focuses primarily on the knowledge and skills that emerging engineers need to possess. The knowledge gained allows them to be prepared for success in a broad range of industries, including electronics, communication, software, bioengineering, and robotics, among others.</p>
            <p className="mt-4">Department of Electronics and Communication Engineering has well-equipped laboratories. The faculty members of the department are experts in diversified fields. They are equipped with good research potential and are committed to the well-being of students. Students are encouraged to work on real-time projects and actively participate in technical conferences and workshops. The ECE program at EASA continually focuses on creating model students who can succeed in their chosen career path, contribute to their professional sector, and serve as role models for the community. Electronics and Communication Engineering has a good and consistent placement record with students placed in many industry-leading Core and IT organizations.</p>
          </div>
        </section>

        {/* Department Activities Section */}
        <section className="about-section mt-12">
          <h2>Department Activities</h2>

          {/* Project Expo 2026 */}
          <div className="card glass mt-8" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Department of ECE – Project Expo 2026</h3>
            <p className="mb-6" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              The Department of Electronics and Communication Engineering successfully organized the Project Expo on 30th January. The event served as an excellent platform for students to showcase their innovative ideas, technical expertise, and impressive project outcomes. We extend our heartfelt appreciation to our students, faculty members, and coordinators for their dedication in making this event a grand success.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1.5rem' }}>
              {Object.values(import.meta.glob('../assets/project expo/*.{jpeg,jpg,png}', { eager: true, import: 'default' })).map((imgSrc, index) => (
                <div key={index} className={`card glass animate-fade-in`} style={{ padding: '0.5rem', animationDelay: `${(index % 4) * 100}ms` }}>
                  <img src={imgSrc} alt={`Project Expo ${index + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Industrial Visit Gallery */}
          <div className="card glass mt-8" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Industrial Visit: SSI Institute of Technology</h3>
            <p className="mb-4">The Department of Electronics and Communication Engineering (ECE) organized a one-day industrial visit to SSI Institute of Technology, Coimbatore, on 27th November 2024. The visit aimed to provide students with practical exposure to the latest technologies in electronics and communication engineering.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Theory Session</h3>
                <ul className="styled-list">
                  <li>Fundamentals of electronics and communication engineering.</li>
                  <li>Basics of electronic circuit design, including component selection and analysis.</li>
                  <li>Introduction to programming concepts for embedded systems.</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Practical Session</h3>
                <ul className="styled-list">
                  <li>Designing and building a simple electronic circuit.</li>
                  <li>Writing and testing code to control the circuit.</li>
                  <li>Debugging and troubleshooting projects to enhance problem-solving skills.</li>
                </ul>
              </div>
            </div>
            
            <p className="mt-4" style={{ color: 'var(--text-secondary)' }}><i>This visit bridged theoretical learning with practical application, offering students valuable industry insights.</i></p>

            <div className="grid grid-cols-2 md:grid-cols-4 mt-8" style={{ gap: '1.5rem' }}>
              {Object.values(import.meta.glob('../assets/indusdri/*.{jpeg,jpg,png}', { eager: true, import: 'default' })).map((imgSrc, index) => (
                <div key={index} className={`card glass animate-fade-in`} style={{ padding: '0.5rem', animationDelay: `${(index % 4) * 100}ms` }}>
                  <img src={imgSrc} alt={`Industrial Visit ${index + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                </div>
              ))}
            </div>
          </div>

          {/* General Department Activities */}
          <div className="mt-12">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Other Activities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1.5rem' }}>
              {Object.values(import.meta.glob('../assets/staff/*.jpeg', { eager: true, import: 'default' })).map((imgSrc, index) => (
                <div key={index} className={`card glass animate-fade-in`} style={{ padding: '0.5rem', animationDelay: `${(index % 4) * 100}ms` }}>
                  <img src={imgSrc} alt={`Department Activity ${index + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pongal 2026 Celebration Gallery */}
        <section className="about-section mt-12 mb-12">
          <h2>Pongal 2026 Celebration</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 mt-8" style={{ gap: '1.5rem' }}>
            {Object.values(import.meta.glob('../assets/pongal/*.{jpeg,jpg,png}', { eager: true, import: 'default' })).map((imgSrc, index) => (
              <div key={index} className={`card glass animate-fade-in`} style={{ padding: '0.5rem', animationDelay: `${(index % 4) * 100}ms` }}>
                <img src={imgSrc} alt={`Pongal Celebration ${index + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem' }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
