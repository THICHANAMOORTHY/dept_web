import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, BookOpen, Image as ImageIcon, Beaker, GraduationCap, Trophy, MessageSquare, Settings, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Faculty', path: '/admin/faculty', icon: Users },
    { name: 'News & Events', path: '/admin/news', icon: FileText },
    { name: 'Curriculum', path: '/admin/curriculum', icon: BookOpen },
    { name: 'Department Activities', path: '/admin/activities', icon: ImageIcon },
    { name: 'Labs & Facilities', path: '/admin/labs', icon: Beaker },
    { name: 'Placements', path: '/admin/placements', icon: GraduationCap },
    { name: 'Student Achievements', path: '/admin/achievements', icon: Trophy },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{
      width: '250px',
      backgroundColor: '#2c2c6c',
      color: 'white',
      height: '100vh',
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '2rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ color: '#F5A623', fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>ECE ELITES Admin</h2>
      </div>
      
      <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  color: isActive ? '#F5A623' : 'white',
                  textDecoration: 'none',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderLeft: isActive ? '4px solid #F5A623' : '4px solid transparent',
                  transition: 'all 0.2s'
                })}
              >
                <item.icon size={20} style={{ marginRight: '1rem' }} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0.75rem',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <LogOut size={20} style={{ marginRight: '1rem' }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
