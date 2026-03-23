import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link href="/">
            <a style={styles.logo}>Daily Well Fact</a>
          </Link>
          <nav style={styles.nav}>
            <Link href="/"><a style={styles.navLink}>Home</a></Link>
            <Link href="/about"><a style={styles.navLink}>About</a></Link>
            <Link href="/privacy"><a style={styles.navLink}>Privacy</a></Link>
            <Link href="/disclaimer"><a style={styles.navLink}>Disclaimer</a></Link>
          </nav>
        </div>
      </header>
      <main style={styles.main}>{children}</main>
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerLogo}>Daily Well Fact</h3>
            <p style={styles.footerText}>
              Your daily dose of science-backed wellness insights.
            </p>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Quick Links</h4>
            <Link href="/about"><a style={styles.footerLink}>About Us</a></Link>
            <Link href="/privacy"><a style={styles.footerLink}>Privacy Policy</a></Link>
            <Link href="/disclaimer"><a style={styles.footerLink}>Disclaimer</a></Link>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>© {new Date().getFullYear()} Daily Well Fact. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#ffffff',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  main: {
    flex: 1,
    maxWidth: 1280,
    margin: '0 auto',
    padding: '3rem 2rem',
    width: '100%',
  },
  footer: {
    backgroundColor: '#111827',
    color: '#9ca3af',
    padding: '3rem 2rem 1.5rem',
  },
  footerContent: {
    maxWidth: 1280,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  footerLogo: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
    marginBottom: '0.5rem',
  },
  footerText: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    color: '#9ca3af',
  },
  footerHeading: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'white',
    marginBottom: '0.5rem',
  },
  footerLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
  },
  copyright: {
    maxWidth: 1280,
    margin: '0 auto',
    textAlign: 'center' as const,
    fontSize: '0.8rem',
    borderTop: '1px solid #1f2937',
    paddingTop: '1.5rem',
    color: '#6b7280',
  },
};

export default Layout;