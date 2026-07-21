import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DataTable from '../components/DataTable';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Plus, X, ExternalLink, Link as LinkIcon } from 'lucide-react';

const ManageLinks = () => {
  const [links, setLinks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Important Links',
    description: '',
  });

  const fetchLinks = async () => {
    try {
      const res = await api.get('/admin/links');
      setLinks(res.data);
    } catch (err) {
      console.error('Error fetching links', err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        title: item.title,
        url: item.url,
        category: item.category || 'Important Links',
        description: item.description || '',
      });
    } else {
      setCurrentItem(null);
      setFormData({
        title: '',
        url: '',
        category: 'Important Links',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await api.put(`/admin/links/${currentItem._id}`, formData);
      } else {
        await api.post('/admin/links', formData);
      }
      fetchLinks();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving link', err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/admin/links/${currentItem._id}`);
      fetchLinks();
      setDeleteModalOpen(false);
      setCurrentItem(null);
    } catch (err) {
      console.error('Error deleting link', err);
    }
  };

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      render: (row) => (
        <div>
          <strong>{row.title}</strong>
          {row.description && <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{row.description}</div>}
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => (
        <span style={{ padding: '4px 8px', background: '#e0e7ff', color: '#3730a3', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
          {row.category || 'General'}
        </span>
      ),
    },
    {
      header: 'Link URL',
      accessor: 'url',
      render: (row) => (
        <a href={row.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2563eb', textDecoration: 'none', wordBreak: 'break-all', fontSize: '0.875rem' }}>
          <ExternalLink size={14} /> {row.url}
        </a>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LinkIcon size={24} color="#2c2c6c" /> Upload & Manage Links
          </h2>
          <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
            Add quick links, portals, Google Forms, syllabus PDFs, or external URLs for students and visitors.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{ display: 'flex', alignItems: 'center', padding: '0.6rem 1.2rem', backgroundColor: '#F5A623', color: '#2c2c6c', border: 'none', borderRadius: '999px', fontWeight: 'bold', cursor: 'pointer', gap: '0.5rem' }}
        >
          <Plus size={18} /> Add New Link
        </button>
      </div>

      <DataTable
        columns={columns}
        data={links}
        onEdit={handleOpenModal}
        onDelete={(item) => {
          setCurrentItem(item);
          setDeleteModalOpen(true);
        }}
      />

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px', backgroundColor: 'white', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{currentItem ? 'Edit Link' : 'Add New Link'}</h3>
            <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={24} /></button>
          </div>

          <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
            <form id="link-form" onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Link Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Anna University Portal / ECE Syllabus PDF"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Target URL *</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com/form-or-doc"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: 'white' }}
                >
                  <option value="Important Links">Important Links</option>
                  <option value="Student Portal">Student Portal</option>
                  <option value="Exam & Results">Exam & Results</option>
                  <option value="Google Forms / Registration">Google Forms / Registration</option>
                  <option value="Study Resources">Study Resources</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Short Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief summary of what this link is for..."
                  rows={3}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>
            </form>
          </div>

          <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={handleCloseModal} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" form="link-form" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2c2c6c', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '500', cursor: 'pointer' }}>Save Link</button>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={currentItem?.title}
      />
    </div>
  );
};

export default ManageLinks;
