import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <main style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
