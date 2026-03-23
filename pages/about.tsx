import type { NextPage } from 'next';
import Layout from '../components/Layout';

const About: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>About Daily Well Fact</h1>
        <div style={styles.content}>
          <p style={styles.paragraph}>
            <strong>Daily Well Fact</strong> is your daily dose of reliable, science‑backed wellness insights. Founded in 2026, we are dedicated to helping you live a healthier life through small, consistent habits.
          </p>
          <p style={styles.paragraph}>
            All our content is carefully curated from trusted, authoritative sources, ensuring you receive accurate and up‑to‑date information. We believe in the power of simple, actionable facts that can make a real difference in your well‑being.
          </p>
          <p style={styles.paragraph}>
            We’re committed to transparency and quality. If you spot any mistake in our posts or have a question, we’d love to hear from you. Reach us at{' '}
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

export default About;