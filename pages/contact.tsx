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
        headers: {
          'Content-Type': 'application/json',
        },
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
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
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
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 500,
    color: '#1f2937',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
    outline: 'none',
    fontFamily: 'inherit',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    outline: 'none',
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
  },
  errorMessage: {
    marginTop: '1rem',
    color: '#ef4444',
    textAlign: 'center' as const,
  },
};

export default Contact;