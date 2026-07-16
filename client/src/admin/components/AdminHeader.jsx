import React from 'react';
import { Menu } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header style={{
      height: '64px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Hamburger for mobile could go here */}
        <h1 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Control Panel</h1>
      </div>
      <div>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Admin User</span>
      </div>
    </header>
  );
};

export default AdminHeader;
