import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Disclaimer: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Disclaimer</h1>
        <div style={styles.content}>
          <p>
            The information provided on Daily Well Fact is for general informational purposes only and is not intended as medical advice. Always consult a qualified healthcare professional before making any changes to your diet, exercise, or wellness routine.
          </p>
          <p>
            We strive to ensure the accuracy of our content, but we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information contained on this website.
          </p>
          <p>
            Any reliance you place on such information is strictly at your own risk. In no event will we be liable for any loss or damage arising from the use of this website.
          </p>
          <p>
            External links are provided for convenience, and we do not endorse or assume responsibility for the content of linked sites.
          </p>
          <p>
            By using this site, you acknowledge and agree to these terms.
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
  content: {
    fontSize: '1.125rem',
    lineHeight: 1.7,
    color: '#4b5563',
  },
};

export default Disclaimer;