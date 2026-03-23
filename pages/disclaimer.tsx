import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Disclaimer: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Disclaimer</h1>
        <div style={styles.content}>
          <p style={styles.paragraph}>
            The information provided on Daily Well Fact is for general informational purposes only and is not intended as medical advice. Always consult a qualified healthcare professional before making any changes to your diet, exercise, or wellness routine.
          </p>

          <p style={styles.paragraph}>
            We strive to ensure the accuracy of our content, but we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information contained on this website. Any reliance you place on such information is strictly at your own risk.
          </p>

          <p style={styles.paragraph}>
            In no event will we be liable for any loss or damage arising from the use of this website, including but not limited to direct, indirect, incidental, or consequential damages.
          </p>

          <p style={styles.paragraph}>
            External links are provided for convenience; we do not endorse or assume responsibility for the content of linked sites.
          </p>

          <p style={styles.paragraph}>
            By using this site, you acknowledge and agree to these terms.
          </p>

          <p style={styles.paragraph}>
            If you have any questions, please contact us at{' '}
            <a href="mailto:info@dailywellfact.com" style={styles.link}>info@dailywellfact.com</a>.
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