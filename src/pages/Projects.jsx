import { Link } from 'react-router-dom';
import projects from '../data/projects';

function Projects() {
  return (
    <>
      <section className="py-5 text-white text-center page-hero">
        <div className="container py-3">
          <h1 className="fw-bold display-5">Projects</h1>
          <p className="text-white-50 fs-5 mt-3">Things I've built, shipped, and learned from.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="row g-4">
            {projects.map((project) => (
              <div className="col-md-6" key={project.id}>
                <div className="card project-card shadow-sm p-4 rounded-4 h-100">
                  <div className="card-body p-0">
                    <div className="card-icon mb-3">
                      <i className={`bi ${project.icon}`} />
                    </div>
                    <h5 className="card-title fw-bold">{project.title}</h5>
                    <p className="card-text text-muted small">{project.description}</p>
                    <div className="mt-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="skill-badge">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section section-pad text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Interested in collaborating?</h2>
          <p className="text-white-50 mb-4">Let's build something meaningful together.</p>
          <Link to="/contact" className="btn btn-light btn-lg px-5 fw-semibold">Get In Touch</Link>
        </div>
      </section>
    </>
  );
}

export default Projects;
