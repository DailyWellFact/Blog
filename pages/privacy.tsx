import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Privacy: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <div style={styles.content}>
          <p style={styles.paragraph}>
            <strong>Effective Date:</strong> March 20, 2026
          </p>

          <p style={styles.paragraph}>
            At Daily Well Fact, we respect your privacy and are committed to protecting the personal information of our visitors.
          </p>

          <h2 style={styles.subtitle}>Information We Collect</h2>
          <p style={styles.paragraph}>
            We generally do not require users to provide personal information to browse this website. However, visitors may voluntarily share information such as their name or email address when contacting us through the contact form or email.
          </p>

          <h2 style={styles.subtitle}>Cookies and Web Technologies</h2>
          <p style={styles.paragraph}>
            Daily Well Fact may use cookies and similar technologies to improve user experience and analyze website traffic.
          </p>

          <h2 style={styles.subtitle}>Third-Party Advertising</h2>
          <p style={styles.paragraph}>
            We may use third-party advertising services such as Google AdSense to display advertisements on our website. These services may use cookies or similar technologies to show ads based on users’ visits to this and other websites.
          </p>
          <p style={styles.paragraph}>
            Google may use the DoubleClick cookie to show relevant ads to users. Users may choose to disable personalized advertising by visiting Google's Ads Settings.
          </p>

          <h2 style={styles.subtitle}>Third-Party Links</h2>
          <p style={styles.paragraph}>
            Our website may contain links to external websites. We are not responsible for the privacy practices or content of those websites.
          </p>

          <h2 style={styles.subtitle}>Children's Information</h2>
          <p style={styles.paragraph}>
            Daily Well Fact does not knowingly collect any personal information from children under the age of 13.
          </p>

          <h2 style={styles.subtitle}>Changes to This Policy</h2>
          <p style={styles.paragraph}>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>

          <h2 style={styles.subtitle}>Contact Us</h2>
          <p style={styles.paragraph}>
            If you have any questions about this Privacy Policy, you can contact us at{' '}
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
  paragraph: {
    marginBottom: '1.25rem',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
};

export default Privacy;
