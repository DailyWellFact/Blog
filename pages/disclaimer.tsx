import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Disclaimer: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Disclaimer</h1>
        <div style={styles.content}>
          <p style={styles.paragraph}>
            The information provided on Daily Well Fact is for general informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions you may have regarding a medical condition.
          </p>
          <p style={styles.paragraph}>
            We strive to ensure the accuracy of our content by sourcing from reliable and trusted references. However, we make no warranties or representations about the completeness, accuracy, or reliability of the information. Any reliance you place on such information is strictly at your own risk.
          </p>
          <p style={styles.paragraph}>
            We are not liable for any loss or damage arising from the use of this website. If you find any mistake or have any concerns about our content, please contact us at{' '}
            <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>. We appreciate your feedback and will strive to correct any errors promptly.
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

export default Disclaimer;