import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Privacy: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <div style={styles.content}>
          <p style={styles.paragraph}>
            <strong>Effective Date:</strong> March 23, 2026
          </p>
          <p style={styles.paragraph}>
            At Daily Well Fact, we respect your privacy. <strong>We do not collect any personal data</strong> from our visitors. You can browse our site without creating an account, leaving any personal information, or worrying about cookies that track you.
          </p>
          <p style={styles.paragraph}>
            We do not use newsletters, analytics that store personal data, or third‑party services that would compromise your privacy. The only time you may choose to share information is if you contact us directly via email.
          </p>
          <p style={styles.paragraph}>
            If you have any questions about this policy, feel free to contact us at{' '}
            <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>.
          </p>
        </div>
      </div>
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
    marginBottom: '2rem',
    color: '#1f2937',
    letterSpacing: '-0.02em',
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: '#4b5563',
  },
  paragraph: {
    marginBottom: '1.5rem',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
};

export default Privacy;