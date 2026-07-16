import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DataTable from '../components/DataTable';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/admin/enquiries');
      setEnquiries(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/admin/enquiries/${id}`, { status: newStatus });
      fetchEnquiries();
    } catch (err) { console.error(err); }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Message', accessor: 'message', render: (row) => <span title={row.message}>{row.message.length > 50 ? row.message.substring(0, 50) + '...' : row.message}</span> },
    { 
      header: 'Status', 
      accessor: 'status', 
      render: (row) => (
        <select value={row.status} onChange={(e) => handleStatusChange(row._id, e.target.value)} style={{ padding: '0.25rem', borderRadius: '4px' }}>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>
      )
    }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Manage Enquiries</h2>
      <DataTable columns={columns} data={enquiries} onDelete={(item) => { setCurrentItem(item); setDeleteModalOpen(true); }} />
      <ConfirmDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={async () => { await api.delete(`/admin/enquiries/${currentItem._id}`); fetchEnquiries(); setDeleteModalOpen(false); }} itemName={currentItem?.name} />
    </div>
  );
};

export default ManageEnquiries;
