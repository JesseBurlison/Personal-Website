import { useState } from 'react';
import { Link } from 'react-router-dom';
import games from '../data/games';
import Tetris from '../components/games/Tetris';

const GAME_COMPONENTS = {
  tetris: Tetris,
};

function Games() {
  const [selected, setSelected] = useState('tetris');
  const activeGame = games.find((g) => g.id === selected);
  const ActiveComponent = GAME_COMPONENTS[selected];

  return (
    <>
      <section className="py-5 text-white text-center page-hero">
        <div className="container py-3">
          <h1 className="fw-bold display-5">Games</h1>
          <p className="text-white-50 fs-5 mt-3">A few interactive breaks I built for fun.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="row g-4 mb-5">
            {games.map((game) => {
              const isAvailable = game.status === 'available';
              const isActive = selected === game.id;
              return (
                <div className="col-md-4" key={game.id}>
                  <button
                    type="button"
                    className={`card skill-card shadow-sm p-3 w-100 h-100 text-start border-0 game-select-card ${isActive ? 'game-select-card-active' : ''}`}
                    onClick={() => isAvailable && setSelected(game.id)}
                    disabled={!isAvailable}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="card-icon mb-0">
                          <i className={`bi ${game.icon}`} />
                        </div>
                        {!isAvailable && (
                          <span className="skill-badge">Coming Soon</span>
                        )}
                      </div>
                      <h5 className="card-title fw-bold">{game.title}</h5>
                      <p className="card-text text-muted small mb-0">{game.description}</p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {activeGame && ActiveComponent && (
            <div>
              <h3 className="fw-bold mb-4 text-center">{activeGame.title}</h3>
              <ActiveComponent />
            </div>
          )}
        </div>
      </section>

      <section className="cta-section section-pad text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Enjoyed the break?</h2>
          <p className="text-white-50 mb-4">Let's talk about something I can build for you.</p>
          <Link to="/contact" className="btn btn-light btn-lg px-5 fw-semibold">Get In Touch</Link>
        </div>
      </section>
    </>
  );
}

export default Games;
