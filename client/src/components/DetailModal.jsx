import React, { useEffect } from 'react';
import { X, Calendar, ExternalLink } from 'lucide-react';

const DetailModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  badgeColor,
  imageUrl,
  description,
  details = [],
  link,
  linkText = "View Document / External Link"
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'var(--bg-primary, #ffffff)',
          color: 'var(--text-primary, #1e293b)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--border-color, #e2e8f0)',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color, #e2e8f0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: 'var(--bg-secondary, #f8fafc)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {badge && (
              <span style={{
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: badgeColor || 'rgba(79, 70, 229, 0.12)',
                color: badgeColor ? '#ffffff' : 'var(--primary, #4f46e5)',
                letterSpacing: '0.3px',
                textTransform: 'capitalize'
              }}>
                {badge}
              </span>
            )}
            {subtitle && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #64748b)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> {subtitle}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(0,0,0,0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary, #64748b)',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = 'var(--text-secondary, #64748b)'; }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {imageUrl && (
            <div style={{
              width: '100%',
              maxHeight: '320px',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-secondary, #f8fafc)',
              border: '1px solid var(--border-color, #e2e8f0)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.5rem'
            }}>
              <img 
                src={imageUrl} 
                alt={title || 'Detail view'} 
                style={{ maxWidth: '100%', maxHeight: '310px', objectFit: 'contain', display: 'block', borderRadius: '8px' }}
              />
            </div>
          )}

          {title && (
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: 'var(--text-primary, #0f172a)', lineHeight: '1.35' }}>
              {title}
            </h3>
          )}

          {/* Details list (key/value or arrays) */}
          {details && details.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--bg-secondary, #f8fafc)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color, #e2e8f0)' }}>
              {details.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--primary, #4f46e5)', letterSpacing: '0.5px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-primary, #1e293b)' }}>
                    {Array.isArray(item.value) ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                        {item.value.map((v, i) => (
                          <span key={i} style={{ padding: '0.25rem 0.65rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary, #4f46e5)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                            {v}
                          </span>
                        ))}
                      </div>
                    ) : (
                      item.value
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {description && (
            <div style={{
              fontSize: '0.975rem',
              lineHeight: '1.7',
              color: 'var(--text-secondary, #334155)',
              whiteSpace: 'pre-line'
            }}>
              {description}
            </div>
          )}

          {link && (
            <div style={{ marginTop: '0.25rem' }}>
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  backgroundColor: 'var(--primary, #4f46e5)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <span>{linkText}</span>
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border-color, #e2e8f0)',
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: 'var(--bg-secondary, #f8fafc)'
        }}>
          <button 
            onClick={onClose}
            style={{
              padding: '0.55rem 1.5rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-primary, #ffffff)',
              border: '1px solid var(--border-color, #cbd5e1)',
              color: 'var(--text-primary, #1e293b)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
