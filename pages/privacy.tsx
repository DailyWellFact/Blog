// pages/privacy.tsx
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Privacy: NextPage = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Daily Well Fact"
        description="Read how Daily Well Fact handles privacy, cookies, analytics, advertising, and user information. Includes Google AdSense disclosure and opt-out options."
        canonical="https://dailywellfact.com/privacy"
      />
      <Layout>
        <div style={styles.container}>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.lastUpdated}>Last updated: April 27, 2026</p>

          <div style={styles.content}>
            <section style={styles.section}>
              <h2 style={styles.subtitle}>Introduction</h2>
              <p style={styles.paragraph}>
                Daily Well Fact ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website. Please read this policy carefully.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Information We Collect</h2>
              <p style={styles.paragraph}>
                We do not require users to create accounts or provide personal information to browse 
                our content. However, we may automatically collect certain information when you visit 
                the site, including:
              </p>
              <ul style={styles.list}>
                <li>IP address and device identifiers</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring website or search engine</li>
              </ul>
              <p style={styles.paragraph}>
                If you contact us via email (e.g., dailyhabitfact@gmail.com), we will only use your 
                email address to respond to your inquiry. We do not sell or share your email address 
                with third parties.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Cookies and Similar Technologies</h2>
              <p style={styles.paragraph}>
                We use cookies and similar tracking technologies to enhance user experience, analyze 
                site traffic, and serve relevant advertisements. Cookies are small text files stored 
                on your device. Types of cookies we use include:
              </p>
              <ul style={styles.list}>
                <li><strong>Essential cookies:</strong> Required for basic site functionality.</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our site (e.g., Google Analytics).</li>
                <li><strong>Advertising cookies:</strong> Used by Google AdSense to show personalized or non-personalized ads.</li>
              </ul>
              <p style={styles.paragraph}>
                You can control or delete cookies through your browser settings. However, disabling 
                cookies may affect site functionality.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Google AdSense & Third-Party Advertising</h2>
              <p style={styles.paragraph}>
                We use Google AdSense, a third-party advertising service provided by Google LLC, to 
                display ads on our website. Google AdSense may use cookies, web beacons, and other 
                technologies to serve ads based on your visits to this site and other websites.
              </p>
              <p style={styles.paragraph}>
                Specifically, Google may use the <strong>DoubleClick cookie</strong> to enable 
                interest-based (personalized) advertising. You can learn more about how Google uses 
                information from sites that use its services at:
                <br />
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={styles.link}>
                  https://policies.google.com/technologies/partner-sites
                </a>
              </p>
              <p style={styles.paragraph}>
                <strong>Third-party vendors, including Google, may:</strong>
              </p>
              <ul style={styles.list}>
                <li>Use cookies to serve ads based on a user's prior visits to our website</li>
                <li>Use data about user behavior (not personally identifiable) to show relevant ads</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Personalized vs. Non-Personalized Ads</h2>
              <p style={styles.paragraph}>
                By default, Google AdSense may show personalized ads based on your browsing history, 
                location, device, and other signals. You have the right to limit or disable 
                personalized advertising.
              </p>
              <p style={styles.paragraph}>
                <strong>To opt out of personalized ads:</strong>
              </p>
              <ul style={styles.list}>
                <li>Visit Google's <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Ads Settings</a> page</li>
                <li>Disable cookies in your browser (may also disable non-personalized ads)</li>
                <li>Use the <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" style={styles.link}>NAI opt-out page</a> for multiple ad networks</li>
              </ul>
              <p style={styles.paragraph}>
                Even if you opt out of personalized ads, you will still see generic (non-personalized) 
                ads based on contextual page content.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Other Third-Party Services</h2>
              <p style={styles.paragraph}>
                We may also use the following third-party services, each with their own privacy policies:
              </p>
              <ul style={styles.list}>
                <li><strong>Vercel:</strong> Hosting provider (logs are retained temporarily; see Vercel's privacy policy)</li>
                <li><strong>Sanity CMS:</strong> Content management (may collect anonymous usage data)</li>
                <li><strong>Google Analytics:</strong> Anonymous traffic analysis (you can opt out via <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={styles.link}>Google Analytics opt-out add-on</a>)</li>
              </ul>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>User Rights (Opt-Out & Control)</h2>
              <p style={styles.paragraph}>
                Depending on your location (e.g., EEA, UK, California), you may have rights to:
              </p>
              <ul style={styles.list}>
                <li>Access the personal data we hold about you (we collect very little)</li>
                <li>Request deletion of your data</li>
                <li>Opt out of the sale of personal information (we do not sell data)</li>
                <li>Withdraw consent for cookies (via browser settings or cookie consent tool)</li>
              </ul>
              <p style={styles.paragraph}>
                To exercise these rights, contact us at <a href="mailto:dailyhabitfact@gmail.com" style={styles.link}>dailyhabitfact@gmail.com</a>.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Children's Privacy</h2>
              <p style={styles.paragraph}>
                Daily Well Fact does not knowingly collect any personal information from children under 
                the age of 13. If you believe we have inadvertently collected such data, please contact 
                us immediately so we can delete it.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Changes to This Privacy Policy</h2>
              <p style={styles.paragraph}>
                We may update this policy from time to time. The "Last updated" date at the top of this 
                page will reflect the most recent changes. Continued use of the site after changes 
                constitutes acceptance of the revised policy.
              </p>
            </section>

            <section style={styles.section}>
              <h2 style={styles.subtitle}>Contact Information</h2>
              <p style={styles.paragraph}>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
  list: {
    marginTop: '0.5rem',
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
  },
  link: {
    color: '#10b981',
    textDecoration: 'underline',
  },
  section: {
    marginBottom: '1.5rem',
  },
};

export default Privacy;
