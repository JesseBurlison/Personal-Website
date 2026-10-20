import { useCallback, useEffect, useReducer } from 'react';

const COLS = 10;
const ROWS = 20;

const COLORS = {
  I: '#4dd8e6',
  J: '#4d7cff',
  L: '#ffa94d',
  O: '#ffe14d',
  S: '#4dff88',
  T: '#c04dff',
  Z: '#ff4d4d',
};

const TYPES = Object.keys(COLORS);

// Each shape has 4 rotation states; each state is a list of [row, col]
// cells occupied within a 4x4 bounding box.
const SHAPES = {
  I: [
    [[1, 0], [1, 1], [1, 2], [1, 3]],
    [[0, 2], [1, 2], [2, 2], [3, 2]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[0, 1], [1, 1], [2, 1], [3, 1]],
  ],
  J: [
    [[0, 0], [1, 0], [1, 1], [1, 2]],
    [[0, 1], [0, 2], [1, 1], [2, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 2]],
    [[0, 1], [1, 1], [2, 0], [2, 1]],
  ],
  L: [
    [[0, 2], [1, 0], [1, 1], [1, 2]],
    [[0, 1], [1, 1], [2, 1], [2, 2]],
    [[1, 0], [1, 1], [1, 2], [2, 0]],
    [[0, 0], [0, 1], [1, 1], [2, 1]],
  ],
  O: [
    [[0, 1], [0, 2], [1, 1], [1, 2]],
    [[0, 1], [0, 2], [1, 1], [1, 2]],
    [[0, 1], [0, 2], [1, 1], [1, 2]],
    [[0, 1], [0, 2], [1, 1], [1, 2]],
  ],
  S: [
    [[0, 1], [0, 2], [1, 0], [1, 1]],
    [[0, 1], [1, 1], [1, 2], [2, 2]],
    [[1, 1], [1, 2], [2, 0], [2, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
  ],
  T: [
    [[0, 1], [1, 0], [1, 1], [1, 2]],
    [[0, 1], [1, 1], [1, 2], [2, 1]],
    [[1, 0], [1, 1], [1, 2], [2, 1]],
    [[0, 1], [1, 0], [1, 1], [2, 1]],
  ],
  Z: [
    [[0, 0], [0, 1], [1, 1], [1, 2]],
    [[0, 2], [1, 1], [1, 2], [2, 1]],
    [[1, 0], [1, 1], [2, 1], [2, 2]],
    [[0, 1], [1, 0], [1, 1], [2, 0]],
  ],
};

function randomType() {
  return TYPES[Math.floor(Math.random() * TYPES.length)];
}

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function spawnPiece(type) {
  return { type, rotation: 0, x: 3, y: 0 };
}

function getCells(piece) {
  return SHAPES[piece.type][piece.rotation];
}

function collides(board, piece, offsetX = 0, offsetY = 0, rotation = piece.rotation) {
  const cells = SHAPES[piece.type][rotation];
  for (const [r, c] of cells) {
    const row = piece.y + r + offsetY;
    const col = piece.x + c + offsetX;
    if (col < 0 || col >= COLS || row >= ROWS) return true;
    if (row >= 0 && board[row][col]) return true;
  }
  return false;
}

function mergePiece(board, piece) {
  const next = board.map((row) => [...row]);
  for (const [r, c] of getCells(piece)) {
    const row = piece.y + r;
    const col = piece.x + c;
    if (row >= 0) next[row][col] = piece.type;
  }
  return next;
}

function clearLines(board) {
  const kept = board.filter((row) => row.some((cell) => !cell));
  const cleared = ROWS - kept.length;
  const next = Array.from({ length: cleared }, () => Array(COLS).fill(null)).concat(kept);
  return { board: next, cleared };
}

function scoreForLines(cleared, level) {
  const table = { 1: 100, 2: 300, 3: 500, 4: 800 };
  return (table[cleared] || 0) * level;
}

function dropIntervalForLevel(level) {
  return Math.max(120, 1000 - (level - 1) * 75);
}

function ghostY(board, piece) {
  let offset = 0;
  while (!collides(board, piece, 0, offset + 1)) offset += 1;
  return piece.y + offset;
}

function lockAndAdvance(state) {
  let board = mergePiece(state.board, state.piece);
  const { board: clearedBoard, cleared } = clearLines(board);
  board = clearedBoard;

  const lines = state.lines + cleared;
  const level = Math.floor(lines / 10) + 1;
  const score = state.score + scoreForLines(cleared, state.level);

  const piece = spawnPiece(state.next);
  const next = randomType();
  const gameOver = collides(board, piece);

  return {
    ...state,
    board,
    piece,
    next,
    lines,
    level,
    score,
    status: gameOver ? 'gameover' : state.status,
  };
}

function initialState() {
  return {
    board: createEmptyBoard(),
    piece: spawnPiece(randomType()),
    next: randomType(),
    score: 0,
    lines: 0,
    level: 1,
    status: 'playing',
  };
}

function reducer(state, action) {
  if (state.status === 'gameover' && action.type !== 'RESTART') return state;

  switch (action.type) {
    case 'RESTART':
      return initialState();

    case 'PAUSE_TOGGLE':
      if (state.status === 'playing') return { ...state, status: 'paused' };
      if (state.status === 'paused') return { ...state, status: 'playing' };
      return state;

    case 'MOVE': {
      if (state.status !== 'playing') return state;
      const { dx, dy } = action;
      if (!collides(state.board, state.piece, dx, dy)) {
        const score = dy > 0 ? state.score + 1 : state.score;
        return { ...state, piece: { ...state.piece, x: state.piece.x + dx, y: state.piece.y + dy }, score };
      }
      if (dy > 0) {
        return lockAndAdvance(state);
      }
      return state;
    }

    case 'ROTATE': {
      if (state.status !== 'playing') return state;
      const rotation = (state.piece.rotation + 1) % 4;
      const kicks = [0, -1, 1, -2, 2];
      for (const dx of kicks) {
        if (!collides(state.board, state.piece, dx, 0, rotation)) {
          return { ...state, piece: { ...state.piece, rotation, x: state.piece.x + dx } };
        }
      }
      return state;
    }

    case 'HARD_DROP': {
      if (state.status !== 'playing') return state;
      const y = ghostY(state.board, state.piece);
      const dropped = y - state.piece.y;
      const piece = { ...state.piece, y };
      return lockAndAdvance({ ...state, piece, score: state.score + dropped * 2 });
    }

    case 'TICK': {
      if (state.status !== 'playing') return state;
      if (!collides(state.board, state.piece, 0, 1)) {
        return { ...state, piece: { ...state.piece, y: state.piece.y + 1 } };
      }
      return lockAndAdvance(state);
    }

    default:
      return state;
  }
}

function Tetris() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  useEffect(() => {
    if (state.status !== 'playing') return undefined;
    const interval = setInterval(() => dispatch({ type: 'TICK' }), dropIntervalForLevel(state.level));
    return () => clearInterval(interval);
  }, [state.status, state.level]);

  const handleKey = useCallback((e) => {
    const keysHandled = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'KeyP', 'KeyR'];
    if (keysHandled.includes(e.code)) e.preventDefault();

    switch (e.code) {
      case 'ArrowLeft':
        dispatch({ type: 'MOVE', dx: -1, dy: 0 });
        break;
      case 'ArrowRight':
        dispatch({ type: 'MOVE', dx: 1, dy: 0 });
        break;
      case 'ArrowDown':
        dispatch({ type: 'MOVE', dx: 0, dy: 1 });
        break;
      case 'ArrowUp':
        dispatch({ type: 'ROTATE' });
        break;
      case 'Space':
        dispatch({ type: 'HARD_DROP' });
        break;
      case 'KeyP':
        dispatch({ type: 'PAUSE_TOGGLE' });
        break;
      case 'KeyR':
        dispatch({ type: 'RESTART' });
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Build the display grid: board cells plus the active piece plus a ghost outline.
  const display = state.board.map((row) => [...row]);
  const ghost = state.status === 'playing' ? ghostY(state.board, state.piece) : state.piece.y;
  if (state.status !== 'gameover') {
    for (const [r, c] of getCells(state.piece)) {
      const row = ghost + r;
      const col = state.piece.x + c;
      if (row >= 0 && row < ROWS && col >= 0 && col < COLS && !display[row][col]) {
        display[row][col] = `ghost-${state.piece.type}`;
      }
    }
    for (const [r, c] of getCells(state.piece)) {
      const row = state.piece.y + r;
      const col = state.piece.x + c;
      if (row >= 0 && row < ROWS) display[row][col] = state.piece.type;
    }
  }

  return (
    <div className="tetris-wrapper">
      <div className="tetris-main">
        <div className="tetris-board-outer">
          <div className="tetris-board">
            {display.map((row, r) =>
              row.map((cell, c) => {
                const isGhost = typeof cell === 'string' && cell.startsWith('ghost-');
                const type = isGhost ? cell.replace('ghost-', '') : cell;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`tetris-cell ${isGhost ? 'tetris-cell-ghost' : ''}`}
                    style={type ? { '--cell-color': COLORS[type] } : undefined}
                  />
                );
              })
            )}
          </div>

          {state.status === 'paused' && (
            <div className="tetris-overlay">
              <div>
                <div className="fw-bold fs-4 mb-2">Paused</div>
                <button className="btn btn-primary btn-sm" onClick={() => dispatch({ type: 'PAUSE_TOGGLE' })}>
                  Resume
                </button>
              </div>
            </div>
          )}

          {state.status === 'gameover' && (
            <div className="tetris-overlay">
              <div>
                <div className="fw-bold fs-4 mb-1">Game Over</div>
                <div className="text-muted small mb-3">Score: {state.score}</div>
                <button className="btn btn-primary btn-sm" onClick={() => dispatch({ type: 'RESTART' })}>
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="tetris-side">
          <div className="card rounded-4 p-3 mb-2">
            <div className="row g-2 text-center">
              <div className="col-4">
                <div className="text-muted small text-uppercase" style={{ letterSpacing: 1 }}>Score</div>
                <div className="fw-bold fs-5">{state.score}</div>
              </div>
              <div className="col-4">
                <div className="text-muted small text-uppercase" style={{ letterSpacing: 1 }}>Level</div>
                <div className="fw-bold fs-5">{state.level}</div>
              </div>
              <div className="col-4">
                <div className="text-muted small text-uppercase" style={{ letterSpacing: 1 }}>Lines</div>
                <div className="fw-bold fs-5">{state.lines}</div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 mb-2">
            <button
              className="btn btn-outline-light btn-sm flex-fill"
              onClick={() => dispatch({ type: 'PAUSE_TOGGLE' })}
              disabled={state.status === 'gameover'}
            >
              <i className={`bi ${state.status === 'paused' ? 'bi-play-fill' : 'bi-pause-fill'} me-1`} />
              {state.status === 'paused' ? 'Resume' : 'Pause'}
            </button>
            <button className="btn btn-outline-light btn-sm flex-fill" onClick={() => dispatch({ type: 'RESTART' })}>
              <i className="bi bi-arrow-clockwise me-1" />Restart
            </button>
          </div>

          <div className="small text-muted d-none d-md-block">
            <div><kbd>←</kbd> <kbd>→</kbd> Move &nbsp; <kbd>↑</kbd> Rotate</div>
            <div><kbd>↓</kbd> Soft drop &nbsp; <kbd>Space</kbd> Hard drop</div>
            <div><kbd>P</kbd> Pause &nbsp; <kbd>R</kbd> Restart</div>
          </div>
        </div>
      </div>

      <div className="tetris-touch-controls d-md-none">
        <button className="btn btn-outline-light" onClick={() => dispatch({ type: 'MOVE', dx: -1, dy: 0 })}>
          <i className="bi bi-arrow-left" />
        </button>
        <button className="btn btn-outline-light" onClick={() => dispatch({ type: 'ROTATE' })}>
          <i className="bi bi-arrow-clockwise" />
        </button>
        <button className="btn btn-outline-light" onClick={() => dispatch({ type: 'MOVE', dx: 1, dy: 0 })}>
          <i className="bi bi-arrow-right" />
        </button>
        <button className="btn btn-outline-light" onClick={() => dispatch({ type: 'MOVE', dx: 0, dy: 1 })}>
          <i className="bi bi-arrow-down" />
        </button>
        <button className="btn btn-primary" onClick={() => dispatch({ type: 'HARD_DROP' })}>
          Drop
        </button>
      </div>
    </div>
  );
}

export default Tetris;
