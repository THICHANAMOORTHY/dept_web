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
          <p className="lead-text">To be a center of excellence in Electronics and Communication Engineering education and research, producing globally competent professionals.</p>
          
          <h2 className="mt-8">Mission</h2>
          <ul className="styled-list">
            <li>To impart quality education through a well-designed curriculum in tune with the challenging software needs of the industry.</li>
            <li>To provide state-of-the-art facilities for students and faculty to engage in advanced research and innovation.</li>
            <li>To foster strong industry-academia interaction for bridging the gap between theoretical knowledge and practical applications.</li>
            <li>To instill ethical values, leadership qualities, and lifelong learning skills in students.</li>
          </ul>
        </section>

        <section className="about-section mt-12">
          <h2>Department History</h2>
          <div className="card glass">
            <p>The Department of Electronics & Communication Engineering was established in the year 1995 with an intake of 60 students. Over the years, it has grown significantly and currently offers B.Tech with an intake of 120, and M.Tech programs in VLSI and Communication Systems.</p>
            <p>The department boasts of highly qualified and experienced faculty members, many holding Ph.D. degrees from premier institutions. We have modern laboratories equipped with the latest software and hardware tools such as Cadence, MATLAB, Xilinx, and advanced communication equipment.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
