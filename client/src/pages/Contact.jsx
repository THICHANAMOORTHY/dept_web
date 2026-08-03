import React, { useState, useEffect } from 'react';
import {
  MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Loader, MessageSquare, Clock, Globe
} from 'lucide-react';
import { submitEnquiry, getSettings } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    getSettings()
      .then(({ data }) => { if (data) setSettings(data); })
      .catch(() => {});
  }, []);

  const address = settings?.address || 'NH-47, Palakkad Main Road, Navakkarai, Coimbatore, Tamil Nadu - 641105';
  const phoneNumbers = settings?.phoneNumbers?.length
    ? settings.phoneNumbers
    : ['+91-9364445555', '0422-2656871'];
  const email = settings?.email || 'info@easacollege.com';

  /* ---- Validation ---- */
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Message is required.';
    else if (formData.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('loading');
    setServerMessage('');
    try {
      const res = await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        message: formData.message.trim(),
      });
      setStatus('success');
      setServerMessage(res.data.message || 'Your enquiry has been submitted successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setServerMessage(
        err.response?.data?.message || 'Something went wrong. Please try again later.'
      );
    }
  };

  const infoCards = [
    {
      icon: <MapPin size={22} />,
      title: 'Campus Address',
      content: address,
      link: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      linkLabel: 'Open in Google Maps →',
    },
    {
      icon: <Phone size={22} />,
      title: 'Phone Numbers',
      content: phoneNumbers.join('\n'),
      links: phoneNumbers.map(p => ({ href: `tel:${p.replace(/\s/g, '')}`, label: p })),
    },
    {
      icon: <Mail size={22} />,
      title: 'Email Address',
      content: null,
      links: [{ href: `mailto:${email}`, label: email }],
    },
    {
      icon: <Clock size={22} />,
      title: 'Office Hours',
      content: 'Mon – Sat: 9:00 AM – 5:00 PM\nSunday & Public Holidays: Closed',
    },
    {
      icon: <Globe size={22} />,
      title: 'Official Website',
      content: null,
      links: [{ href: 'https://www.easacollege.com', label: 'www.easacollege.com', external: true }],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="contact-hero">
        <div className="container">
          <div className="contact-hero-badge">
            <MessageSquare size={14} />
            Get in Touch
          </div>
          <h1 className="contact-hero-title">
            Contact the{' '}
            <span style={{ background: 'linear-gradient(135deg, #F5A623, #f7c968)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ECE Department
            </span>
          </h1>
          <p className="contact-hero-subtitle">
            Have a question, admission enquiry, or collaboration proposal? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="contact-body">
        <div className="container">
          <div className="contact-grid">

            {/* Left: Info Cards + Map */}
            <div className="contact-info-col">
              {infoCards.map((card, i) => (
                <div className="contact-info-card" key={i}>
                  <div className="contact-info-icon">{card.icon}</div>
                  <div className="contact-info-content">
                    <h4>{card.title}</h4>
                    {card.content && (
                      <p style={{ whiteSpace: 'pre-line' }}>{card.content}</p>
                    )}
                    {card.links && card.links.map((l, j) => (
                      <a
                        key={j}
                        href={l.href}
                        target={l.external ? '_blank' : undefined}
                        rel={l.external ? 'noopener noreferrer' : undefined}
                        style={{ display: 'block' }}
                      >
                        {l.label}
                      </a>
                    ))}
                    {card.link && !card.links && (
                      <a href={card.link} target="_blank" rel="noopener noreferrer">
                        {card.linkLabel}
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Google Map Embed */}
              <div className="contact-map-card">
                <iframe
                  title="EASA College Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.7!2d77.0!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f0aaaaaaaaaa%3A0x0!2sEASA+College+of+Engineering+and+Technology%2C+Coimbatore!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h2>Send Us a Message</h2>
                <p>Fill in the form below and our team will respond within 1–2 business days.</p>
              </div>

              {/* Success / Error alerts */}
              {status === 'success' && (
                <div className="contact-alert success" style={{ marginBottom: '1.5rem' }}>
                  <CheckCircle size={20} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{serverMessage}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="contact-alert error" style={{ marginBottom: '1.5rem' }}>
                  <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '1px' }} />
                  <span>{serverMessage}</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'has-error' : ''}
                      disabled={status === 'loading'}
                      autoComplete="name"
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'has-error' : ''}
                      disabled={status === 'loading'}
                      autoComplete="email"
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-phone">Phone Number <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>(optional)</span></label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    autoComplete="tel"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'has-error' : ''}
                    disabled={status === 'loading'}
                    rows={5}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader size={18} className="spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Fields marked with <span style={{ color: '#ef4444' }}>*</span> are required.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
