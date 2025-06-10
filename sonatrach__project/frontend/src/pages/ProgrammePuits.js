// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Programmes.css';

// const ProgrammePuits = () => {
//   const [activeFilter, setActiveFilter] = useState('');
//   const [puits, setPuits] = useState([]);
//   const [perimeters, setPerimeters] = useState([]);
//   const [selectedPerimeter, setSelectedPerimeter] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [formData, setFormData] = useState({
//     sigle: '',
//     prm: '',
//     type: '',
//     objective: '',
//     start_date: '',
//     end_date: '',
//     result: '',
//     cost: '',
//     company: '',
//   });

//   const typeLabels = {
//     W: "Puits d'exploration",
//     D: 'Puits de délinéation',
//     Dev: 'Puits de développement',
//     S: 'Statigraphique',
//   };

//   const resultLabels = {
//     '+': 'Positif',
//     '-': 'Négatif',
//     Dec: 'Découverte',
//   };

//   const filters = [
//     { id: 'ASE', label: 'ASE' },
//     { id: 'ASO', label: 'ASO' },
//     { id: 'ASC', label: 'ASC' },
//     { id: 'ASN', label: 'ASN' },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const perimetersResponse = await axios.get('/api/concessions/?names_only=true', {
//           headers: { 'Authorization': `Bearer your-valid-token-here` },
//         });
//         console.log('Perimeters:', perimetersResponse.data);
//         setPerimeters(perimetersResponse.data);
//         setSelectedPerimeter(perimetersResponse.data[perimetersResponse.data.length - 1] || null);

//         const response = await axios.get('/api/puits/', {
//           headers: { 'Authorization': `Bearer your-valid-token-here` },
//         });
//         console.log('Puits data:', response.data);
//         setPuits(response.data);
//       } catch (err) {
//         setError('Failed to fetch data. Please try again.');
//         console.error('Error fetching data:', err.response ? err.response.data : err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   let filteredData = puits;

//   if (searchQuery) {
//     filteredData = filteredData.filter((item) =>
//       (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   if (activeFilter) {
//     filteredData = filteredData.filter((item) =>
//       (item.prm?.dept?.asset || '').toUpperCase() === activeFilter
//     );
//   }

