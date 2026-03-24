import React, { useState } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link href="/">
            <a style={styles.logo}>Daily Well Fact</a>
          </Link>

          {/* Hamburger button - visible on mobile */}
          <button onClick={toggleMenu} style={styles.hamburger} aria-label="Menu">
            <div style={{ ...styles.hamburgerLine, transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ ...styles.hamburgerLine, opacity: isMenuOpen ? 0 : 1 }} />
            <div style={{ ...styles.hamburgerLine, transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>

          {/* Desktop navigation */}
          <nav style={{ ...styles.nav, ...(isMenuOpen ? styles.navMobileOpen : styles.navMobileClosed) }}>
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
          <div style={styles.footerColumn}>
            <h3 style={styles.footerLogo}>Daily Well Fact</h3>
            <p style={styles.footerText}>
              Your daily dose of science-backed wellness insights.
            </p>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Quick Links</h4>
            <Link href="/about"><a style={styles.footerLink}>About Us</a></Link>
            <Link href="/contact"><a style={styles.footerLink}>Contact</a></Link>
            <Link href="/privacy"><a style={styles.footerLink}>Privacy Policy</a></Link>
            <Link href="/disclaimer"><a style={styles.footerLink}>Disclaimer</a></Link>
          </div>
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Connect</h4>
            <a href="mailto:dailyhabitfact@gmail.com" style={styles.footerLink}>Email Us</a>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>© {new Date().getFullYear()} Daily Well Fact. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 768px) {
          .nav-mobile-open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem 2rem;
            border-bottom: 1px solid #e5e7eb;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 99;
          }
          .nav-mobile-closed {
            display: none !important;
          }
          .footer-content {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            text-align: center;
          }
          .footer-column {
            align-items: center;
          }
          .footer-logo {
            font-size: 1.25rem !important;
          }
          .footer-text {
            font-size: 0.8rem !important;
          }
        }
        @media (min-width: 769px) {
          .nav-mobile-open, .nav-mobile-closed {
            display: flex !important;
          }
        }
        .hamburger:hover {
          background-color: #f3f4f6;
        }
        .nav-link:hover {
          color: #10b981 !important;
        }
        .footer-link:hover {
          color: #10b981 !important;
        }
        .primary-button:hover {
          background-color: #059669 !important;
        }
        .secondary-button:hover {
          background-color: #10b981 !important;
          color: white !important;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .card-image:hover {
          transform: scale(1.05);
        }
        .search-input:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
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
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
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
    backgroundClip: 'text',
    color: 'transparent',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
    transition: 'opacity 0.2s',
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
    padding: 0,
    margin: 0,
    zIndex: 100,
  },
  hamburgerLine: {
    width: '24px',
    height: '2px',
    backgroundColor: '#1f2937',
    borderRadius: '2px',
    transition: 'transform 0.3s, opacity 0.3s',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    transition: 'all 0.3s ease',
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    padding: '0.5rem 0',
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
    marginBottom: '0.25rem',
  },
  footerText: {
    fontSize: '0.85rem',
    lineHeight: 1.5,
    color: '#9ca3af',
  },
  footerHeading: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'white',
    marginBottom: '0.5rem',
    letterSpacing: '0.5px',
  },
  footerLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s',
  },
  copyright: {
    maxWidth: 1280,
    margin: '0 auto',
    textAlign: 'center' as const,
    fontSize: '0.75rem',
    borderTop: '1px solid #1f2937',
    paddingTop: '1rem',
    color: '#6b7280',
  },
};

export default Layout;