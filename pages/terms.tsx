// pages/terms.tsx
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function TermsPage() {
  return (
    <Layout>
      <SEO
        title="Terms and Conditions | Daily Well Fact"
        description="Read the terms and conditions for using Daily Well Fact, including use license, disclaimers, and liability limitations."
        canonical="https://dailywellfact.com/terms"
      />

      <article style={styles.container}>
        <h1 style={styles.title}>Terms and Conditions</h1>
        <p style={styles.lastUpdated}>Last updated: April 2026</p>

        <section style={styles.section}>
          <h2 style={styles.h2}>1. Acceptance of Terms</h2>
          <p style={styles.paragraph}>
            By accessing or using Daily Well Fact (the "Site"), you agree to be bound by these Terms
            and Conditions. If you do not agree with any part of these terms, you must not use the Site.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>2. Use License</h2>
          <p style={styles.paragraph}>
            Daily Well Fact grants you a non-exclusive, non-transferable, revocable license to access
            and use the Site for lawful, personal, non-commercial purposes. You may not:
          </p>
          <ul style={styles.list}>
            <li>Modify, copy, or reproduce Site content without written permission</li>
            <li>Use the Site for any commercial purpose without authorization</li>
            <li>Attempt to decompile, reverse engineer, or disrupt Site functionality</li>
            <li>Use automated systems (bots, scrapers) to access the Site</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>3. Disclaimer of Warranties</h2>
          <p style={styles.paragraph}>
            The content on Daily Well Fact is provided "as is" and "as available" without warranties
            of any kind, either express or implied. We do not warrant that the Site will be
            uninterrupted, error-free, or free of harmful components. All health information is for
            educational purposes only – see our <a href="/disclaimer" style={styles.link}>Medical Disclaimer</a>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>4. Limitation of Liability</h2>
          <p style={styles.paragraph}>
            To the fullest extent permitted by law, Daily Well Fact and its owners, authors, and
            affiliates shall not be liable for any direct, indirect, incidental, consequential, or
            punitive damages arising from your use of the Site, including but not limited to reliance
            on any health information, loss of data, or interruption of service.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>5. External Links</h2>
          <p style={styles.paragraph}>
            The Site may contain links to third-party websites. We do not endorse or assume
            responsibility for the content, privacy policies, or practices of any third-party sites.
            You access them at your own risk.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>6. Modifications to Terms</h2>
          <p style={styles.paragraph}>
            We reserve the right to update or change these Terms at any time without prior notice.
            The latest version will be posted on this page with the "Last updated" date. Your
            continued use of the Site after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>7. Governing Law</h2>
          <p style={styles.paragraph}>
            These Terms shall be governed by and construed in accordance with the laws of the
            United States, without regard to its conflict of law provisions. Any legal action
            arising out of these Terms shall be brought exclusively in courts located in the
            United States.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>8. Contact Information</h2>
          <p style={styles.paragraph}>
            If you have any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:legal@dailywellfact.com" style={styles.link}>legal@dailywellfact.com</a>
          </p>
        </section>
      </article>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#111827',
  },
  lastUpdated: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '1rem',
  },
  section: {
    marginBottom: '2rem',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#374151',
    marginBottom: '1rem',
  },
  list: {
    marginTop: '0.5rem',
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
};
