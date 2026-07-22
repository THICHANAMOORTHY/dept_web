import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../../services/api';
import DataTable from '../components/DataTable';
import ImageUploader from '../components/ImageUploader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X } from 'lucide-react';

const ManagePlacements = () => {
  const [placements, setPlacements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ company: '', recruiterName: '', package: '', year: '', studentsPlaced: '' });

  const fetchPlacements = async () => {
    try {
      const res = await api.get('/admin/placements');
      setPlacements(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPlacements(); }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({ company: item.company, recruiterName: item.recruiterName || '', package: item.package, year: item.year, studentsPlaced: item.studentsPlaced });
    } else {
      setCurrentItem(null);
      setFormData({ company: '', recruiterName: '', package: '', year: new Date().getFullYear(), studentsPlaced: '' });
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
      if (currentItem) await api.put(`/admin/placements/${currentItem._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/admin/placements', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchPlacements(); setIsModalOpen(false);
    } catch (err) { console.error(err); }
  };

  const columns = [
    { header: 'Logo', accessor: 'logoUrl', render: (row) => <img src={row.logoUrl ? getImageUrl(row.logoUrl) : 'https://via.placeholder.com/40'} alt="logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} /> },
    { header: 'Company', accessor: 'company' },
    { header: 'Recruiter Name', accessor: 'recruiterName' },
    { header: 'Package', accessor: 'package' },
    { header: 'Year', accessor: 'year' },
    { header: 'Placed', accessor: 'studentsPlaced' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Manage Placements</h2>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center' }}><Plus size={18} /> Add New</button>
      </div>
      <DataTable columns={columns} data={placements} onEdit={handleOpenModal} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{currentItem ? 'Edit Placement' : 'Add Placement'}</h3>
            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none' }}><X /></button>
          </div>
          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="placement-form" onSubmit={handleSubmit}>
              <ImageUploader currentImage={currentItem?.logoUrl ? getImageUrl(currentItem.logoUrl) : null} onChange={setImageFile} />
              <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="text" name="recruiterName" value={formData.recruiterName} onChange={handleChange} placeholder="Recruiter Name" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="text" name="package" value={formData.package} onChange={handleChange} placeholder="Package (e.g. 5 LPA)" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
              <input type="number" name="studentsPlaced" value={formData.studentsPlaced} onChange={handleChange} placeholder="Students Placed" required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem' }} />
            </form>
          </div>
          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '1rem' }}>Cancel</button>
            <button type="submit" form="placement-form" className="btn btn-primary">Save</button>
          </div>
        </div>
      )}
      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/placements/${currentItem._id}`); fetchPlacements(); setDeleteModalOpen(false); }} itemName={currentItem?.company} />
    </div>
  );
};
export default ManagePlacements;
