import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PerimeterReservation.css';

function PerimeterReservation() {
  const navigate = useNavigate();
  const [wellSigle, setWellSigle] = useState('');
  const [fluid, setFluid] = useState('');
  const [reservoir, setReservoir] = useState('');
  const [proved, setProved] = useState('');
  const [probable, setProbable] = useState('');
  const [possible, setPossible] = useState('');
  const [estimator, setEstimator] = useState('');
  const [comments, setComments] = useState('');
  const [isDesUser, setIsDesUser] = useState(false);
  const [error, setError] = useState(null);
  const [wells, setWells] = useState([]);

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

  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth-status/', {
        credentials: 'include',
      });
      const data = await response.json();
      if (!data.is_authenticated) {
        alert('Please log in to continue');
        navigate('/login');
      }
      setIsDesUser(data.groups && data.groups.includes('des'));
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const fetchWells = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/wells/', {
        withCredentials: true,
      });
      setWells(response.data);
    } catch (err) {
      console.error('Error fetching wells:', err);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    fetchWells();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDesUser) {
      setError('Only DES users can manage reservoir estimates.');
      return;
    }

    // Validate numeric fields
    const provedNum = parseFloat(proved);
    const probableNum = parseFloat(probable);
    const possibleNum = parseFloat(possible);
    if (isNaN(provedNum) || isNaN(probableNum) || isNaN(possibleNum)) {
      setError('Please enter valid numbers for reserves.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/reserve-estimations/', {
        well_sigle: wellSigle,
        fluid: fluid,
        reservoir: reservoir,
        proved: provedNum,
        probable: probableNum,
        possible: possibleNum,
        estimator: estimator,
        comments: comments,
      }, {
        headers: {
          'X-CSRFToken': getCsrfToken(),
        },
      });
      console.log('Response data:', response.data);
      if (response.status === 201) {
        alert('Reservoir estimate recorded successfully!');
        navigate('/PerimetreList');
      }
    } catch (err) {
      console.error('Error recording estimate:', err.response?.data || err);
      setError(err.response?.data?.detail || err.response?.data?.error || 'Failed to record estimate.');
    }
  };

  if (!isDesUser) {
    return <div>Access denied. Only DES users can manage reservoir estimates.</div>;
  }

  return (
    <div className="reservation-container">
      <h2>Record Reservoir Estimate</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Well Sigle:</label>
          <select
            value={wellSigle}
            onChange={(e) => setWellSigle(e.target.value)}
            required
          >
            <option value="">Select a Well</option>
            {wells.map((w) => (
              <option key={w.sigle} value={w.sigle}>{w.sigle} - {w.name || 'No Name'}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fluid:</label>
          <select
            value={fluid}
            onChange={(e) => setFluid(e.target.value)}
            required
          >
            <option value="">Select Fluid</option>
            <option value="H">Huile</option>
            <option value="G">Gaz</option>
            <option value="C">Condensat</option>
            <option value="GA">Gaz associé</option>
          </select>
        </div>
        <div className="form-group">
          <label>Reservoir:</label>
          <input
            type="text"
            value={reservoir}
            onChange={(e) => setReservoir(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Proved Reserves (P1):</label>
          <input
            type="number"
            value={proved}
            onChange={(e) => setProved(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Probable Reserves (P2):</label>
          <input
            type="number"
            value={probable}
            onChange={(e) => setProbable(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Possible Reserves (P3):</label>
          <input
            type="number"
            value={possible}
            onChange={(e) => setPossible(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Estimator:</label>
          <input
            type="text"
            value={estimator}
            onChange={(e) => setEstimator(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="submit">Submit Estimate</button>
      </form>
    </div>
  );
}

export default PerimeterReservation;