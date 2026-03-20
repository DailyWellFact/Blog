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
        <p>© {new Date().getFullYear()} Daily Well Fact. All rights reserved.</p>
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
    transition: 'color 0.2s',
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
    transition: 'color 0.2s',
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