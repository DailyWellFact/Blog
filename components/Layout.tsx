import React, { useState } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

// FIX: deterministic year
const currentYear = new Date().getFullYear();

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          {/* FIX: modern Link usage */}
          <Link href="/" style={styles.logo}>
            Daily Well Fact
          </Link>

          <button
            onClick={toggleMenu}
            style={styles.hamburger}
            className="hamburger"
            aria-label="Menu"
          >
            <div
              style={{
                ...styles.hamburgerLine,
                transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <div
              style={{
                ...styles.hamburgerLine,
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <div
              style={{
                ...styles.hamburgerLine,
                transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link href="/" style={styles.navLink} onClick={closeMenu}>Home</Link>
            <Link href="/about" style={styles.navLink} onClick={closeMenu}>About</Link>
            <Link href="/contact" style={styles.navLink} onClick={closeMenu}>Contact</Link>
            <Link href="/privacy" style={styles.navLink} onClick={closeMenu}>Privacy</Link>
            <Link href="/disclaimer" style={styles.navLink} onClick={closeMenu}>Disclaimer</Link>
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
            <Link href="/about" style={styles.footerLink}>About Us</Link>
            <Link href="/contact" style={styles.footerLink}>Contact</Link>
            <Link href="/privacy" style={styles.footerLink}>Privacy Policy</Link>
            <Link href="/disclaimer" style={styles.footerLink}>Disclaimer</Link>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Connect</h4>
            <a href="mailto:dailyhabitfact@gmail.com" style={styles.footerLink}>
              Email Us
            </a>
          </div>
        </div>

        <div style={styles.copyright}>
          {/* FIX: stable year */}
          <p>© {currentYear} Daily Well Fact. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .nav {
          display: flex;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .hamburger {
            display: flex !important;
          }
          .nav {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem 2rem;
            border-bottom: 1px solid #e5e7eb;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .nav.nav-open {
            display: flex;
          }
        }

        @media (min-width: 769px) {
          .hamburger {
            display: none !important;
          }
        }

        .nav a:hover {
          color: #10b981 !important;
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
    backgroundColor: 'rgba(255,255,255,0.98)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative' as const,
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textDecoration: 'none',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    width: '24px',
    height: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  hamburgerLine: {
    width: '24px',
    height: '2px',
    backgroundColor: '#1f2937',
    borderRadius: '2px',
    transition: 'transform 0.3s, opacity 0.3s',
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
  },
  main: {
    flex: 1,
    maxWidth: 1280,
    margin: '0 auto',
    padding: '2rem 1.5rem',
    width: '100%',
  },
  footer: {
    backgroundColor: '#111827',
    color: '#9ca3af',
    padding: '2.5rem 1.5rem 1.5rem',
    marginTop: '3rem',
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
    gap: '0.5rem',
  },
  footerLogo: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'white',
  },
  footerText: {
    fontSize: '0.85rem',
  },
  footerHeading: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'white',
  },
  footerLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '0.85rem',
  },
  copyright: {
    maxWidth: 1280,
    margin: '0 auto',
    textAlign: 'center' as const,
    fontSize: '0.75rem',
    borderTop: '1px solid #1f2937',
    paddingTop: '1rem',
  },
};

export default Layout;