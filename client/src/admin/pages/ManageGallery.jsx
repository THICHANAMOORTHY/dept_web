import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X } from 'lucide-react';

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'General' });

  const fetchGallery = async () => {
    try {
      const res = await api.get('/admin/gallery');
      setGallery(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchGallery(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({ title: item.title, category: item.category || 'General' });
    } else {
      setCurrentItem(null);
      setFormData({ title: '', category: 'General' });
    }
    setImageFile(null); setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);
    try {
      if (currentItem) await api.put(`/admin/gallery/${currentItem._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/admin/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchGallery(); setIsModalOpen(false);
    } catch (err) { console.error(err); }
  };

  const columns = [
    { header: 'Image', accessor: 'imageUrl', render: (row) => <img src={row.imageUrl ? `http://localhost:5000${row.imageUrl}` : 'https://via.placeholder.com/40'} alt="thumb" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /> },
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Manage Gallery</h2>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}><Plus size={18} /> Add New</button>
      </div>
      <DataTable columns={columns} data={gallery} onEdit={handleOpenModal} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{currentItem ? 'Edit Image' : 'Add Image'}</h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none' }}><X /></button>
          </div>
          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="gallery-form" onSubmit={handleSubmit}>
              <ImageUploader currentImage={currentItem?.imageUrl ? `http://localhost:5000${currentItem.imageUrl}` : null} onChange={setImageFile} />
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Image Title" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category / Album" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
            </form>
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '1rem' }}>Cancel</button>
            <button type="submit" form="gallery-form" className="btn btn-primary">Save</button>
          </div>
        </div>
      )}
      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/gallery/${currentItem._id}`); fetchGallery(); setDeleteModalOpen(false); }} itemName={currentItem?.title} />
    </div>
  );
};
export default ManageGallery;
