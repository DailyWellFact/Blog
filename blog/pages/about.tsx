import type { NextPage } from 'next';
import Layout from '../components/Layout';

const About: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>About Daily Well Fact</h1>
        <div style={styles.content}>
          <p>
            Daily Well Fact is your daily dose of science-backed wellness insights. We believe that small, consistent habits lead to profound health transformations. Our mission is to empower you with trustworthy, actionable information so you can take charge of your well-being.
          </p>
          <p>
            Founded in 2025, our team includes health researchers, nutritionists, and wellness enthusiasts who are passionate about demystifying complex topics. Every fact we share is reviewed for accuracy and presented in an easy-to-understand way.
          </p>
          <p>
            Whether you're looking to improve your sleep, boost your immunity, or simply understand how your body works, we're here to guide you. Thank you for being part of our community.
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

export default About;