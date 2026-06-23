import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ minHeight: 56, padding: '0 0' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-5" to="/" onClick={() => setExpanded(false)}>
          Jesse <span>Burlison</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto gap-lg-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/projects', label: 'Projects' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
                  onClick={() => setExpanded(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <a
                href="https://www.linkedin.com/in/jesseburlison/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm px-3 ms-lg-2"
              >
                Connect on LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
