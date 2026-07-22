import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../services/api';
import { Upload } from 'lucide-react';

const ManageCurriculum = () => {
  const [file, setFile] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings');
        if (res.data && res.data.curriculumPdfUrl) {
          setCurrentUrl(res.data.curriculumPdfUrl);
        }
      } catch (err) { console.error(err); }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file first.');

    const data = new FormData();
    data.append('curriculumPdf', file);

    try {
      const res = await api.post('/admin/curriculum', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setCurrentUrl(res.data.curriculumPdfUrl);
      setFile(null);
      alert('Curriculum uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ maxWidth: '800px', backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0, marginBottom: '2rem' }}>Manage Curriculum</h2>
      
      {currentUrl && (
        <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Current Curriculum</h3>
          <a href={getImageUrl(currentUrl)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            View Current PDF
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h3>Upload New Curriculum (PDF)</h3>
        <div style={{ 
          border: '2px dashed #ccc', 
          padding: '2rem', 
          textAlign: 'center', 
          borderRadius: '8px',
          marginBottom: '1rem',
          backgroundColor: '#fafafa',
          cursor: 'pointer'
        }} onClick={() => document.getElementById('pdf-upload').click()}>
          <Upload size={40} color="#9ca3af" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ margin: 0, color: '#6b7280' }}>
            {file ? file.name : 'Click to browse for a PDF file'}
          </p>
          <input
            id="pdf-upload"
            type="file"
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files.length > 0) setFile(e.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
          Upload PDF
        </button>
      </form>
    </div>
  );
};

export default ManageCurriculum;
