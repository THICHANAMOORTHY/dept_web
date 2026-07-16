import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';

const ImageUploader = ({ onChange, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);

  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
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
        {preview ? (
          <img src={preview} alt="Preview" style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }} />
        ) : (
          <div style={{ color: '#6b7280' }}>
            <Upload size={32} style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ margin: 0 }}>Click to upload image</p>
          </div>
        )}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
