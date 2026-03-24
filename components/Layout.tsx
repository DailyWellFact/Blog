import React, { useState } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link href="/">
            <a style={styles.logo} onClick={closeMenu}>
              Daily Well Fact
            </a>
          </Link>

          {/* Hamburger button - visible on mobile */}
          <button
            onClick={toggleMenu}
            style={styles.hamburger}
            aria-label="Toggle menu"
          >
            <span style={{ ...styles.hamburgerLine, transform: menuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }} />
            <span style={{ ...styles.hamburgerLine, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...styles.hamburgerLine, transform: menuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }} />
          </button>

          {/* Navigation links */}
          <nav style={{ ...styles.nav, ...(menuOpen ? styles.navOpen : {}) }}>
            <Link href="/"><a style={styles.navLink} onClick={closeMenu}>Home</a></Link>
            <Link href="/about"><a style={styles.navLink} onClick={closeMenu}>About</a></Link>
            <Link href="/contact"><a style={styles.navLink} onClick={closeMenu}>Contact</a></Link>
            <Link href="/privacy"><a style={styles.navLink} onClick={closeMenu}>Privacy</a></Link>
            <Link href="/disclaimer"><a style={styles.navLink} onClick={closeMenu}>Disclaimer</a></Link>
          </nav>
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <h3 style={styles.footerLogo}>Daily Well Fact</h3>
            <p style={styles.footerText}>
              Small steps, big wellness. Science-backed insights for a healthier you.
            </p>
          </div>
          <div style={styles.footerLinks}>
            <Link href="/about"><a style={styles.footerLink}>About</a></Link>
            <Link href="/contact"><a style={styles.footerLink}>Contact</a></Link>
            <Link href="/privacy"><a style={styles.footerLink}>Privacy</a></Link>
            <Link href="/disclaimer"><a style={styles.footerLink}>Disclaimer</a></Link>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>© {new Date().getFullYear()} Daily Well Fact. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-open {
            display: flex !important;
            flex-direction: column !important;
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            right: 0 !important;
            background-color: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(8px) !important;
            padding: 1rem 2rem !important;
            gap: 1rem !important;
            border-top: 1px solid #e5e7eb !important;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1) !important;
          }
          .nav-link {
            font-size: 1rem !important;
            padding: 0.5rem 0 !important;
          }
        }
      `}</style>
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
    position: 'relative' as const,
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
    zIndex: 2,
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    width: '28px',
    height: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    zIndex: 2,
    // Hide on desktop
    '@media (min-width: 769px)': {
      display: 'none',
    },
  },
  hamburgerLine: {
    width: '28px',
    height: '2px',
    backgroundColor: '#1f2937',
    transition: 'transform 0.2s, opacity 0.2s',
    borderRadius: '2px',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    transition: 'all 0.3s ease',
    // Default for desktop
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  navOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(8px)',
    padding: '1rem 2rem',
    gap: '1rem',
    borderTop: '1px solid #e5e7eb',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    // Mobile override
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      padding: '0.5rem 0',
    },
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap' as const,
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerBrand: {
    flex: 1,
    minWidth: '200px',
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
  footerLinks: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap' as const,
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

// Note: We cannot directly use media queries in the style object, so we rely on the <style jsx> block.
// The styles object is used for base styles, and the <style jsx> overrides for mobile.

export default Layout;