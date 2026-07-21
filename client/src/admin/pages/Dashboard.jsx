import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, FileText, ImageIcon, MessageSquare, Clock, ArrowUpRight } from 'lucide-react';

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
    enquiriesCount: 0,
    recentActivity: []
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getBadgeColor = (type) => {
    if (type.includes('Faculty')) return { bg: '#e0e7ff', text: '#3730a3' };
    if (type.includes('News')) return { bg: '#dcfce7', text: '#166534' };
    return { bg: '#fef3c7', text: '#92400e' };
  };

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, color: '#111827' }}>Recent Activity</h3>
          <span style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={14} /> Real-time updates
          </span>
        </div>

        {stats.recentActivity && stats.recentActivity.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stats.recentActivity.map((item, index) => {
              const badge = getBadgeColor(item.type);
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px',
                  border: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: badge.bg,
                      color: badge.text
                    }}>
                      {item.type}
                    </span>
                    <span style={{ fontSize: '0.925rem', color: '#1f2937', fontWeight: '500' }}>
                      {item.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    {formatDate(item.time)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: '#6b7280', margin: 0 }}>No recent activity to display.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
