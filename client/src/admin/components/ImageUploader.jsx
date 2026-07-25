import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';

const ImageUploader = ({ onChange, currentImage, multiple = false }) => {
  const [items, setItems] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentImage) {
      if (Array.isArray(currentImage)) {
        setItems(currentImage);
      } else {
        setItems([currentImage]);
      }
    } else {
      setItems([]);
    }
  }, [currentImage]);

  const getPreviewUrl = (item) => {
    if (typeof item === 'string') return item;
    if (item instanceof File) return URL.createObjectURL(item);
    return '';
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    if (multiple) {
      const updatedItems = [...items, ...selectedFiles];
      setItems(updatedItems);
      const fileObjects = updatedItems.filter(item => item instanceof File);
      onChange(fileObjects.length > 0 ? fileObjects : updatedItems);
    } else {
      const singleFile = selectedFiles[0];
      setItems([singleFile]);
      onChange(singleFile);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveItem = (index, e) => {
    e.stopPropagation();
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    if (multiple) {
      const fileObjects = updatedItems.filter(item => item instanceof File);
      onChange(fileObjects);
    } else {
      onChange(null);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
        {multiple ? 'Image Upload (Multiple Images Supported)' : 'Image Upload'}
      </label>

      {items.length > 0 ? (
        <div style={{
          border: '2px dashed #d1d5db',
          borderRadius: '8px',
          padding: '1rem',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'flex-start', alignItems: 'center' }}>
            {items.map((item, i) => (
              <div key={i} style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                <img
                  src={getPreviewUrl(item)}
                  alt={`Preview ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={(e) => handleRemoveItem(i, e)}
                  title="Remove image"
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    zIndex: 5
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {multiple && (
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '6px',
                  border: '2px dashed #9ca3af',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#4b5563',
                  fontSize: '0.75rem',
                  gap: '0.25rem'
                }}
              >
                <Plus size={22} color="#4f46e5" />
                <span style={{ fontWeight: 600 }}>Add More</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            cursor: 'pointer'
          }}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <div style={{ color: '#6b7280' }}>
            <Upload size={32} style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ margin: 0, fontWeight: 500 }}>
              Click to select image{multiple ? 's (select multiple files)' : ''}
            </p>
            {multiple && <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>Select multiple files at once or add them one by one</p>}
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
