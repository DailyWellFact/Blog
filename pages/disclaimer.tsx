import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Disclaimer: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Disclaimer</h1>
        <div style={styles.content}>
          <p style={styles.paragraph}>
            The information provided on Daily Well Fact is for general informational and educational purposes only. All content published on this website is intended to share knowledge about health, wellness, nutrition, and lifestyle topics.
          </p>
          <p style={styles.paragraph}>
            The information on this website is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare professional regarding any medical condition or health concerns.
          </p>
          <p style={styles.paragraph}>
            While we strive to provide accurate and up-to-date information, Daily Well Fact makes no guarantees about the completeness, reliability, or accuracy of any information published on this website. Any action you take based on the information found on this website is strictly at your own risk.
          </p>
          <p style={styles.paragraph}>
            Daily Well Fact may contain links to external websites or third-party resources for additional information. We do not control or guarantee the accuracy or reliability of content on external websites.
          </p>
          <p style={styles.paragraph}>
            Some content on this website may be updated or modified over time to maintain accuracy and relevance.
          </p>
          <p style={styles.paragraph}>
            By using this website, you acknowledge that you are responsible for how you use the information provided.
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
    marginBottom: '1.25rem',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
};

export default Disclaimer;
