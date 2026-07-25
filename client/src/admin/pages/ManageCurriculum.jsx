import React, { useState, useEffect, useRef } from 'react';
import api, { getImageUrl } from '../../services/api';
import { Upload, BookOpen, FileText } from 'lucide-react';

const ManageCurriculum = () => {
  const [regulation, setRegulation] = useState('r2024');
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState({});
  const pdfInputRef = useRef(null);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/admin/settings');
      if (res.data) {
        setSettings(res.data);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file first.');

    const data = new FormData();
    data.append('curriculumPdf', file);
    data.append('regulation', regulation);

    try {
      const res = await api.post('/admin/curriculum', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSettings(res.data);
      setFile(null);
      alert(`Curriculum PDF for ${regulation === 'r2021' ? 'Regulations 2021 (R2021)' : 'Regulations 2024 (R2024)'} uploaded successfully!`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ maxWidth: '850px', backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BookOpen size={24} color="#2c2c6c" /> Manage Curriculum & Regulations
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Upload and update curriculum syllabus documents for Regulations 2024 (R2024) and Regulations 2021 (R2021).
      </p>
      
      {/* Current Uploaded Documents */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Regulations 2024 (R2024)</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Active Autonomous Choice Based Credit System</p>
          {settings.curriculumPdfUrl ? (
            <a href={getImageUrl(settings.curriculumPdfUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
              <FileText size={16} /> View R2024 PDF
            </a>
          ) : (
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No R2024 PDF uploaded yet</span>
          )}
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Regulations 2021 (R2021)</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Anna University Choice Based Credit System</p>
          {settings.curriculumPdf2021Url ? (
            <a href={getImageUrl(settings.curriculumPdf2021Url)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
              <FileText size={16} /> View R2021 PDF
            </a>
          ) : (
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No R2021 PDF uploaded yet</span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Upload Curriculum PDF</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>
            Select Regulation Version *
          </label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: regulation === 'r2024' ? '#e0e7ff' : 'white' }}>
              <input
                type="radio"
                name="regulation"
                value="r2024"
                checked={regulation === 'r2024'}
                onChange={() => setRegulation('r2024')}
              />
              <strong>Regulations 2024 (R2024)</strong>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: regulation === 'r2021' ? '#e0e7ff' : 'white' }}>
              <input
                type="radio"
                name="regulation"
                value="r2021"
                checked={regulation === 'r2021'}
                onChange={() => setRegulation('r2021')}
              />
              <strong>Regulations 2021 (R2021)</strong>
            </label>
          </div>
        </div>

        <div style={{ 
          border: '2px dashed #cbd5e1', 
          padding: '2rem', 
          textAlign: 'center', 
          borderRadius: '8px',
          marginBottom: '1.5rem',
          backgroundColor: '#fafafa',
          cursor: 'pointer'
        }} onClick={() => pdfInputRef.current && pdfInputRef.current.click()}>
          <Upload size={40} color="#9ca3af" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ margin: 0, color: '#475569', fontWeight: 500 }}>
            {file ? file.name : `Click to browse PDF for ${regulation === 'r2021' ? 'Regulations 2021' : 'Regulations 2024'}`}
          </p>
          <input
            ref={pdfInputRef}
            type="file"
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files.length > 0) setFile(e.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', backgroundColor: '#2c2c6c', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
          Upload {regulation === 'r2021' ? 'R2021' : 'R2024'} PDF
        </button>
      </form>
    </div>
  );
};

export default ManageCurriculum;
