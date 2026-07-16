import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X } from 'lucide-react';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '', category: '', shortDescription: '', content: '', published: false
  });

  const fetchNews = async () => {
    try {
      const res = await api.get('/admin/news');
      setNews(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchNews(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        title: item.title, category: item.category || '', shortDescription: item.shortDescription || '', content: item.content, published: item.published || false
      });
    } else {
      setCurrentItem(null);
      setFormData({ title: '', category: '', shortDescription: '', content: '', published: false });
    }
    setImageFile(null); setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);
    try {
      if (currentItem) {
        await api.put(`/admin/news/${currentItem._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/admin/news', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      fetchNews(); setIsModalOpen(false);
    } catch (err) { console.error(err); }
  };

  const columns = [
    { header: 'Thumbnail', accessor: 'thumbnailUrl', render: (row) => <img src={row.thumbnailUrl ? `http://localhost:5000${row.thumbnailUrl}` : 'https://via.placeholder.com/40'} alt="thumb" style={{ width: '40px', height: '40px', objectFit: 'cover' }} /> },
    { header: 'Title', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { header: 'Published', accessor: 'published', render: (row) => row.published ? 'Yes' : 'No' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Manage News & Events</h2>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}><Plus size={18} /> Add New</button>
      </div>
      <DataTable columns={columns} data={news} onEdit={handleOpenModal} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{currentItem ? 'Edit News' : 'Add News'}</h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none' }}><X /></button>
          </div>
          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="news-form" onSubmit={handleSubmit}>
              <ImageUploader currentImage={currentItem?.thumbnailUrl ? `http://localhost:5000${currentItem.thumbnailUrl}` : null} onChange={setImageFile} />
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Short Description" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Full Content" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', minHeight: '150px' }} />
              <label><input type="checkbox" name="published" checked={formData.published} onChange={handleChange} /> Published</label>
            </form>
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '1rem' }}>Cancel</button>
            <button type="submit" form="news-form" className="btn btn-primary">Save</button>
          </div>
        </div>
      )}
      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/news/${currentItem._id}`); fetchNews(); setDeleteModalOpen(false); }} itemName={currentItem?.title} />
    </div>
  );
};

export default ManageNews;
