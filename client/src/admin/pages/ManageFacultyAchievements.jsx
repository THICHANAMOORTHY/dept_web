import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X, Award, Trophy } from 'lucide-react';

const ManageFacultyAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    award: '',
    title: '',
    year: new Date().getFullYear(),
    description: ''
  });

  const fetchAchievements = async () => {
    try {
      const res = await api.get('/admin/faculty-achievements');
      setAchievements(res.data);
    } catch (err) {
      console.error('Error fetching faculty achievements:', err);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        name: item.name || '',
        award: item.award || '',
        title: item.title || '',
        year: item.year || new Date().getFullYear(),
        description: item.description || ''
      });
    } else {
      setCurrentItem(null);
      setFormData({
        name: '',
        award: '',
        title: '',
        year: new Date().getFullYear(),
        description: ''
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('award', formData.award);
    if (formData.title) data.append('title', formData.title);
    if (formData.year) data.append('year', formData.year);
    if (formData.description) data.append('description', formData.description);

    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      const itemId = currentItem?._id || currentItem?.id;
      if (currentItem && itemId) {
        await api.put(`/admin/faculty-achievements/${itemId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/faculty-achievements', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchAchievements();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving faculty achievement:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const itemId = currentItem?._id || currentItem?.id;
      await api.delete(`/admin/faculty-achievements/${itemId}`);
      fetchAchievements();
      setDeleteModalOpen(false);
      setCurrentItem(null);
    } catch (err) {
      console.error('Error deleting faculty achievement:', err);
    }
  };

  const columns = [
    {
      header: 'Photo',
      accessor: 'imageUrl',
      render: (row) => (
        <img
          src={row.imageUrl ? getImageUrl(row.imageUrl) : 'https://via.placeholder.com/60'}
          alt={row.name}
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
        />
      )
    },
    {
      header: 'Faculty Name',
      accessor: 'name',
      render: (row) => <strong>{row.name}</strong>
    },
    {
      header: 'Award / Distinction',
      accessor: 'award',
      render: (row) => (
        <span style={{ color: '#2563eb', fontWeight: 500 }}>{row.award}</span>
      )
    },
    {
      header: 'Event / Event Title',
      accessor: 'title',
      render: (row) => row.title || 'N/A'
    },
    {
      header: 'Year',
      accessor: 'year'
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={24} color="#F5A623" /> Manage Faculty Achievements
          </h2>
          <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
            Add, update, or remove awards, honors, and research achievements of faculty members.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.6rem 1.2rem',
            backgroundColor: '#2c2c6c',
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            fontWeight: 'bold',
            cursor: 'pointer',
            gap: '0.5rem'
          }}
        >
          <Plus size={18} /> Add Faculty Achievement
        </button>
      </div>

      <DataTable
        columns={columns}
        data={achievements}
        onEdit={handleOpenModal}
        onDelete={(item) => {
          setCurrentItem(item);
          setDeleteModalOpen(true);
        }}
      />

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '440px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
              {currentItem ? 'Edit Faculty Achievement' : 'Add Faculty Achievement'}
            </h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
              <X size={24} />
            </button>
          </div>

          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="faculty-achievement-form" onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Faculty Photo / Certificate Image</label>
                <ImageUploader currentImage={currentItem?.imageUrl ? getImageUrl(currentItem.imageUrl) : null} onChange={setImageFile} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Faculty Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. N. Kaleeswari / Mr. M. SivaKumar"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Award / Recognition *</label>
                <input
                  type="text"
                  name="award"
                  value={formData.award}
                  onChange={handleChange}
                  placeholder="e.g. 'Best HoD Award' and 'Best Faculty Award 2024'"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Event Title / Foundation (Optional)</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Tech Forum Research Foundation Awards 2024"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief details about the recognition..."
                  rows={3}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>
            </form>
          </div>

          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" form="faculty-achievement-form" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2c2c6c', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500', cursor: 'pointer' }}>Save Achievement</button>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={currentItem?.name}
      />
    </div>
  );
};

export default ManageFacultyAchievements;
