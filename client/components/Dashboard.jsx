import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');

  const pageTitles = {
    dashboard: 'Dashboard',
    games: 'My Games',
    quests: 'Quests',
    achievements: 'Achievements',
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={onLogout}
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>{pageTitles[activePage]}</h1>
            <p>Welcome back, {user.username}!</p>
          </div>
        </header>

        {activePage === 'dashboard' && (
          <section className="dashboard-content">
            <div className="dashboard-stats">
              <article className="stat-card">
                <h3>Total Games</h3>
                <p>0</p>
              </article>

              <article className="stat-card">
                <h3>Active Quests</h3>
                <p>0</p>
              </article>

              <article className="stat-card">
                <h3>Completed Quests</h3>
                <p>0</p>
              </article>

              <article className="stat-card">
                <h3>Overall Completion</h3>
                <p>0%</p>
              </article>
            </div>

            <section className="recent-quests">
              <h2>Recently Updated Quests</h2>
              <p>You haven't created any quests yet.</p>
            </section>
          </section>
        )}

        {activePage !== 'dashboard' && (
          <section className="dashboard-content">
            <p>{pageTitles[activePage]} will be available soon.</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
