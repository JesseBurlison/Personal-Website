import { Link } from 'react-router-dom';
import skillGroups from '../data/skills';

function Home() {
  const featured = skillGroups.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-section text-white">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <p className="text-uppercase small fw-semibold mb-2" style={{ color: 'var(--accent)', letterSpacing: 2 }}>
                Software Engineer
              </p>
              <h1 className="display-4 fw-bold mb-4">
                Hi, I'm <span style={{ color: 'var(--accent)' }}>Jesse Burlison</span>
              </h1>
              <p className="lead text-white-50 mb-4">
                I build AI-powered systems, cloud infrastructure, and full-stack applications.
                Based in Cheshire, CT — currently a Software Engineer I at Travelers, leading
                AI adoption and building production-grade machine learning pipelines.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/projects" className="btn btn-primary btn-lg px-4">
                  View My Work
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="col-lg-5 text-center">
              <div className="headshot-wrapper">
                <img src="/jesse-headshot.jpg" alt="Jesse Burlison" />
              </div>
            </div>
          </div>

          <div className="row g-4 mt-5">
            {[
              { icon: 'bi-geo-alt-fill', label: 'Cheshire, CT' },
              { icon: 'bi-briefcase-fill', label: '6+ Years Experience' },
              { icon: 'bi-mortarboard-fill', label: 'M.S. Software Engineering' },
              { icon: 'bi-award-fill', label: 'AWS Certified' },
            ].map(({ icon, label }) => (
              <div className="col-6 col-md-3" key={label}>
                <div className="d-flex align-items-center gap-2">
                  <i className={`bi ${icon} fs-4`} style={{ color: 'var(--accent)' }} />
                  <span className="fw-semibold">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">What I Work With</h2>
            <p className="text-muted">A snapshot of my core technical areas.</p>
          </div>
          <div className="row g-4">
            {featured.map((group) => (
              <div className="col-md-4" key={group.id}>
                <div className="card skill-card shadow-sm p-3">
                  <div className="card-body">
                    <div className="card-icon mb-3">
                      <i className={`bi ${group.icon}`} />
                    </div>
                    <h5 className="card-title fw-bold">{group.title}</h5>
                    <p className="card-text text-muted small">{group.description}</p>
                    <div className="mt-3">
                      {group.skills.map((s) => (
                        <span key={s} className="skill-badge">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/about" className="btn btn-outline-primary btn-lg px-5">
              Full Skill Set <i className="bi bi-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="why-us-section section-pad">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold display-6 mb-4">A Bit About Me</h2>
              <p className="text-muted mb-4">
                I'm a Software Engineer with a passion for AI and cloud technologies. At Travelers,
                I help define circle-wide strategies for emerging AI tools, conduct training on AWS
                Bedrock and agent frameworks, and ship AI-powered workflows that solve real business problems.
              </p>
              {[
                { icon: 'bi-robot', title: 'AI & Agents', text: 'Building multi-agent systems, RAG pipelines, and LLM-powered automation with AWS Bedrock and LangChain.' },
                { icon: 'bi-cloud-fill', title: 'Cloud Native', text: 'AWS-certified with hands-on experience deploying containerized workloads and CI/CD pipelines.' },
                { icon: 'bi-people-fill', title: 'Mentor & Leader', text: 'Training new hires and LDP employees on emerging AI technologies and engineering best practices.' },
                { icon: 'bi-mortarboard-fill', title: 'Lifelong Learner', text: 'M.S. in Software Engineering from CCSU, with a focus on machine vision and robotics.' },
              ].map(({ icon, title, text }) => (
                <div className="d-flex gap-3 mb-3" key={title}>
                  <div className="flex-shrink-0 mt-1">
                    <i className={`bi ${icon} fs-4`} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{title}</h6>
                    <p className="text-muted small mb-0">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-6">
              <div className="row g-3 text-center">
                {[
                  { stat: '6+', label: 'Years of Experience' },
                  { stat: 'M.S.', label: 'Software Engineering' },
                  { stat: 'AWS', label: 'Certified Cloud Practitioner' },
                  { stat: '3.60', label: 'Graduate GPA' },
                ].map(({ stat, label }) => (
                  <div className="col-6" key={label}>
                    <div className="card border-0 shadow-sm p-4 rounded-4">
                      <div className="fw-bold display-5" style={{ color: 'var(--primary)' }}>{stat}</div>
                      <div className="text-muted small mt-1">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section section-pad text-white text-center">
        <div className="container">
          <h2 className="fw-bold display-6 mb-3">Let's Build Something Together</h2>
          <p className="text-white-50 mb-4 fs-5">
            Open to new opportunities, collaborations, and interesting conversations.
          </p>
          <Link to="/contact" className="btn btn-light btn-lg px-5 fw-semibold">
            Reach Out
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
