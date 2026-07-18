import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X } from 'lucide-react';

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    qualification: '',
    specialization: '',
    email: '',
    isHOD: false,
    displayOrder: 0
  });

  const fetchFaculty = async () => {
    try {
      const res = await api.get('/admin/faculty');
      setFaculty(res.data);
    } catch (err) {
      console.error('Error fetching faculty', err);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        name: item.name,
        designation: item.designation,
        qualification: item.qualification,
        specialization: item.specialization,
        email: item.email,
        isHOD: item.isHOD || false,
        displayOrder: item.displayOrder || 0
      });
    } else {
      setCurrentItem(null);
      setFormData({
        name: '', designation: '', qualification: '', specialization: '', email: '', isHOD: false, displayOrder: 0
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      if (currentItem) {
        await api.put(`/admin/faculty/${currentItem._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/faculty', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchFaculty();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving faculty', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/admin/faculty/${currentItem._id}`);
      fetchFaculty();
      setDeleteModalOpen(false);
      setCurrentItem(null);
    } catch (err) {
      console.error('Error deleting faculty', err);
    }
  };

  const columns = [
    {
      header: 'Photo',
      accessor: 'imageUrl',
      render: (row) => <img src={getImageUrl(row.imageUrl)} alt={row.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
    },
    { header: 'Name', accessor: 'name' },
    { header: 'Designation', accessor: 'designation' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'HOD', 
      accessor: 'isHOD',
      render: (row) => row.isHOD ? <span style={{ padding: '4px 8px', background: '#dcfce3', color: '#166534', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Yes</span> : null
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: '#111827' }}>Manage Faculty</h2>
        <button 
          onClick={() => handleOpenModal()} 
          style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', backgroundColor: '#F5A623', color: '#2c2c6c', border: 'none', borderRadius: '999px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add New
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={faculty} 
        onEdit={handleOpenModal} 
        onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} 
      />

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{currentItem ? 'Edit Faculty' : 'Add New Faculty'}</h3>
            <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={24} /></button>
          </div>
          
          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="faculty-form" onSubmit={handleSubmit}>
              <ImageUploader 
                currentImage={currentItem?.imageUrl ? getImageUrl(currentItem.imageUrl) : null} 
                onChange={setImageFile} 
              />
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Qualification</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Specialization</label>
                <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Display Order</label>
                  <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
                  <input type="checkbox" name="isHOD" checked={formData.isHOD} onChange={handleChange} id="isHOD" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <label htmlFor="isHOD" style={{ fontWeight: '500' }}>Is HOD?</label>
                </div>
              </div>
            </form>
          </div>

          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={handleCloseModal} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" form="faculty-form" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2c2c6c', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500', cursor: 'pointer' }}>Save Faculty</button>
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

export default ManageFaculty;
