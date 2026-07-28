import React, { useState, useEffect } from 'react';
import api, { getImageUrl, DEFAULT_IMAGE_PLACEHOLDER } from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X, Sparkles, Trash2 } from 'lucide-react';

const ManagePlacements = () => {
  const [placements, setPlacements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ company: '', recruiterName: '', package: '', year: '', studentsPlaced: '' });

  // Highlights state
  const [highlightForm, setHighlightForm] = useState({ title: '', text: '' });
  const [highlightFile, setHighlightFile] = useState(null);
  const [currentHighlightUrl, setCurrentHighlightUrl] = useState(null);
  const [highlightSaving, setHighlightSaving] = useState(false);

  const fetchPlacements = async () => {
    try {
      const res = await api.get('/admin/placements');
      setPlacements(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchSettings = async () => {
    try {
      const res = await api.get('/admin/settings');
      if (res.data) {
        setHighlightForm({
          title: res.data.placementHighlightTitle || '',
          text: res.data.placementHighlightText || ''
        });
        setCurrentHighlightUrl(res.data.placementHighlightUrl || null);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => { 
    fetchPlacements(); 
    fetchSettings();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({ company: item.company, recruiterName: item.recruiterName || '', package: item.package || '', year: item.year || '', studentsPlaced: item.studentsPlaced || '' });
    } else {
      setCurrentItem(null);
      setFormData({ company: '', recruiterName: '', package: '', year: new Date().getFullYear(), studentsPlaced: '' });
    }
    setImageFile(null); 
    setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);
    try {
      if (currentItem) await api.put(`/admin/placements/${currentItem._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/admin/placements', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchPlacements(); 
      setIsModalOpen(false);
    } catch (err) { console.error(err); }
  };

  const handleHighlightSubmit = async (e) => {
    e.preventDefault();
    setHighlightSaving(true);
    const data = new FormData();
    data.append('title', highlightForm.title);
    data.append('text', highlightForm.text);
    if (highlightFile) {
      data.append('image', highlightFile);
    } else if (!currentHighlightUrl) {
      data.append('removeBanner', 'true');
    }

    try {
      const res = await api.post('/admin/placement-highlight', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.data) {
        setCurrentHighlightUrl(res.data.placementHighlightUrl || null);
        setHighlightFile(null);
        alert('Placement Highlights saved successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving highlights: ' + (err.response?.data?.message || err.message));
    } finally {
      setHighlightSaving(false);
    }
  };

  const handleDeleteHighlight = async () => {
    if (!window.confirm('Are you sure you want to remove the Placement Highlight banner?')) return;
    try {
      const data = new FormData();
      data.append('removeBanner', 'true');
      data.append('title', highlightForm.title);
      data.append('text', highlightForm.text);
      await api.post('/admin/placement-highlight', data);
      setCurrentHighlightUrl(null);
      setHighlightFile(null);
      alert('Placement Highlight banner removed successfully!');
    } catch (err) {
      console.error(err);
      alert('Error removing banner: ' + (err.response?.data?.message || err.message));
    }
  };

  const columns = [
    { header: 'Image', accessor: 'logoUrl', render: (row) => <img src={row.logoUrl ? getImageUrl(row.logoUrl) : DEFAULT_IMAGE_PLACEHOLDER} alt="placement photo" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} /> },
    { header: 'Company / Title', accessor: 'company' },
    { header: 'Year', accessor: 'year' },
  ];

  return (
    <div style={{ maxWidth: '1000px' }}>
      {/* Placement Highlights Admin Panel */}
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#111827' }}>
          <Sparkles size={22} color="#2c2c6c" /> Placement Highlights (2026 Banner & Details)
        </h3>
        <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
          Upload a high-resolution Placement Highlights banner photo for 2026 to display prominently on the public Placements page.
        </p>

        <form onSubmit={handleHighlightSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Section Title</label>
              <input
                type="text"
                value={highlightForm.title}
                onChange={(e) => setHighlightForm({ ...highlightForm, title: e.target.value })}
                placeholder="e.g. Placement Highlights - 2026"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Highlights Description</label>
              <input
                type="text"
                value={highlightForm.text}
                onChange={(e) => setHighlightForm({ ...highlightForm, text: e.target.value })}
                placeholder="e.g. Celebrating stellar placement achievements of our ECE Class of 2026"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Banner Image / Poster</label>
            <ImageUploader
              currentImage={currentHighlightUrl ? getImageUrl(currentHighlightUrl) : null}
              onChange={(file) => {
                setHighlightFile(file);
                if (!file) setCurrentHighlightUrl(null);
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button type="submit" disabled={highlightSaving} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2c2c6c', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
              {highlightSaving ? 'Saving...' : 'Save Placement Highlights'}
            </button>
            {currentHighlightUrl && (
              <button type="button" onClick={handleDeleteHighlight} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.75rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem' }}>
                <Trash2 size={16} /> Remove Banner
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Placement Photos / Records Admin Panel */}
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>Placement Photos & Recruiter Cards</h2>
            <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>Add individual placement photos, offer letters, or company recruiter logos.</p>
          </div>
          <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F5A623', color: '#2c2c6c', fontWeight: 'bold', padding: '0.6rem 1.2rem', border: 'none', borderRadius: '999px', cursor: 'pointer' }}>
            <Plus size={18} /> Add New Photo
          </button>
        </div>

        <DataTable columns={columns} data={placements} onEdit={handleOpenModal} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{currentItem ? 'Edit Photo Entry' : 'Add Photo Entry'}</h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={24} /></button>
          </div>
          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="placement-form" onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Placement Photo / Logo *</label>
                <ImageUploader currentImage={currentItem?.logoUrl ? getImageUrl(currentItem.logoUrl) : null} onChange={setImageFile} />
              </div>
              <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company / Photo Title *" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
              <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Placement Year (e.g. 2026)" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
            </form>
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" form="placement-form" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2c2c6c', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Save Photo</button>
          </div>
        </div>
      )}

      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/placements/${currentItem._id}`); fetchPlacements(); setDeleteModalOpen(false); }} itemName={currentItem?.company} />
    </div>
  );
};

export default ManagePlacements;
