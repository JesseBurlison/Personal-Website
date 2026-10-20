import { Link } from 'react-router-dom';

function Contact() {
  return (
    <>
      <section className="py-5 text-white text-center page-hero">
        <div className="container py-3">
          <h1 className="fw-bold display-5">Get In Touch</h1>
          <p className="text-white-50 fs-5 mt-3">
            Whether it's a project idea or just a hello — I'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="card shadow-sm rounded-4 p-5">
                <i className="bi bi-linkedin fs-1 mb-4" style={{ color: 'var(--accent)' }} />
                <h4 className="fw-bold mb-3">Connect on LinkedIn</h4>
                <p className="text-muted mb-4">
                  The best way to reach me is through LinkedIn. I'm happy to connect and chat about
                  opportunities, collaborations, or anything tech-related.
                </p>
                <a
                  href="https://www.linkedin.com/in/jesseburlison/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg px-5"
                >
                  <i className="bi bi-linkedin me-2" />View My LinkedIn
                </a>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <div className="card shadow-sm rounded-4 p-5">
                <i className="bi bi-github fs-1 mb-4" style={{ color: 'var(--accent)' }} />
                <h4 className="fw-bold mb-3">Check Out My GitHub</h4>
                <p className="text-muted mb-4">
                  Browse my repositories, projects, and contributions. Open to collaboration on
                  interesting problems.
                </p>
                <a
                  href="https://github.com/jesseburlison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light btn-lg px-5"
                >
                  <i className="bi bi-github me-2" />View My GitHub
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
