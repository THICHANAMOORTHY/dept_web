import React, { useState, useEffect } from 'react';
import api, { getImageUrl, DEFAULT_IMAGE_PLACEHOLDER } from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X } from 'lucide-react';

const ManageLabs = () => {
  const [labs, setLabs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const fetchLabs = async () => {
    try {
      const res = await api.get('/admin/labs');
      setLabs(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchLabs(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({ 
        name: item.name || '', 
        description: item.description || '' 
      });
    } else {
      setCurrentItem(null);
      setFormData({ name: '', description: '' });
    }
    setImageFile(null); 
    setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    if (imageFile) data.append('image', imageFile);
    
    try {
      const itemId = currentItem?._id || currentItem?.id;
      if (currentItem && itemId) await api.put(`/admin/labs/${itemId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/admin/labs', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchLabs(); 
      setIsModalOpen(false);
    } catch (err) { console.error(err); }
  };

  const columns = [
    { header: 'Lab Image', accessor: 'imageUrl', render: (row) => <img src={row.imageUrl ? getImageUrl(row.imageUrl) : DEFAULT_IMAGE_PLACEHOLDER} alt="lab" style={{ width: '60px', height: '40px', objectFit: 'contain', backgroundColor: '#ffffff', padding: '2px', border: '1px solid #e5e7eb', borderRadius: '4px' }} /> },
    { header: 'Lab Name', accessor: 'name' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Manage Laboratories & Facilities</h2>
          <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>Upload laboratory images and names to display in the 4-column card gallery.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F5A623', color: '#2c2c6c', fontWeight: 'bold', padding: '0.6rem 1.2rem', border: 'none', borderRadius: '999px', cursor: 'pointer' }}>
          <Plus size={18} /> Add New Lab
        </button>
      </div>

      <DataTable columns={columns} data={labs} onEdit={handleOpenModal} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{currentItem ? 'Edit Lab' : 'Add New Lab'}</h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={24} /></button>
          </div>

          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="lab-form" onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Lab Image / Illustration *</label>
                <ImageUploader currentImage={currentItem?.imageUrl ? getImageUrl(currentItem.imageUrl) : null} onChange={setImageFile} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Lab Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Digital Systems and Networks Laboratory"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Short Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional brief details about the lab..."
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box', minHeight: '80px' }}
                />
              </div>
            </form>
          </div>

          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" form="lab-form" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2c2c6c', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>Save Lab</button>
          </div>
        </div>
      )}

      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/labs/${currentItem._id || currentItem.id}`); fetchLabs(); setDeleteModalOpen(false); }} itemName={currentItem?.name} />
    </div>
  );
};

export default ManageLabs;
