import { useEffect, useState } from 'react';
import { getFaculty, getImageUrl } from '../services/api';
import { Mail, Book } from 'lucide-react';
import './Page.css';
import sivakumarImg from '../assets/1.jpeg';
import achImg1 from '../assets/faculty achivment/ECET is proud to announce that the Department of Electronics and Communication Engineering at EA.jpg.jpeg';
import achImg2 from '../assets/faculty achivment/ECET is proud to announce that the Department of Electronics and Communication Engineering at EA (1).jpg.jpeg';
import achImg3 from '../assets/faculty achivment/ECET is proud to announce that the Department of Electronics and Communication Engineering at EA (2).jpg.jpeg';



const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const { data } = await getFaculty();
        if (data && data.length > 0) {
          setFacultyList(data);
        }
      } catch (error) {
        console.error('Error fetching faculty:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our Faculty</h1>
          <p className="page-subtitle">Meet our team of dedicated educators and researchers.</p>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="faculty-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="card glass loading-skeleton" style={{ height: '350px' }}></div>
            ))}
          </div>
        ) : (
          <div className="faculty-grid">
            {facultyList.length > 0 ? (
              facultyList.map(faculty => (
                <div key={faculty._id} className="card glass faculty-card animate-fade-in">
                  <img src={getImageUrl(faculty.imageUrl)} alt={faculty.name} className="faculty-image" />
                  <h3>{faculty.name} {faculty.isHOD && '(HOD)'}</h3>
                  <p className="designation">{faculty.designation}</p>
                  <p className="specialization">{faculty.qualification}</p>
                  <p className="specialization mb-4">{faculty.specialization}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <a href={`mailto:${faculty.email}`} className="btn-secondary p-2" style={{ borderRadius: '50%' }} title="Email">
                      <Mail size={18} />
                    </a>
                    <a href="#" className="btn-secondary p-2" style={{ borderRadius: '50%' }} title="Publications">
                      <Book size={18} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>No faculty data available yet.</p>
            )}
          </div>
        )}
      </div>

      <div className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Faculty Achievements</h2>
        
        <div className="card glass" style={{ padding: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          <h3 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Tech Forum Research Foundation Awards 2024</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            ECET is proud to announce that the Department of Electronics and Communication Engineering at EASA College of Engineering and Technology has been honoured with the 'Best Faculty Award 2024' by the Tech Forum Research Foundation (MSME Registered, Recognized by the Government of India, and ISO Certified). We extend our heartfelt thanks to our esteemed leader for the constant motivation and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1.5rem' }}>
          {[
            { name: "Dr. N. Kaleeswari", award: "'Best HoD Award' and 'Best Faculty Award 2024'", image: achImg1 },
            { name: "Mr. N. Arunprasath", award: "'Best Innovative Faculty' and 'Best Faculty Award 2024'", image: achImg2 },
            { name: "Mr. M. SivaKumar", award: "'Best Faculty Award 2024'", image: achImg3 }
          ].map((item, index) => (
            <div key={index} className="card glass animate-fade-in" style={{ padding: '1.5rem', animationDelay: `${(index % 3) * 100}ms`, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '0.5rem' }} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{item.name}</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.award}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faculty;
