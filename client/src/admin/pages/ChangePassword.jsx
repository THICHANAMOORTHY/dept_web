import React, { useState } from 'react';
import api from '../../services/api';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message: '' }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus(null);
  };

  const toggleShow = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: '#e5e7eb' };
    if (pwd.length < 6) return { level: 1, label: 'Too short', color: '#ef4444' };
    if (pwd.length < 8) return { level: 2, label: 'Weak', color: '#f97316' };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && pwd.length >= 10)
      return { level: 4, label: 'Strong', color: '#22c55e' };
    if (pwd.length >= 8) return { level: 3, label: 'Good', color: '#3b82f6' };
    return { level: 2, label: 'Weak', color: '#f97316' };
  };

  const strength = getStrength(formData.newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    if (formData.newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }
    setLoading(true);
    try {
      const res = await api.put('/admin/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setStatus({ type: 'success', message: res.data.message });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to change password.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 2.75rem 0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const PasswordField = ({ label, name, fieldKey }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem', color: '#374151' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={showPasswords[fieldKey] ? 'text' : 'password'}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <button
          type="button"
          onClick={() => toggleShow(fieldKey)}
          style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
        >
          {showPasswords[fieldKey] ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '0.75rem' }}>
        <div style={{ backgroundColor: '#2c2c6c', padding: '0.6rem', borderRadius: '10px', color: 'white' }}>
          <ShieldCheck size={22} />
        </div>
        <div>
          <h2 style={{ margin: 0, color: '#111827', fontSize: '1.4rem' }}>Change Password</h2>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>Update your admin account password</p>
        </div>
      </div>

      <div style={{ maxWidth: '480px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}>

          {/* Status Alert */}
          {status && (
            <div style={{
              padding: '0.875rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              backgroundColor: status.type === 'success' ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${status.type === 'success' ? '#86efac' : '#fca5a5'}`,
              color: status.type === 'success' ? '#15803d' : '#dc2626',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {status.type === 'success' ? '✅' : '❌'} {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Lock icon decorative header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '50%', color: '#2c2c6c' }}>
                <Lock size={28} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: '#f3f4f6', marginBottom: '1.5rem' }} />

            <PasswordField label="Current Password" name="currentPassword" fieldKey="current" />
            <PasswordField label="New Password" name="newPassword" fieldKey="newPass" />

            {/* Password strength bar */}
            {formData.newPassword && (
              <div style={{ marginTop: '-0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{
                      flex: 1, height: '4px', borderRadius: '2px',
                      backgroundColor: i <= strength.level ? strength.color : '#e5e7eb',
                      transition: 'background-color 0.3s'
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: strength.color, fontWeight: '600' }}>{strength.label}</span>
              </div>
            )}

            <PasswordField label="Confirm New Password" name="confirmPassword" fieldKey="confirm" />

            {/* Match indicator */}
            {formData.confirmPassword && (
              <div style={{ marginTop: '-0.75rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: formData.newPassword === formData.confirmPassword ? '#22c55e' : '#ef4444', fontWeight: '600' }}>
                {formData.newPassword === formData.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: loading ? '#9ca3af' : '#2c2c6c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '0.95rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '0.5rem',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Changing Password...
                </>
              ) : (
                <><ShieldCheck size={18} /> Change Password</>
              )}
            </button>
          </form>
        </div>

        {/* Tips card */}
        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '1rem 1.25rem', marginTop: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: '600', fontSize: '0.875rem', color: '#92400e' }}>💡 Password Tips</p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#78350f', fontSize: '0.8125rem', lineHeight: '1.8' }}>
            <li>Use at least 8 characters</li>
            <li>Mix uppercase, lowercase, and numbers</li>
            <li>Avoid using personal information</li>
            <li>Do not reuse old passwords</li>
          </ul>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ChangePassword;
