import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X } from 'lucide-react';

const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ title: '', studentNames: '', year: '', description: '', tags: '' });

  const fetchAchievements = async () => {
    try {
      const res = await api.get('/admin/achievements');
      setAchievements(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAchievements(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({ 
        title: item.title, 
        studentNames: item.studentNames ? item.studentNames.join(', ') : '', 
        year: item.year || '', 
        description: item.description || '', 
        tags: item.tags ? item.tags.join(', ') : '' 
      });
    } else {
      setCurrentItem(null);
      setFormData({ title: '', studentNames: '', year: new Date().getFullYear(), description: '', tags: '' });
    }
    setImageFile(null); setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('year', formData.year);
    data.append('description', formData.description);
    
    formData.studentNames.split(',').forEach(item => {
      const trimmed = item.trim();
      if(trimmed) data.append('studentNames[]', trimmed);
    });

    formData.tags.split(',').forEach(item => {
      const trimmed = item.trim();
      if(trimmed) data.append('tags[]', trimmed);
    });

    if (imageFile) data.append('image', imageFile);
    
    try {
      if (currentItem) await api.put(`/admin/achievements/${currentItem._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/admin/achievements', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchAchievements(); setIsModalOpen(false);
    } catch (err) { console.error(err); }
  };

  const columns = [
    { header: 'Image', accessor: 'imageUrl', render: (row) => <img src={row.imageUrl ? getImageUrl(row.imageUrl) : 'https://via.placeholder.com/40'} alt="achievement" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /> },
    { header: 'Achievement Title', accessor: 'title' },
    { header: 'Year', accessor: 'year' },
    { header: 'Students', accessor: 'studentNames', render: (row) => row.studentNames?.join(', ') }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Manage Student Achievements</h2>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}><Plus size={18} /> Add New</button>
      </div>
      <DataTable columns={columns} data={achievements} onEdit={handleOpenModal} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{currentItem ? 'Edit Achievement' : 'Add Achievement'}</h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none' }}><X /></button>
          </div>
          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="project-form" onSubmit={handleSubmit}>
              <ImageUploader currentImage={currentItem?.imageUrl ? getImageUrl(currentItem.imageUrl) : null} onChange={setImageFile} />
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Achievement Title" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="text" name="studentNames" value={formData.studentNames} onChange={handleChange} placeholder="Student Names (comma separated)" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Achievement Description" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', minHeight: '100px' }} />
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
            </form>
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '1rem' }}>Cancel</button>
            <button type="submit" form="project-form" className="btn btn-primary">Save</button>
          </div>
        </div>
      )}
      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/achievements/${currentItem._id}`); fetchAchievements(); setDeleteModalOpen(false); }} itemName={currentItem?.title} />
    </div>
  );
};
export default ManageAchievements;
