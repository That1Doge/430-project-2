import React from 'react';

const Sidebar = ({ activePage, onNavigate, onLogout }) => {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard'},
    { id: 'games', label: 'My Games'},
    { id: 'quests', label: 'Quests'},
    { id: 'achievements', label: 'Achievements'},
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon"></span>
        <h2>QuestLog</h2>
      </div>

      <nav className="sidebar-navigation">
        <p className="sidebar-heading">MENU</p>

        {navigation.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-link ${
              activePage === item.id ? 'active' : ''
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-link logout-link"
          onClick={onLogout}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
