import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Historique.css';

axios.defaults.withCredentials = true;

function Historique({ username, isManager }) {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCsrfToken = () => {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
  };

  axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/logs/', {
          withCredentials: true,
        });
        setLogs(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError('Failed to fetch transaction logs: ' + (error.response?.data?.message || error.message));
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert('Authentication required. Please log in.');
          window.location.href = 'http://127.0.0.1:8000/login/';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleLogout = () => {
    try {
      fetch('http://127.0.0.1:8000/logout/', {
        method: 'GET',
        credentials: 'include',
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <header>
        <div className="container">
          <h1>Historique des Transactions</h1>
          <p>
            Bienvenue, {username} | <button onClick={handleLogout}>Déconnexion</button>
            {isManager && <span> | Manager</span>}
          </p>
        </div>
      </header>

      <main>
        <div className="container">
          <button onClick={handleBackToHome} className="back-button">
            Retour à la page d'accueil
          </button>

          {loading && <div className="loading">Chargement...</div>}

          {error && !loading && <div className="error-message">{error}</div>}

          {!loading && !error && (
            <div className="logs-table-container">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>Utilisateur</th>
                    <th>Modèle</th>
                    <th>ID de l'Objet</th>
                    <th>Action</th>
                    <th>Changements</th>
                    <th>Horodatage</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <tr key={index}>
                        <td>{log.user || '-'}</td>
                        <td>{log.model_name}</td>
                        <td>{log.object_id}</td>
                        <td>{log.action}</td>
                        <td>
                          <pre>{JSON.stringify(log.changes, null, 2)}</pre>
                        </td>
                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Aucun journal de transaction disponible.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Historique;