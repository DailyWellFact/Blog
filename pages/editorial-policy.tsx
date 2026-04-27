// pages/editorial-policy.tsx
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function EditorialPolicyPage() {
  return (
    <Layout>
      <SEO
        title="Editorial Policy | Daily Well Fact"
        description="Learn how Daily Well Fact creates, reviews, updates, and corrects health and wellness content. Our commitment to accuracy and evidence-based information."
        canonical="https://dailywellfact.com/editorial-policy"
      />

      <article style={styles.container}>
        <h1 style={styles.title}>Editorial Policy</h1>
        <p style={styles.lastUpdated}>Last updated: April 2026</p>

        <section style={styles.section}>
          <h2 style={styles.h2}>1. Mission</h2>
          <p style={styles.paragraph}>
            Daily Well Fact is committed to providing clear, practical, and educational health,
            nutrition, fitness, and wellness content. Our mission is to empower readers with
            evidence-based information to support informed health decisions. We prioritize
            accuracy, transparency, and reader safety.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>2. Content Standards</h2>
          <p style={styles.paragraph}>
            All content published on Daily Well Fact adheres to the following standards:
          </p>
          <ul style={styles.list}>
            <li><strong>Accuracy:</strong> Information is fact-checked against reputable sources (medical journals, government health agencies, peer-reviewed studies).</li>
            <li><strong>Clarity:</strong> Content is written in plain, accessible language while maintaining scientific integrity.</li>
            <li><strong>Transparency:</strong> Sources and references are clearly cited. We disclose any limitations or uncertainties.</li>
            <li><strong>Safety:</strong> We never recommend harmful practices or unproven treatments. Medical disclaimers accompany every article.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>3. Source Requirements</h2>
          <p style={styles.paragraph}>
            We rely on primary and authoritative sources, including:
          </p>
          <ul style={styles.list}>
            <li>Peer-reviewed medical journals (e.g., NEJM, The Lancet, JAMA)</li>
            <li>Government health agencies (CDC, NIH, WHO, FDA, USDA)</li>
            <li>Academic institutions and university research</li>
            <li>Reputable healthcare organizations (Mayo Clinic, Cleveland Clinic, etc.)</li>
          </ul>
          <p style={styles.paragraph}>
            Each article includes a "Sources & References" section with links or citations to
            supporting evidence.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>4. Author Qualifications</h2>
          <p style={styles.paragraph}>
            Our content is written by health and wellness writers with a focus on research-backed
            information. While we strive to collaborate with healthcare professionals, the authors
            are not necessarily licensed medical practitioners. All content is reviewed for
            accuracy and safety before publication. For medical advice, always consult a qualified
            healthcare provider.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>5. Review Process</h2>
          <p style={styles.paragraph}>
            Every article undergoes the following process before publication:
          </p>
          <ol style={styles.list}>
            <li>Research and drafting by a content writer</li>
            <li>Fact-checking against primary sources</li>
            <li>Editorial review for clarity, safety, and compliance with our standards</li>
            <li>Addition of medical disclaimer and sources section</li>
            <li>Final approval by site editors</li>
          </ol>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>6. Updates and Content Freshness</h2>
          <p style={styles.paragraph}>
            Health information evolves rapidly. We review and update articles periodically,
            especially when new research or guidelines emerge. Each article displays both
            "Published" and "Last Updated" dates. If significant changes are made, we note them
            in the updated date. Readers are encouraged to check the updated date before relying
            on time-sensitive information.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>7. Corrections Policy</h2>
          <p style={styles.paragraph}>
            We are committed to correcting errors promptly. If you identify an inaccuracy,
            outdated information, or a factual error, please contact us at:
            <br />
            <a href="mailto:corrections@dailywellfact.com" style={styles.link}>corrections@dailywellfact.com</a>
          </p>
          <p style={styles.paragraph}>
            Upon verification, we will:
          </p>
          <ul style={styles.list}>
            <li>Correct the error within 24-48 hours</li>
            <li>Add a correction notice if the change is substantive</li>
            <li>Update the "Last Updated" date</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>8. Conflicts of Interest</h2>
          <p style={styles.paragraph}>
            Daily Well Fact is an independent publication. We do not accept paid posts,
            sponsored content, or product endorsements that influence our editorial integrity.
            Any affiliate links or advertising are clearly disclosed. The editorial team has
            full control over content, and no advertiser influences our recommendations or
            information.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>9. Medical Disclaimer Reiteration</h2>
          <p style={styles.paragraph}>
            All content on Daily Well Fact is for educational purposes only and does not
            constitute medical advice. Always consult a qualified healthcare professional before
            making changes to your health routine. See our full <a href="/disclaimer" style={styles.link}>Medical Disclaimer</a>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>10. Contact Us</h2>
          <p style={styles.paragraph}>
            For questions about this Editorial Policy, please write to:
            <br />
            <a href="mailto:editorial@dailywellfact.com" style={styles.link}>editorial@dailywellfact.com</a>
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
