import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Programmes.css';

const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=').map(c => c.trim());
    if (key === name) return value;
  }
  return '';
};

const ProgrammeEtudes = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [etudes, setEtudes] = useState([]);
  const [perimeters, setPerimeters] = useState([]);
  const [selectedPerimeter, setSelectedPerimeter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    prm_name: '',
    start_date: '',
    end_date: '',
    company: '',
    cost: '',
  });

  const filters = [
    { id: 'ASE', label: 'ASE' },
    { id: 'ASO', label: 'ASO' },
    { id: 'ASC', label: 'ASC' },
    { id: 'ASN', label: 'ASN' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const perimetersResponse = await axios.get('/api/concessions/?names_only=true', {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        setPerimeters(perimetersResponse.data);
        setSelectedPerimeter(perimetersResponse.data[perimetersResponse.data.length] || null);

        const response = await axios.get('/api/etudes/', {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        setEtudes(response.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let filteredData = etudes;
  if (activeFilter) {
    filteredData = filteredData.filter((item) =>
      (item.type || item.category || '').toUpperCase() === activeFilter
    );
  }
  if (selectedPerimeter) {
    filteredData = filteredData.filter((item) => {
      const perimeterField = item.prm?.name || item.perimetre || '-';
      return perimeterField === selectedPerimeter;
    });
  }

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name || '',
      prm_name: item.prm?.name || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      company: item.company || '',
      cost: item.cost || '',
    });
    setIsEditModalOpen(true);
  };

  const handleNew = () => {
    setSelectedItem(null);
    setFormData({
      name: '',
      prm_name: '',
      start_date: '',
      end_date: '',
      company: '',
      cost: '',
    });
    setIsNewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsNewModalOpen(false);
    setSelectedItem(null);
    setFormData({
      name: '',
      prm_name: '',
      start_date: '',
      end_date: '',
      company: '',
      cost: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        name: formData.name,
        prm_name: formData.prm_name,
        start_date: formData.start_date,
        end_date: formData.end_date,
        company: formData.company,
        cost: formData.cost,
      };
      if (selectedItem) {
        // Update
        const response = await axios.put(
          `/api/etudes/${selectedItem.name}/`, // Assuming 'name' is the unique identifier
          dataToSend,
          {
            headers: { 'X-CSRFToken': getCsrfToken() },
            withCredentials: true,
          }
        );
        console.log('Update response:', response.data);
        setEtudes(etudes.map((item) => (item.name === selectedItem.name ? response.data : item)));
      } else {
        // Create
        const response = await axios.post('/api/etudes/', dataToSend, {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        console.log('Create response:', response.data);
        setEtudes([...etudes, response.data]);
      }
      handleModalClose();
    } catch (error) {
      setError('Failed to save study. Please try again.');
      console.error('Error saving study:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (name) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete this study? This action cannot be undone.`);
    if (!isConfirmed) {
      console.log(`Deletion of study with name ${name} canceled by user.`);
      alert(`Deletion was canceled.`);
      return;
    }
    try {
      await axios.delete(`/api/etudes/${name}/`, {
        headers: { 'X-CSRFToken': getCsrfToken() },
        withCredentials: true,
      });
      setEtudes(etudes.filter((item) => item.name !== name));
      console.log(`Successfully deleted study with name ${name}`);
    } catch (error) {
      setError('Failed to delete study. Please try again.');
      console.error('Error deleting study:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="programmes-container">
      <div className="programmes-wrapper">
        <div className="action-bar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Rechercher par nom"
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="table-header">
            <div className="table-header-actions">
              <select
                value={selectedPerimeter || ''}
                onChange={(e) => setSelectedPerimeter(e.target.value || null)}
                className="perimeter-select"
              >
                <option value="">Tous les périmètres</option>
                {perimeters.map((perimeter, index) => (
                  <option key={index} value={perimeter}>
                    {perimeter}
                  </option>
                ))}
              </select>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Tous les filtres</option>
                {filters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="action-buttons">
            <button className="filter-buttonn">
              <span className="filter-icon">🖥️</span> Filtrer
            </button>
            <button className="new-buttonn" onClick={handleNew}>Nouveau</button>
          </div>
        </div>

        <h1 className="page-title">Programme Etude G&G</h1>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : !filteredData.length ? (
          <p className="no-data-text">No data available.</p>
        ) : (
          <div className="table-containerr">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Périmètre</th>
                  <th>Date Début</th>
                  <th>Date Fin</th>
                  <th>Company</th>
                  <th>Cost (KDA)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name || '-'}</td>
                    <td>{item.prm?.name || '-'}</td>
                    <td>{item.start_date || '-'}</td>
                    <td>{item.end_date || '-'}</td>
                    <td>{item.company || '-'}</td>
                    <td>{item.cost || '-'}</td>
                    <td>
                      <button
                        className="action-buttonn edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-buttonn delete"
                        onClick={() => handleDelete(item.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {(isEditModalOpen || isNewModalOpen) && (
        <div className="modal-overlay">
          <div className="modal-contentt">
            <div className="modal-header">
              <h2>{selectedItem ? 'Modifier l\'étude' : 'Ajouter une nouvelle étude'}</h2>
              <button onClick={handleModalClose} className="modal-close-button">✕</button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Périmètre</label>
                <select
                  name="prm_name"
                  value={formData.prm_name}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Sélectionner</option>
                  {perimeters.map((perimeter, index) => (
                    <option key={index} value={perimeter}>
                      {perimeter}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date Début</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Date Fin</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Cost (KDA)</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleFormChange}
                />
              </div>
              <button type="submit" className="submit-button">
                {selectedItem ? 'Enregistrer les modifications' : 'Ajouter'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgrammeEtudes;