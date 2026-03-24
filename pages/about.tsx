import type { NextPage } from 'next';
import Layout from '../components/Layout';

const About: NextPage = () => {
  return (
    <Layout>
      <div style={styles.container}>
        {/* Site Section */}
        <section style={styles.section}>
          <h1 style={styles.title}>About Daily Well Fact</h1>
          <div style={styles.content}>
            <p style={styles.paragraph}>
              Daily Well Fact is a health and wellness blog dedicated to sharing simple, practical, and science-backed information that helps people live a healthier life. Our goal is to make reliable wellness knowledge easy to understand and useful for everyday life.
            </p>
            <p style={styles.paragraph}>
              Founded in 2026, Daily Well Fact focuses on topics such as healthy habits, nutrition tips, lifestyle improvement, and general wellness advice. We believe that small and consistent habits can make a big difference in overall health and well-being.
            </p>
            <p style={styles.paragraph}>
              Our mission is to provide clear, helpful, and trustworthy content that supports people in building better daily routines and improving their quality of life.
            </p>
            <p style={styles.paragraph}>
              The website is managed by Vijay Sharma, who is passionate about health awareness and sharing simple tips that help people develop healthier habits.
            </p>
            <p style={styles.paragraph}>
              All content published on Daily Well Fact is carefully researched from trusted and authoritative sources to ensure accuracy and reliability. However, the information provided on this website is for educational and informational purposes only and should not be considered professional medical advice.
            </p>
            <p style={styles.paragraph}>
              If you have any questions, suggestions, or feedback, feel free to contact us at{' '}
              <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>.
            </p>
          </div>
        </section>

        {/* Author Section */}
        <section style={styles.section}>
          <h2 style={styles.subtitle}>About the Author</h2>
          <div style={styles.authorContainer}>
            <div style={styles.authorAvatar}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#10b981" />
                <path d="M40 20 C46 20 51 25 51 31 C51 37 46 42 40 42 C34 42 29 37 29 31 C29 25 34 20 40 20 Z" fill="white" />
                <circle cx="40" cy="50" r="16" fill="white" />
              </svg>
            </div>
            <div style={styles.authorInfo}>
              <h3 style={styles.authorName}>Vijay Sharma</h3>
              <p style={styles.authorBio}>
                Vijay Sharma is a health and wellness writer and the founder of Daily Well Fact. He is passionate about sharing simple health tips, nutrition advice, and lifestyle guides to help people improve their daily habits and overall well-being.
              </p>
              <p style={styles.authorContact}>
                For inquiries: <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .title {
            font-size: 2rem !important;
          }
          .subtitle {
            font-size: 1.5rem !important;
          }
          .author-avatar {
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '2rem 0',
  },
  section: {
    marginBottom: '3rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1f2937',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1f2937',
    letterSpacing: '-0.01em',
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
  authorContainer: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
  },
  authorAvatar: {
    flexShrink: 0,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#111827',
  },
  authorBio: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#4b5563',
    marginBottom: '0.75rem',
  },
  authorContact: {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
};

export default About;