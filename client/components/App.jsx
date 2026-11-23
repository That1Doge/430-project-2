import React, { useEffect, useState} from 'react';

import Login from './Login';
import Signup from './Signup';

const App = () => {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('login');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('api/account');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.log(error);
            } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = (data) => {
    setUser(data.user);
  };

  const handleSignup = (data) => {
    setUser(data.user);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
        setPage('login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div>Loading QuestLog...</div>;
  }

  if (user) {
    return (
      <main className="dashboard-placeholder">
        <h1>Welcome to QuestLog, {user.username}!</h1>
        <p>Your gaming journey starts here.</p>

        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </main>
    );
  }

  if (page === 'signup') {
    return (
      <Signup
        onSignup={handleSignup}
        onSwitchToLogin={() => setPage('login')}
      />
    );
  }

  return (
    <Login
      onLogin={handleLogin}
      onSwitchToSignup={() => setPage('signup')}
    />
  );
};

export default App;