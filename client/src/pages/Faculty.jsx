import { useEffect, useState } from 'react';
import { getFaculty, getFacultyAchievements, getImageUrl, DEFAULT_AVATAR, DEFAULT_IMAGE_PLACEHOLDER } from '../services/api';
import { Mail, Book, Search, Trophy, Award, ArrowRight } from 'lucide-react';
import DetailModal from '../components/DetailModal';
import ProgressiveImage from '../components/ProgressiveImage';
import './Page.css';

const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [facultyAchievements, setFacultyAchievements] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

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

    const fetchAchievements = async () => {
      try {
        const { data } = await getFacultyAchievements();
        if (data && data.length > 0) {
          setFacultyAchievements(data);
        }
      } catch (error) {
        console.error('Error fetching faculty achievements:', error);
      }
    };
    fetchAchievements();
  }, []);

  const filteredFaculty = facultyList.filter((faculty) => {
    const matchesSearch =
      faculty.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.specialization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.qualification?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'HOD') return faculty.isHOD;
    if (selectedFilter === 'Professors') return faculty.designation?.toLowerCase().includes('professor');
    return true;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Our Faculty</h1>
          <p className="page-subtitle">Meet our team of dedicated educators and researchers.</p>
        </div>
      </div>

      <div className="container">
        {/* Search and Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search by name, designation, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.75rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0,0,0,0.12)',
                backgroundColor: 'white',
                fontSize: '0.95rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['All', 'HOD', 'Professors'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  border: '1px solid ' + (selectedFilter === filter ? 'var(--primary-color)' : '#e5e7eb'),
                  backgroundColor: selectedFilter === filter ? 'var(--primary-color)' : 'white',
                  color: selectedFilter === filter ? 'white' : '#374151',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {filter === 'All' ? 'All Faculty' : filter === 'HOD' ? 'HOD Only' : 'Professors'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="faculty-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="card glass loading-skeleton" style={{ height: '350px' }}></div>
            ))}
          </div>
        ) : (
          <div className="faculty-grid">
            {filteredFaculty.length > 0 ? (
              filteredFaculty.map((faculty, index) => (
                <div key={faculty._id || faculty.id || faculty.name || index} className="card glass faculty-card animate-fade-in">
                  <ProgressiveImage
                    src={getImageUrl(faculty.imageUrl)}
                    alt={faculty.name}
                    className="faculty-image"
                    fallbackType="avatar"
                    containerStyle={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1rem' }}
                  />
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
        <div className="section-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem' }}>
          <h2>Faculty <span className="gradient-text">Achievements</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.1rem' }}>Recognitions, awards, and honors earned by our distinguished faculty members</p>
          <div className="section-line" style={{ marginTop: '1rem' }}></div>
        </div>
        
        {facultyAchievements.length > 0 ? (
          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            {facultyAchievements.map((item, index) => {
              const textContent = item.description || '';
              const isLong = textContent.length > 100;
              const displayText = isLong ? textContent.substring(0, 100) + '...' : textContent;

              return (
                <div key={item._id || item.id || index} className="card glass animate-fade-in" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    width: '100%',
                    height: '240px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: '0.75rem',
                    position: 'relative'
                  }}>
                    {item.imageUrl ? (
                      <ProgressiveImage
                        src={getImageUrl(item.imageUrl)}
                        alt={item.name}
                        containerStyle={{ width: '100%', height: '100%' }}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          display: 'block',
                          borderRadius: '0.5rem'
                        }}
                      />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                        <Award size={54} />
                      </div>
                    )}
                    {item.year && (
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }}>
                        {item.year}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      {item.name}
                    </h4>

                    {item.award && (
                      <span style={{
                        display: 'inline-block',
                        padding: '0.35rem 0.85rem',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        color: 'var(--primary-color)',
                        borderRadius: '1rem',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        alignSelf: 'flex-start',
                        marginBottom: '0.75rem'
                      }}>
                        {item.award}
                      </span>
                    )}

                    {item.title && (
                      <p style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {item.title}
                      </p>
                    )}

                    {item.description && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.6', flex: 1, margin: 0 }}>
                        {displayText}
                      </p>
                    )}

                    <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setSelectedAchievement(item)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Read More <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card glass" style={{ textAlign: 'center', padding: '3rem' }}>
            <Trophy size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
            <h3>No faculty achievement records uploaded yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Faculty achievements added in the Admin panel will automatically appear here.
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal for Faculty Achievements */}
      <DetailModal
        isOpen={Boolean(selectedAchievement)}
        onClose={() => setSelectedAchievement(null)}
        title={selectedAchievement?.name}
        subtitle={selectedAchievement?.year ? String(selectedAchievement.year) : null}
        badge={selectedAchievement?.award || 'Faculty Achievement'}
        imageUrl={selectedAchievement?.imageUrl ? getImageUrl(selectedAchievement.imageUrl) : null}
        description={selectedAchievement?.description}
        details={
          selectedAchievement?.title ? [{ label: 'Achievement Title / Topic', value: selectedAchievement.title }] : []
        }
      />
    </div>
  );
};

export default Faculty;
