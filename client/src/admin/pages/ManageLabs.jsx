import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../services/api';
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
  const [formData, setFormData] = useState({ name: '', description: '', equipmentList: '', subjectsSupported: '', displayOrder: 0 });

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
        name: item.name, 
        description: item.description || '', 
        equipmentList: item.equipmentList ? item.equipmentList.join(', ') : '',
        subjectsSupported: item.subjectsSupported ? item.subjectsSupported.join(', ') : '',
        displayOrder: item.displayOrder || 0
      });
    } else {
      setCurrentItem(null);
      setFormData({ name: '', description: '', equipmentList: '', subjectsSupported: '', displayOrder: 0 });
    }
    setImageFile(null); setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    // Send equipment list as an array of strings by splitting by comma
    formData.equipmentList.split(',').forEach(item => {
      const trimmed = item.trim();
      if(trimmed) data.append('equipmentList[]', trimmed);
    });
    
    if (formData.subjectsSupported) {
      formData.subjectsSupported.split(',').forEach(item => {
        const trimmed = item.trim();
        if(trimmed) data.append('subjectsSupported[]', trimmed);
      });
    }
    
    data.append('displayOrder', formData.displayOrder);

    if (imageFile) data.append('image', imageFile);
    
    try {
      if (currentItem) await api.put(`/admin/labs/${currentItem._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/admin/labs', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchLabs(); setIsModalOpen(false);
    } catch (err) { console.error(err); }
  };

  const columns = [
    { header: 'Image', accessor: 'imageUrl', render: (row) => <img src={row.imageUrl ? getImageUrl(row.imageUrl) : 'https://via.placeholder.com/40'} alt="lab" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /> },
    { header: 'Lab Name', accessor: 'name' },
    { header: 'Description', accessor: 'description', render: (row) => <span title={row.description}>{row.description && row.description.length > 50 ? row.description.substring(0, 50) + '...' : row.description}</span> }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Manage Labs & Facilities</h2>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}><Plus size={18} /> Add New</button>
      </div>
      <DataTable columns={columns} data={labs} onEdit={handleOpenModal} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{currentItem ? 'Edit Lab' : 'Add Lab'}</h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none' }}><X /></button>
          </div>
          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="lab-form" onSubmit={handleSubmit}>
              <ImageUploader currentImage={currentItem?.imageUrl ? getImageUrl(currentItem.imageUrl) : null} onChange={setImageFile} />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Lab Name" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Lab Description" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', minHeight: '100px' }} />
              <input type="text" name="equipmentList" value={formData.equipmentList} onChange={handleChange} placeholder="Equipment Tags (comma separated)" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="text" name="subjectsSupported" value={formData.subjectsSupported} onChange={handleChange} placeholder="Subjects Supported (comma separated)" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} placeholder="Display Order" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
            </form>
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '1rem' }}>Cancel</button>
            <button type="submit" form="lab-form" className="btn btn-primary">Save</button>
          </div>
        </div>
      )}
      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/labs/${currentItem._id}`); fetchLabs(); setDeleteModalOpen(false); }} itemName={currentItem?.name} />
    </div>
  );
};
export default ManageLabs;
