import { Link } from 'react-router-dom';
import skillGroups from '../data/skills';

const experience = [
  {
    title: 'Software Engineer I',
    company: 'Travelers',
    location: 'Hartford, CT',
    period: 'May 2021 – Present',
    bullets: [
      'Help derive circle-wide strategies for developing technologies such as Amazon Bedrock',
      'Conducted training events on AWS Strands, agent teams, and the creation of RAGs and their pipelines',
      'Provided mentorship to new hires and LDP employees on emerging AI technologies',
      'Designed, developed, deployed, and maintained AI-powered workflows for the Bond and Specialty line of business',
      'Collaborates with stakeholders across teams to translate business needs into scalable AI-powered software solutions',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Realized Solutions Inc.',
    location: 'Southington, CT',
    period: 'November 2019 – February 2021',
    bullets: [
      'Developed and deployed web, Windows, and Android based applications',
      'Orchestrated data entry and management for numerous SQL servers',
      'Tracked work via Azure DevOps and ConnectWise Manage',
      'Communicated with clients for application requirement discovery and support',
      'Collaborated internally with multiple teams to efficiently meet client demands',
    ],
  },
];

const education = [
  {
    degree: 'M.S. Software Engineering',
    school: 'Central Connecticut State University (CCSU)',
    location: 'New Britain, CT',
    period: 'August 2020 – December 2024',
    detail: 'GPA: 3.60',
  },
  {
    degree: 'B.S. Computer Science — Honors Program',
    school: 'Central Connecticut State University (CCSU)',
    location: 'New Britain, CT',
    period: 'January 2014 – May 2020',
    detail: 'Concentration in Cybersecurity, Minor in Mathematics · GPA: 3.07',
  },
];

const certifications = [
  { icon: 'bi-award-fill', title: 'AWS Certified Cloud Practitioner', detail: 'Passed January 2022' },
  { icon: 'bi-people-fill', title: 'CCSU Scrum Master — Spring & Fall 2024', detail: 'Served as Scrum Master and mentor for undergraduate final project teams' },
];

function About() {
  return (
    <>
      <section className="py-5 text-white text-center page-hero">
        <div className="container py-3">
          <h1 className="fw-bold display-5">About Me</h1>
          <p className="text-white-50 fs-5 mt-3">Engineer. Builder. Lifelong learner.</p>
        </div>
      </section>

      {/* Bio */}
      <section className="section-pad">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5 text-center">
              <div className="headshot-wrapper">
                <img src="/jesse-headshot.jpg" alt="Jesse Burlison" />
              </div>
            </div>
            <div className="col-lg-7">
              <h2 className="fw-bold display-6 mb-4">Hi, I'm Jesse</h2>
              <p className="text-muted mb-3">
                I'm a Software Engineer based in Cheshire, CT with a passion for building AI-powered
                systems that solve real-world problems. I currently work at Travelers where I lead
                AI strategy, build multi-agent workflows, and mentor engineers on emerging technologies.
              </p>
              <p className="text-muted mb-3">
                My background spans the full stack — from Python-based machine learning pipelines and
                AWS cloud infrastructure to C# desktop apps and React front-ends. I earned my M.S. in
                Software Engineering from CCSU in 2024, where my capstone focused on a machine vision
                system for CNC operators.
              </p>
              <p className="text-muted">
                Outside of work, I enjoy tinkering with new tech, mentoring other developers, and
                finding ways to apply AI in unexpected places.
              </p>
              <div className="mt-4">
                <a
                  href="https://www.linkedin.com/in/jesseburlison/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary me-3"
                >
                  <i className="bi bi-linkedin me-2" />LinkedIn
                </a>
                <a
                  href="https://github.com/jesseburlison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light"
                >
                  <i className="bi bi-github me-2" />GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="why-us-section section-pad">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Experience</h2>
          </div>
          {experience.map((job) => (
            <div className="card shadow-sm rounded-4 p-4 mb-4" key={job.title + job.company}>
              <div className="d-flex flex-wrap justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="fw-bold mb-0">{job.title}</h5>
                  <div className="text-muted small">
                    <i className="bi bi-building me-1" />{job.company} &nbsp;·&nbsp;
                    <i className="bi bi-geo-alt me-1" />{job.location}
                  </div>
                </div>
                <span className="badge rounded-pill mt-1" style={{ background: 'rgba(30,144,255,0.15)', color: '#7ab8f5', border: '1px solid rgba(30,144,255,0.3)' }}>
                  {job.period}
                </span>
              </div>
              <ul className="text-muted small mb-0 ps-3">
                {job.bullets.map((b) => <li key={b} className="mb-1">{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Technical Skills</h2>
          </div>
          <div className="row g-4">
            {skillGroups.map((group) => (
              <div className="col-md-6" key={group.id}>
                <div className="card skill-card shadow-sm p-4 rounded-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <i className={`bi ${group.icon} fs-2`} style={{ color: 'var(--accent)' }} />
                    <h5 className="fw-bold mb-0">{group.title}</h5>
                  </div>
                  <p className="text-muted small mb-3">{group.description}</p>
                  <div>
                    {group.skills.map((s) => (
                      <span key={s} className="skill-badge">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="why-us-section section-pad">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Education</h2>
          </div>
          <div className="row g-4">
            {education.map((edu) => (
              <div className="col-md-6" key={edu.degree}>
                <div className="card shadow-sm rounded-4 p-4 h-100">
                  <i className="bi bi-mortarboard-fill fs-2 mb-3" style={{ color: 'var(--accent)' }} />
                  <h5 className="fw-bold">{edu.degree}</h5>
                  <div className="text-muted small mb-1">{edu.school} · {edu.location}</div>
                  <div className="text-muted small mb-2">{edu.period}</div>
                  <span className="skill-badge">{edu.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Certifications & Activities</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {certifications.map((cert) => (
              <div className="col-md-5" key={cert.title}>
                <div className="card shadow-sm rounded-4 p-4 text-center h-100">
                  <i className={`bi ${cert.icon} fs-1 mb-3`} style={{ color: 'var(--accent)' }} />
                  <h6 className="fw-bold">{cert.title}</h6>
                  <p className="text-muted small mb-0">{cert.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section section-pad text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Want to Work Together?</h2>
          <p className="text-white-50 mb-4">I'm always open to interesting opportunities and conversations.</p>
          <Link to="/contact" className="btn btn-light btn-lg px-5 fw-semibold">Contact Me</Link>
        </div>
      </section>
    </>
  );
}

export default About;
