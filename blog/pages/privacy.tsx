import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Privacy: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <div style={styles.content}>
          <p><strong>Effective Date:</strong> March 20, 2026</p>
          <p>
            At Daily Well Fact, we respect your privacy. This policy outlines how we collect, use, and protect your information when you visit our website.
          </p>
          <h2 style={styles.subtitle}>Information We Collect</h2>
          <p>
            We may collect personal information such as your name and email address if you voluntarily subscribe to our newsletter. We also collect non‑personal data like browser type, IP address, and pages visited through cookies and analytics tools.
          </p>
          <h2 style={styles.subtitle}>How We Use Your Information</h2>
          <p>
            Your information helps us improve our content, personalize your experience, and send you occasional updates. We never sell or share your data with third parties for marketing purposes.
          </p>
          <h2 style={styles.subtitle}>Cookies</h2>
          <p>
            We use cookies to enhance site functionality and analyze traffic. You can disable cookies in your browser settings, but some features may not work as intended.
          </p>
          <h2 style={styles.subtitle}>Contact Us</h2>
          <p>
            If you have any questions, please reach out at <a href="mailto:privacy@dailywellfact.com" style={styles.link}>privacy@dailywellfact.com</a>.
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
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    color: '#1f2937',
  },
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: '#4b5563',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
};

export default Privacy;