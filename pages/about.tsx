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
              Welcome to Daily Well Fact, a website dedicated to sharing simple, practical, and reliable information about health and wellness. Our goal is to help readers understand everyday health topics in a clear and easy-to-follow way.
            </p>
            <p style={styles.paragraph}>
              At Daily Well Fact, we believe that good health comes from small daily habits. Through our articles, we share helpful information about nutrition, lifestyle habits, fitness, and general well-being so readers can make better choices for a healthier life.
            </p>
            <p style={styles.paragraph}>
              Our content focuses on providing easy-to-understand explanations about common health questions, daily health tips, and wellness guidance that anyone can apply in their everyday routine.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section style={styles.section}>
          <h2 style={styles.subtitle}>Our Mission</h2>
          <div style={styles.content}>
            <p style={styles.paragraph}>
              Our mission is to provide clear, useful, and trustworthy health information that helps people build healthier lifestyles through simple daily habits and informed decisions.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section style={styles.section}>
          <h2 style={styles.subtitle}>Our Content</h2>
          <div style={styles.content}>
            <p style={styles.paragraph}>
              All articles published on Daily Well Fact are created for informational and educational purposes. We aim to research topics carefully and present them in a way that is helpful and easy to understand for our readers.
            </p>
            <p style={styles.paragraph}>Topics we commonly cover include:</p>
            <ul style={styles.list}>
              <li>Healthy lifestyle habits</li>
              <li>Nutrition and diet tips</li>
              <li>Daily wellness practices</li>
              <li>Common health questions</li>
              <li>Preventive health awareness</li>
            </ul>
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
                Vijay Sharma is the founder and writer behind Daily Well Fact. He is passionate about health, lifestyle improvement, and sharing practical wellness knowledge with readers. Through this website, he aims to simplify health topics so that readers can easily understand them and apply healthy habits in their daily lives.
              </p>
              <p style={styles.authorContact}>
                For inquiries: <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section style={styles.section}>
          <h2 style={styles.subtitle}>Important Disclaimer</h2>
          <div style={styles.content}>
            <p style={styles.paragraph}>
              The information provided on Daily Well Fact is for educational and informational purposes only. It is not intended to replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section style={styles.section}>
          <h2 style={styles.subtitle}>Contact Us</h2>
          <div style={styles.content}>
            <p style={styles.paragraph}>
              If you have any questions, suggestions, or feedback, feel free to contact us at{' '}
              <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>.
            </p>
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
  list: {
    paddingLeft: '1.5rem',
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
