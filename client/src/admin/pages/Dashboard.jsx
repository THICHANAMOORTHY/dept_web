import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, FileText, ImageIcon, MessageSquare } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
    <div>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>{title}</p>
      <h3 style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', color: '#111827' }}>{value}</h3>
    </div>
    <div style={{ backgroundColor: '#f3f4f6', padding: '0.75rem', borderRadius: '50%', color: '#2c2c6c' }}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    facultyCount: 0,
    newsCount: 0,
    galleryCount: 0,
    enquiriesCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2 style={{ margin: '0 0 2rem', color: '#111827' }}>Dashboard Overview</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <StatCard title="Total Faculty" value={stats.facultyCount} icon={Users} />
        <StatCard title="Published News/Events" value={stats.newsCount} icon={FileText} />
        <StatCard title="Gallery Images" value={stats.galleryCount} icon={ImageIcon} />
        <StatCard title="Pending Enquiries" value={stats.enquiriesCount} icon={MessageSquare} />
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, color: '#111827' }}>Recent Activity</h3>
        <p style={{ color: '#6b7280' }}>No recent activity to display.</p>
      </div>
    </div>
  );
};

export default Dashboard;
