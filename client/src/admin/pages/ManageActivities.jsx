import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X } from 'lucide-react';

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({ title: '', category: 'General', description: '' });

  const fetchActivities = async () => {
    try {
      const res = await api.get('/admin/activities');
      setActivities(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchActivities(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({ title: item.title, category: item.category || 'General', description: item.description || '' });
    } else {
      setCurrentItem(null);
      setFormData({ title: '', category: 'General', description: '' });
    }
    setImageFiles([]); setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach(file => data.append('images', file));
    }
    try {
      if (currentItem) await api.put(`/admin/activities/${currentItem._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/admin/activities', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchActivities(); setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  const columns = [
    { header: 'Image', accessor: 'imageUrl', render: (row) => <img src={getImageUrl(row.imageUrl)} alt="thumb" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /> },
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Manage Department Activities</h2>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}><Plus size={18} /> Add New</button>
      </div>
      <DataTable columns={columns} data={activities} onEdit={handleOpenModal} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{currentItem ? 'Edit Image' : 'Add Image'}</h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none' }}><X /></button>
          </div>
          <form id="activity-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: 0 }}>
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
                <ImageUploader 
                  multiple={true}
                  currentImage={currentItem?.images && currentItem.images.length > 0 ? currentItem.images.map(img => getImageUrl(img)) : (currentItem?.imageUrl ? [getImageUrl(currentItem.imageUrl)] : null)} 
                  onChange={setImageFiles} 
                />
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Image Title" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category / Album" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', minHeight: '100px' }} />
            </div>
            <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '1rem' }}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/activities/${currentItem._id}`); fetchActivities(); setDeleteModalOpen(false); }} itemName={currentItem?.title} />
    </div>
  );
};
export default ManageActivities;
