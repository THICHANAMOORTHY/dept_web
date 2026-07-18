import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';

const ImageUploader = ({ onChange, currentImage, multiple = false }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (currentImage) {
      if (Array.isArray(currentImage)) {
        setPreviews(currentImage);
      } else {
        setPreviews([currentImage]);
      }
    } else {
      setPreviews([]);
    }
  }, [currentImage]);

  const handleFileChange = (e) => {
    if (multiple) {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        setPreviews(files.map(f => URL.createObjectURL(f)));
        onChange(files);
      }
    } else {
      const file = e.target.files[0];
      if (file) {
        setPreviews([URL.createObjectURL(file)]);
        onChange(file);
      }
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Image Upload</label>
      <div style={{
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        backgroundColor: '#f9fafb',
        cursor: 'pointer'
      }} onClick={() => document.getElementById('image-upload').click()}>
        {previews.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {previews.map((src, i) => (
              <img key={i} src={src} alt="Preview" style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }} />
            ))}
          </div>
        ) : (
          <div style={{ color: '#6b7280' }}>
            <Upload size={32} style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ margin: 0 }}>Click to upload image{multiple ? 's' : ''}</p>
          </div>
        )}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