//   if (selectedPerimeter) {
//     filteredData = filteredData.filter((item) => {
//       const perimeterField = item.prm?.name || item.perimetre || '-';
//       return perimeterField === selectedPerimeter;
//     });
//   }

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setFormData({
//       sigle: item.sigle || '',
//       prm: item.prm?.name || '',
//       type: item.type || '',
//       objective: item.objective || '',
//       start_date: item.start_date || '',
//       end_date: item.end_date || '',
//       result: item.result || '',
//       cost: item.cost || '',
//       company: item.company || '',
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsEditModalOpen(false);
//     setSelectedItem(null);
//     setFormData({
//       sigle: '',
//       prm: '',
//       type: '',
//       objective: '',
//       start_date: '',
//       end_date: '',
//       result: '',
//       cost: '',
//       company: '',
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedItem?.sigle) {
//       setError('No sigle found for the selected item. Cannot update.');
//       return;
//     }
//     try {
//       const updatedData = {
//         sigle: formData.sigle,
//         prm: formData.prm,
//         type: formData.type,
//         objective: formData.objective,
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         result: formData.result,
//         cost: formData.cost,
//         company: formData.company,
//       };
//       const response = await axios.put(
//         `/api/puits/${selectedItem.sigle}/`,
//         updatedData,
//         {
//           headers: { 'Authorization': `Bearer your-valid-token-here` },
//         }
//       );
//       console.log('Update response:', response.data);
//       setPuits(puits.map((item) => (item.sigle === selectedItem.sigle ? response.data : item)));
//       handleModalClose();
//     } catch (error) {
//       setError('Failed to update well. Please try again.');
//       console.error('Error updating well:', error.response ? error.response.data : error.message);
//     }
//   };

//   const handleDelete = async (sigle) => {
//     const isConfirmed = window.confirm(`Are you sure you want to delete this well? This action cannot be undone.`);
//     if (!isConfirmed) {
//       console.log(`Deletion of well with sigle ${sigle} canceled by user.`);
//       alert(`Deletion was canceled.`);
//       return;
//     }
//     try {
//       const response = await axios.delete(`/api/puits/${sigle}/`, {
//         headers: { 'Authorization': `Bearer your-valid-token-here` },
//       });
//       if (response.status === 204) {
//         setPuits(puits.filter((item) => item.sigle !== sigle));
//         console.log(`Successfully deleted well with sigle ${sigle}`);
//       } else {
//         console.warn(`Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       setError('Failed to delete well. Please try again.');
//       console.error('Error deleting well:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="programmes-container">
//       <div className="programmes-wrapper">
//         <div className="action-bar">
//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="Rechercher par nom"
//               className="search-input"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <span className="search-icon">🔍</span>
//           </div>
//           <div className="table-header">
//             <div className="table-header-actions">
//               <select
//                 value={selectedPerimeter || ''}
//                 onChange={(e) => setSelectedPerimeter(e.target.value || null)}
//                 className="perimeter-select"
//               >
//                 <option value="">Tous les périmètres</option>
//                 {perimeters.map((perimeter, index) => (
//                   <option key={index} value={perimeter}>
//                     {perimeter}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={activeFilter}
//                 onChange={(e) => setActiveFilter(e.target.value)}
//                 className="filter-select"
//               >
//                 <option value="">Tous les filtres</option>
//                 {filters.map((filter) => (
//                   <option key={filter.id} value={filter.id}>
//                     {filter.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="action-buttons">
//             <button className="filter-buttonn">
//               <span className="filter-icon">🖥️</span> Filtrer
//             </button>
//             <button className="new-buttonn">Nouveau</button>
//           </div>
//         </div>

//         <h1 className="page-title">Programme Puits</h1>

//         {loading ? (
//           <p className="loading-text">Loading...</p>
//         ) : error ? (
//           <p className="error-text">{error}</p>
//         ) : !filteredData.length ? (
//           <p className="no-data-text">No data available.</p>
//         ) : (
//           <div className="table-containerr">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Sigle</th>
//                   <th>Périmètre</th>
//                   <th>Type</th>
//                   <th>Objective</th>
//                   <th>Date Début</th>
//                   <th>Date Fin</th>
//                   <th>Result</th>
//                   <th>Cost (KDA)</th>
//                   <th>Company</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item) => (
//                   <tr key={item.sigle}>
//                     <td>{item.sigle || '-'}</td>
//                     <td>{item.prm?.name || '-'}</td>
//                     <td>{typeLabels[item.type] || item.type || '-'}</td>
//                     <td>{item.objective || '-'}</td>
//                     <td>{item.start_date || '-'}</td>
//                     <td>{item.end_date || '-'}</td>
//                     <td>{resultLabels[item.result] || item.result || '-'}</td>
//                     <td>{item.cost || '-'}</td>
//                     <td>{item.company || '-'}</td>
//                     <td>
//                       <button
//                         className="action-buttonn edit"
//                         onClick={() => handleEdit(item)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="action-buttonn delete"
//                         onClick={() => handleDelete(item.sigle)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {isEditModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-contentt">
//             <div className="modal-header">
//               <h2>Modifier le programme puits</h2>
//               <button onClick={handleModalClose} className="modal-close-button">✕</button>
//             </div>
//             <form onSubmit={handleFormSubmit} className="modal-form">
//               <div className="form-group">
//                 <label>Sigle</label>
//                 <input
//                   type="text"
//                   name="sigle"
//                   value={formData.sigle}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Périmètre</label>
//                 <select
//                   name="prm"
//                   value={formData.prm}
//                   onChange={handleFormChange}
//                   required
//                 >
//                   <option value="">Sélectionner</option>
//                   {perimeters.map((perimeter, index) => (
//                     <option key={index} value={perimeter}>
//                       {perimeter}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Type</label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleFormChange}
//                 >
//                   <option value="">Sélectionner</option>
//                   <option value="W">Puits d'exploration</option>
//                   <option value="D">Puits de délinéation</option>
//                   <option value="Dev">Puits de développement</option>
//                   <option value="S">Statigraphique</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Objective</label>
//                 <input
//                   type="text"
//                   name="objective"
//                   value={formData.objective}
//                   onChange={handleFormChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Date Début</label>
//                 <input
//                   type="date"
//                   name="start_date"
//                   value={formData.start_date}
//                   onChange={handleFormChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Date Fin</label>
//                 <input
//                   type="date"
//                   name="end_date"
//                   value={formData.end_date}
//                   onChange={handleFormChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Result</label>
//                 <select
//                   name="result"
//                   value={formData.result}
//                   onChange={handleFormChange}
//                 >
//                   <option value="">Sélectionner</option>
//                   <option value="+">Positif</option>
//                   <option value="-">Négatif</option>
//                   <option value="Dec">Découverte</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Cost (KDA)</label>
//                 <input
//                   type="number"
//                   name="cost"
//                   value={formData.cost}
//                   onChange={handleFormChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Company</label>
//                 <input
//                   type="text"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleFormChange}
//                 />
//               </div>
//               <button type="submit" className="submit-button">
//                 Enregistrer les modifications
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProgrammePuits;



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

const ProgrammePuits = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [puits, setPuits] = useState([]);
  const [perimeters, setPerimeters] = useState([]);
  const [selectedPerimeter, setSelectedPerimeter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    sigle: '',
    prm_name: '', // Use prm_name instead of prm
    type: '',
    objective: '',
    start_date: '',
    end_date: '',
    result: '',
    cost: '',
    company: '',
  });

  const typeLabels = {
    W: "Puits d'exploration",
    D: 'Puits de délinéation',
    Dev: 'Puits de développement',
    S: 'Stratigraphique',
  };

  const resultLabels = {
    '+': 'Positif',
    '-': 'Négatif',
    Dec: 'Découverte',
  };

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
        console.log('Perimeters:', perimetersResponse.data);
        setPerimeters(perimetersResponse.data);
        setSelectedPerimeter(perimetersResponse.data[perimetersResponse.data.length] || null);

        const response = await axios.get('/api/puits/', {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        console.log('Puits data:', response.data);
        setPuits(response.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let filteredData = puits;

  if (searchQuery) {
    filteredData = filteredData.filter((item) =>
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (activeFilter) {
    filteredData = filteredData.filter((item) =>
      (item.prm?.dept?.asset || '').toUpperCase() === activeFilter
    );
  }

  if (selectedPerimeter) {
    filteredData = filteredData.filter((item) => {
      const perimeterField = item.prm?.name || item.perimetre || '-';
      return perimeterField === selectedPerimeter;
    });
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      sigle: item.sigle || '',
      prm_name: item.prm?.name || '',
      type: item.type || '',
      objective: item.objective || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      result: item.result || '',
      cost: item.cost || '',
      company: item.company || '',
    });
    setIsEditModalOpen(true);
  };

  const handleNew = () => {
    setSelectedItem(null);
    setFormData({
      sigle: '',
      prm_name: '',
      type: '',
      objective: '',
      start_date: '',
      end_date: '',
      result: '',
      cost: '',
      company: '',
    });
    setIsNewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsNewModalOpen(false);
    setSelectedItem(null);
    setFormData({
      sigle: '',
      prm_name: '',
      type: '',
      objective: '',
      start_date: '',
      end_date: '',
      result: '',
      cost: '',
      company: '',
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
        sigle: formData.sigle,
        prm_name: formData.prm_name,
        type: formData.type,
        objective: formData.objective,
        start_date: formData.start_date,
        end_date: formData.end_date,
        result: formData.result,
        cost: formData.cost,
        company: formData.company,
      };
      // Validation
      if (!dataToSend.sigle.trim()) {
        setError('Sigle is required and cannot be empty.');
        return;
      }
      if (!dataToSend.prm_name) {
        setError('Périmètre is required.');
        return;
      }
      if (selectedItem) {
        // Update
        const response = await axios.put(
          `/api/puits/${selectedItem.sigle}/`,
          dataToSend,
          {
            headers: { 'X-CSRFToken': getCsrfToken() },
            withCredentials: true,
          }
        );
        console.log('Update response:', response.data);
        setPuits(puits.map((item) => (item.sigle === selectedItem.sigle ? response.data : item)));
      } else {
        // Create
        const response = await axios.post('/api/puits/', dataToSend, {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        console.log('Create response:', response.data);
        setPuits([...puits, response.data]);
      }
      handleModalClose();
    } catch (error) {
      setError('Failed to save well. Please try again.');
      console.error('Error saving well:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (sigle) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete this well? This action cannot be undone.`);
    if (!isConfirmed) {
      console.log(`Deletion of well with sigle ${sigle} canceled by user.`);
      alert(`Deletion was canceled.`);
      return;
    }
    try {
      const response = await axios.delete(`/api/puits/${sigle}/`, {
        headers: { 'X-CSRFToken': getCsrfToken() },
        withCredentials: true,
      });
      if (response.status === 204) {
        setPuits(puits.filter((item) => item.sigle !== sigle));
        console.log(`Successfully deleted well with sigle ${sigle}`);
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      setError('Failed to delete well. Please try again.');
      console.error('Error deleting well:', error.response ? error.response.data : error.message);
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
              value={searchQuery}
              onChange={handleSearchChange}
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

        <h1 className="page-title">Programme Puits</h1>

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
                  <th>Sigle</th>
                  <th>Périmètre</th>
                  <th>Type</th>
                  <th>Objective</th>
                  <th>Date Début</th>
                  <th>Date Fin</th>
                  <th>Result</th>
                  <th>Cost (KDA)</th>
                  <th>Company</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.sigle}>
                    <td>{item.sigle || '-'}</td>
                    <td>{item.prm?.name || '-'}</td>
                    <td>{typeLabels[item.type] || item.type || '-'}</td>
                    <td>{item.objective || '-'}</td>
                    <td>{item.start_date || '-'}</td>
                    <td>{item.end_date || '-'}</td>
                    <td>{resultLabels[item.result] || item.result || '-'}</td>
                    <td>{item.cost || '-'}</td>
                    <td>{item.company || '-'}</td>
                    <td>
                      <button
                        className="action-buttonn edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-buttonn delete"
                        onClick={() => handleDelete(item.sigle)}
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
              <h2>{selectedItem ? 'Modifier le programme puits' : 'Ajouter un nouveau puits'}</h2>
              <button onClick={handleModalClose} className="modal-close-button">✕</button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Sigle</label>
                <input
                  type="text"
                  name="sigle"
                  value={formData.sigle}
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
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                >
                  <option value="">Sélectionner</option>
                  <option value="W">Puits d'exploration</option>
                  <option value="D">Puits de délinéation</option>
                  <option value="Dev">Puits de développement</option>
                  <option value="S">Stratigraphique</option>
                </select>
              </div>
              <div className="form-group">
                <label>Objective</label>
                <input
                  type="text"
                  name="objective"
                  value={formData.objective}
                  onChange={handleFormChange}
                />
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
                <label>Result</label>
                <select
                  name="result"
                  value={formData.result}
                  onChange={handleFormChange}
                >
                  <option value="">Sélectionner</option>
                  <option value="+">Positif</option>
                  <option value="-">Négatif</option>
                  <option value="Dec">Découverte</option>
                </select>
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
              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
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

export default ProgrammePuits;