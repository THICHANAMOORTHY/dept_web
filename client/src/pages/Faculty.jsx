import { useEffect, useState } from 'react';
import { getFaculty } from '../services/api';
import { Mail, Book } from 'lucide-react';
import './Page.css';

const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const { data } = await getFaculty();
        setFacultyList(data);
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
            {facultyList.map(faculty => (
              <div key={faculty._id} className="card glass faculty-card animate-fade-in">
                <img src={faculty.imageUrl} alt={faculty.name} className="faculty-image" />
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty;
