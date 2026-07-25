import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../services/api';
import ImageUploader from '../components/ImageUploader';

const SiteSettings = () => {
  const [formData, setFormData] = useState({
    studentFacultyRatio: '',
    placementRatio: '',
    facultyCount: '',
    rankingText: '',
    phoneNumbers: '',
    email: '',
    address: '',
    socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' },
    hodTitle: 'Welcome from the Head of the Department',
    hodName: '',
    hodMessage: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [hodPhotoFile, setHodPhotoFile] = useState(null);
  const [currentHeroUrl, setCurrentHeroUrl] = useState(null);
  const [currentHodPhotoUrl, setCurrentHodPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings');
        if (res.data) {
          const data = res.data;
          setFormData({
            studentFacultyRatio: data.studentFacultyRatio || '',
            placementRatio: data.placementRatio || '',
            facultyCount: data.facultyCount || '',
            rankingText: data.rankingText || '',
            phoneNumbers: data.phoneNumbers ? (Array.isArray(data.phoneNumbers) ? data.phoneNumbers.join(', ') : data.phoneNumbers) : '',
            email: data.email || '',
            address: data.address || '',
            socialLinks: data.socialLinks || {
              facebook: data.facebookUrl || '',
              twitter: data.twitterUrl || '',
              linkedin: data.linkedinUrl || '',
              instagram: data.instagramUrl || ''
            },
            hodTitle: data.hodTitle || 'Welcome from the Head of the Department',
            hodName: data.hodName || '',
            hodMessage: data.hodMessage || ''
          });
          setCurrentHeroUrl(data.heroBannerUrl);
          setCurrentHodPhotoUrl(data.hodPhotoUrl);
        }
      } catch (err) {
        console.error('Error fetching site settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialKey]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'socialLinks') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'phoneNumbers') {
        data.append(key, typeof formData[key] === 'string' ? formData[key] : JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key] || '');
      }
    });

    if (imageFile) data.append('image', imageFile);
    if (hodPhotoFile) data.append('hodPhoto', hodPhotoFile);

    try {
      const res = await api.put('/admin/settings', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatusMessage({ type: 'success', text: 'Site settings updated successfully!' });
      if (res.data) {
        if (res.data.heroBannerUrl) setCurrentHeroUrl(res.data.heroBannerUrl);
        if (res.data.hodPhotoUrl) setCurrentHodPhotoUrl(res.data.hodPhotoUrl);
      }
    } catch (err) {
      console.error('Error updating site settings:', err);
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update site settings. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '800px', backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
        <p>Loading site settings...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '840px', backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', pb: '1rem' }}>
        <h2 style={{ margin: 0, color: '#111827' }}>Site Settings</h2>
        <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
          Configure main banner, HOD welcome section, stats, contact info, and social links.
        </p>
      </div>

      {statusMessage && (
        <div
          style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '6px',
            backgroundColor: statusMessage.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: statusMessage.type === 'success' ? '#15803d' : '#b91c1c',
            border: `1px solid ${statusMessage.type === 'success' ? '#bbf7d0' : '#fca5a5'}`,
            fontWeight: 500
          }}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#1f2937', marginBottom: '1rem' }}>Hero Banner Image</h3>
          <ImageUploader currentImage={currentHeroUrl ? getImageUrl(currentHeroUrl) : null} onChange={setImageFile} />
        </section>

        <section style={{ marginBottom: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#1f2937', marginBottom: '1rem' }}>HOD Welcome Message & Photo</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>HOD Photo</label>
            <ImageUploader currentImage={currentHodPhotoUrl ? getImageUrl(currentHodPhotoUrl) : null} onChange={setHodPhotoFile} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>HOD Section Heading</label>
            <input
              type="text"
              name="hodTitle"
              value={formData.hodTitle}
              onChange={handleChange}
              placeholder="e.g. Welcome from the Head of the Department"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>HOD Name (Optional)</label>
            <input
              type="text"
              name="hodName"
              value={formData.hodName}
              onChange={handleChange}
              placeholder="e.g. Dr. N. Kaleeswari, M.E., Ph.D."
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#374151' }}>HOD Message / Quote</label>
            <textarea
              name="hodMessage"
              value={formData.hodMessage}
              onChange={handleChange}
              rows={5}
              placeholder="Welcome to the Department of Electronics and Communication Engineering..."
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }}
            />
          </div>
        </section>

        <section style={{ marginBottom: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#1f2937', marginBottom: '1rem' }}>Statistics Strip</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Student:Faculty Ratio</label>
              <input type="text" name="studentFacultyRatio" value={formData.studentFacultyRatio} onChange={handleChange} placeholder="e.g. 15:1" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Placement Ratio</label>
              <input type="text" name="placementRatio" value={formData.placementRatio} onChange={handleChange} placeholder="e.g. 100%" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Faculty Count</label>
              <input type="text" name="facultyCount" value={formData.facultyCount} onChange={handleChange} placeholder="e.g. 50+" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Ranking / Accreditation Text</label>
              <input type="text" name="rankingText" value={formData.rankingText} onChange={handleChange} placeholder="e.g. NBA Accredited" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#1f2937', marginBottom: '1rem' }}>Contact Information</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Phone Numbers (comma separated)</label>
            <input type="text" name="phoneNumbers" value={formData.phoneNumbers} onChange={handleChange} placeholder="+91-9364445555, 0422-2656871" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="info@easacollege.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Physical Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="NH-47, Palakkad Main Road, Navakkarai, Coimbatore..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} rows={3} />
          </div>
        </section>

        <section style={{ marginBottom: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#1f2937', marginBottom: '1rem' }}>Social Media Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Facebook URL</label>
              <input type="text" name="social_facebook" value={formData.socialLinks.facebook} onChange={handleChange} placeholder="https://facebook.com/..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Twitter / X URL</label>
              <input type="text" name="social_twitter" value={formData.socialLinks.twitter} onChange={handleChange} placeholder="https://twitter.com/..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>LinkedIn URL</label>
              <input type="text" name="social_linkedin" value={formData.socialLinks.linkedin} onChange={handleChange} placeholder="https://linkedin.com/..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.875rem', color: '#4b5563' }}>Instagram URL</label>
              <input type="text" name="social_instagram" value={formData.socialLinks.instagram} onChange={handleChange} placeholder="https://instagram.com/..." style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
          </div>
        </section>

        <div style={{ marginTop: '2.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.75rem 2.5rem',
              backgroundColor: saving ? '#9ca3af' : '#2c2c6c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: '0.95rem'
            }}
          >
            {saving ? 'Saving Settings...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;
