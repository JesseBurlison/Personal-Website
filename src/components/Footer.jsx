import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Jesse <span style={{ color: 'var(--accent)' }}>Burlison</span></h5>
            <p className="text-white-50 small">
              Software Engineer based in Cheshire, CT — specializing in AI-powered solutions,
              cloud architecture, and full-stack development.
            </p>
          </div>

          <div className="col-md-2">
            <h6 className="fw-semibold mb-3">Navigation</h6>
            <ul className="list-unstyled small">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/projects', label: 'Projects' },
                { to: '/games', label: 'Games' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to} className="mb-1">
                  <Link to={to} className="text-white-50 text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Contact</h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-2"><i className="bi bi-geo-alt-fill me-2" />Cheshire, CT</li>
            </ul>
            <div className="d-flex gap-2 mt-3">
              <a href="https://www.linkedin.com/in/jesseburlison/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm"><i className="bi bi-linkedin" /></a>
              <a href="https://github.com/jesseburlison" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm"><i className="bi bi-github" /></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary mt-4" />
        <div className="text-center small text-white-50">
          &copy; {year} Jesse Burlison. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
