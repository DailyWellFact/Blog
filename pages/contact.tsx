import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useState } from 'react';

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      setStatus('error');
      setErrorMsg(error.message);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Have a question, suggestion, or found an error? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name Field */}
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={styles.icon}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" strokeWidth="2" />
              </svg>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              style={styles.input}
            />
          </div>

          {/* Email Field */}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={styles.icon}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" />
                <polyline points="22,6 12,13 2,6" strokeWidth="2" />
              </svg>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              style={styles.input}
            />
          </div>

          {/* Message Field */}
          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={styles.icon}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message..."
              style={styles.textarea}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            style={styles.button}
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p style={styles.successMessage}>Thank you! Your message has been sent.</p>
          )}
          {status === 'error' && (
            <p style={styles.errorMessage}>Error: {errorMsg}</p>
          )}
        </form>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .title {
            font-size: 2rem !important;
          }
          .subtitle {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '2rem 0',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1f2937',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4b5563',
    marginBottom: '2rem',
  },
  form: {
    backgroundColor: '#f9fafb', // light gray background
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
    border: '1px solid #e5e7eb',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontWeight: 500,
    color: '#1f2937',
    fontSize: '0.875rem',
  },
  icon: {
    width: 16,
    height: 16,
    strokeWidth: 2,
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    outline: 'none',
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    width: '100%',
  },
  successMessage: {
    marginTop: '1rem',
    color: '#10b981',
    textAlign: 'center' as const,
    fontSize: '0.875rem',
  },
  errorMessage: {
    marginTop: '1rem',
    color: '#ef4444',
    textAlign: 'center' as const,
    fontSize: '0.875rem',
  },
};

export default Contact;