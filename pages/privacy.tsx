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
            At Daily Well Fact, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>

          <h2 style={styles.subtitle}>Information We Collect</h2>
          <p style={styles.paragraph}>
            We may collect personal information such as your name and email address if you voluntarily subscribe to our newsletter. We also collect non‑personal data like browser type, IP address, and pages visited through cookies and analytics tools.
          </p>

          <h2 style={styles.subtitle}>How We Use Your Information</h2>
          <p style={styles.paragraph}>
            Your information helps us improve our content, personalize your experience, and send you occasional updates. We never sell or share your data with third parties for marketing purposes.
          </p>

          <h2 style={styles.subtitle}>Cookies</h2>
          <p style={styles.paragraph}>
            We use cookies to enhance site functionality and analyze traffic. You can disable cookies in your browser settings, but some features may not work as intended.
          </p>

          <h2 style={styles.subtitle}>Third‑Party Links</h2>
          <p style={styles.paragraph}>
            Our website may contain links to external sites. We are not responsible for the privacy practices of those sites.
          </p>

          <h2 style={styles.subtitle}>Your Rights</h2>
          <p style={styles.paragraph}>
            You have the right to request access to, correction, or deletion of your personal data. To exercise these rights, please contact us at{' '}
            <a href="mailto:privacy@dailywellfact.com" style={styles.link}>privacy@dailywellfact.com</a>.
          </p>

          <h2 style={styles.subtitle}>Changes to This Policy</h2>
          <p style={styles.paragraph}>
            We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>

          <p style={styles.paragraph}>
            If you have any questions, please reach out at{' '}
            <a href="mailto:privacy@dailywellfact.com" style={styles.link}>privacy@dailywellfact.com</a>.
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
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#1f2937',
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