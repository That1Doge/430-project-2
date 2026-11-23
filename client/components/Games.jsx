import React, { useEffect, useState } from 'react';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadGames = async () => {
    try {
      const response = await fetch('/api/games');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to load games.');
      }

      setGames(data.games);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  if (loading) {
    return <p>Loading your games...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="games-page">
      <div className="games-header">
        <div>
          <h2>My Games</h2>
          <p>Manage your personal game library.</p>
        </div>

        <button type="button">
          + Add Game
        </button>
      </div>

      {games.length === 0 ? (
        <div className="games-empty">
          <h3>Your library is empty</h3>
          <p>Add your first game to start building your collection.</p>
        </div>
      ) : (
        <div className="games-list">
          {games.map((game) => (
            <article className="game-card" key={game._id}>
              <h3>{game.title}</h3>
              <p>{game.platform} · {game.genre}</p>
              <p>Status: {game.status}</p>

              {game.description && (
                <p>{game.description}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Games;
