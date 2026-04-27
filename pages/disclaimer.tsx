// pages/disclaimer.tsx
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Disclaimer: NextPage = () => {
  return (
    <>
      <SEO
        title="Medical and Content Disclaimer | Daily Well Fact"
        description="Read the health and wellness disclaimer for educational content published on Daily Well Fact. Not medical advice. Consult a healthcare professional."
        canonical="https://dailywellfact.com/disclaimer"
      />
      <Layout>
        <div style={styles.container}>
          <h1 style={styles.title}>Medical & Content Disclaimer</h1>
          <p style={styles.lastUpdated}>Last updated: April 27, 2026</p>

          <div style={styles.content}>
            <section style={styles.section}>
              <h2 style={styles.subtitle}>Educational Information Only</h2>
              <p style={styles.paragraph}>
                The content on Daily Well Fact is provided <strong>for educational and informational purposes only</strong>. 
                It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Not Medical Advice</h2>
              <p style={styles.paragraph}>
                We do not diagnose, treat, cure, or prevent any medical condition. Never disregard 
                professional medical advice or delay seeking it because of something you have read 
                on this website. Reliance on any information provided by Daily Well Fact is solely 
                at your own risk.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Consult a Qualified Healthcare Professional</h2>
              <p style={styles.paragraph}>
                Before making any changes to your diet, exercise routine, medication, or lifestyle, 
                you should <strong>always consult a licensed healthcare professional</strong> (e.g., physician, 
                registered dietitian, pharmacist) who can assess your individual health needs and 
                medical history.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Emergency Warning</h2>
              <p style={styles.paragraph}>
                <strong>If you are experiencing a medical emergency, call 911 immediately or go to the nearest emergency room.</strong> 
                Do not rely on this website or any online resource for emergency medical assistance.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Accuracy and Completeness Disclaimer</h2>
              <p style={styles.paragraph}>
                While we strive to provide accurate, up-to-date information, medical knowledge 
                evolves rapidly. Daily Well Fact makes <strong>no warranties or representations</strong> regarding 
                the completeness, reliability, timeliness, or accuracy of any content on this site. 
                Information may become outdated, incomplete, or contain errors.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>External Links Disclaimer</h2>
              <p style={styles.paragraph}>
                Our website may contain links to external websites or third-party resources. We 
                do not endorse, control, or guarantee the accuracy of information on those sites. 
                Visiting external links is at your own risk, and we are not responsible for any 
                consequences arising from their content.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Corrections and Updates</h2>
              <p style={styles.paragraph}>
                We are committed to correcting factual errors. If you believe any content is 
                inaccurate or outdated, please contact us at{' '}
                <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>. 
                We will investigate and update the content if necessary, noting the change in the 
                "Last Updated" date.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Individual Variation</h2>
              <p style={styles.paragraph}>
                Health and wellness outcomes vary significantly from person to person based on 
                genetics, underlying conditions, medications, and lifestyle factors. What works 
                for one individual may not work for another. Always consult a professional for 
                personalized advice.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>No Doctor-Patient Relationship</h2>
              <p style={styles.paragraph}>
                Using this website does not create a doctor-patient, therapist-client, or any other 
                healthcare professional relationship. The information is provided "as is" without 
                any representation or warranty.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Contact for Questions</h2>
              <p style={styles.paragraph}>
                If you have questions about this disclaimer or need clarification, please reach out to:
                <br />
                <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
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
    marginBottom: '0.5rem',
    color: '#1f2937',
    letterSpacing: '-0.02em',
  },
  lastUpdated: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    color: '#1f2937',
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
  section: {
    marginBottom: '1.5rem',
  },
};

export default Disclaimer;
