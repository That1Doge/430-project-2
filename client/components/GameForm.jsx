import React, { useState } from 'react';

const GameForm = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [status, setStatus] = useState('Backlog');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            title,
            platform,
            genre,
            status,
            description,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="game-form">
            <h2>Add a Game</h2>

            <label htmlFor="game-title">Game Title</label>
            <input
                id="game-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={100}
                required
            />

            <label htmlFor="game-platform">Platform</label>
            <input
                id="game-platform"
                type="text"
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
                required
                placeholder="e.g. PC, PlayStation 5, Xbox"
            />

            <label htmlFor="game-genre">Genre</label>
            <input
                id="game-genre"
                type="text"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                required
                placeholder="e.g. RPG, Action, Adventure"
            />

            <label htmlFor="game-status">Status</label>
            <select
                id="game-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
            >
                <option value="Playing">Playing</option>
                <option value="Backlog">Backlog</option>
                <option value="Completed">Completed</option>
                <option value="Paused">Paused</option>
            </select>

            <label htmlFor="game-description">Description (Optional)</label>
            <textarea
                id="game-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={500}
                rows={4}
            />

            <div className="game-form-actions">
                <button type="submit">Save Game</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default GameForm;