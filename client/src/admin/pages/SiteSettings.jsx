import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ImageUploader from '../components/ImageUploader';

const SiteSettings = () => {
  const [formData, setFormData] = useState({
    studentFacultyRatio: '', placementRatio: '', facultyCount: '', rankingText: '',
    phoneNumbers: '', email: '', address: '',
    socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' }
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentHeroUrl, setCurrentHeroUrl] = useState(null);

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
            phoneNumbers: data.phoneNumbers ? data.phoneNumbers.join(', ') : '',
            email: data.email || '',
            address: data.address || '',
            socialLinks: data.socialLinks || { facebook: '', twitter: '', linkedin: '', instagram: '' }
          });
          setCurrentHeroUrl(data.heroBannerUrl);
        }
      } catch (err) { console.error(err); }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.split('_')[1];
      setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [socialKey]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'socialLinks') {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === 'phoneNumbers') {
        data.append(key, formData[key].split(',').map(s => s.trim()));
      } else {
        data.append(key, formData[key]);
      }
    });
    if (imageFile) data.append('image', imageFile);

    try {
      await api.put('/admin/settings', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Settings saved successfully!');
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ maxWidth: '800px', backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Site Settings</h2>
      <form onSubmit={handleSubmit}>
        <h3>Hero Banner</h3>
        <ImageUploader currentImage={currentHeroUrl ? `http://localhost:5000${currentHeroUrl}` : null} onChange={setImageFile} />
        
        <h3>Statistics Strip</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" name="studentFacultyRatio" value={formData.studentFacultyRatio} onChange={handleChange} placeholder="Student:Faculty Ratio" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="text" name="placementRatio" value={formData.placementRatio} onChange={handleChange} placeholder="Placement Ratio" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="text" name="facultyCount" value={formData.facultyCount} onChange={handleChange} placeholder="Faculty Count" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="text" name="rankingText" value={formData.rankingText} onChange={handleChange} placeholder="Ranking Text" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <h3>Contact Information</h3>
        <input type="text" name="phoneNumbers" value={formData.phoneNumbers} onChange={handleChange} placeholder="Phone Numbers (comma separated)" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', boxSizing: 'border-box' }} />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', boxSizing: 'border-box' }} />
        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Physical Address" style={{ width: '100%', padding: '0.75rem', marginBottom: '2rem', boxSizing: 'border-box' }} />

        <h3>Social Links</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" name="social_facebook" value={formData.socialLinks.facebook} onChange={handleChange} placeholder="Facebook URL" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="text" name="social_twitter" value={formData.socialLinks.twitter} onChange={handleChange} placeholder="Twitter URL" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="text" name="social_linkedin" value={formData.socialLinks.linkedin} onChange={handleChange} placeholder="LinkedIn URL" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="text" name="social_instagram" value={formData.socialLinks.instagram} onChange={handleChange} placeholder="Instagram URL" style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Save Changes</button>
      </form>
    </div>
  );
};

export default SiteSettings;
