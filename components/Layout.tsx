import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

// Deterministic (no hydration mismatch)
const currentYear = new Date().getFullYear();

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link href="/" style={styles.logo}>
            Daily Well Fact
          </Link>

          <nav style={styles.nav}>
            <Link href="/" style={styles.navLink}>Home</Link>
            <Link href="/about" style={styles.navLink}>About</Link>
            <Link href="/privacy" style={styles.navLink}>Privacy</Link>
            <Link href="/disclaimer" style={styles.navLink}>Disclaimer</Link>
          </nav>
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>
        <p>© {currentYear} Daily Well Fact. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#f9fafb',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
  },
  headerContent: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#10b981',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap' as const,
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  main: {
    flex: 1,
    maxWidth: 1200,
    margin: '0 auto',
    padding: '2rem 1.5rem',
    width: '100%',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center' as const,
    padding: '1.5rem',
    color: '#6b7280',
    fontSize: '0.875rem',
  },
};

export default Layout;
