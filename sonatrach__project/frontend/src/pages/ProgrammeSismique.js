// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Programmes.css';

// const getCsrfToken = () => {
//   const name = 'csrftoken';
//   const cookies = document.cookie.split(';');
//   for (let cookie of cookies) {
//     const [key, value] = cookie.split('=').map(c => c.trim());
//     if (key === name) return value;
//   }
//   return '';
// };

// const ProgrammeSismique = () => {
//   const [activeFilter, setActiveFilter] = useState(''); // ASE, ASO, etc.
//   const [sismiques, setSismiques] = useState([]);
//   const [perimeters, setPerimeters] = useState([]);
//   const [selectedPerimeter, setSelectedPerimeter] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isNewModalOpen, setIsNewModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     prm: '',
//     type: '',
//     start_date: '',
//     end_date: '',
//     company: '',
//     kilometrage: '',
//     cost: '',
//     activity: '',
//   });

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
//           headers: { 'X-CSRFToken': getCsrfToken() },
//           withCredentials: true,
//         });
//         setPerimeters(perimetersResponse.data);
//         setSelectedPerimeter(perimetersResponse.data[perimetersResponse.data.length - 1] || null);

//         const response = await axios.get('/api/sismiques/', {
//           headers: { 'X-CSRFToken': getCsrfToken() },
//           withCredentials: true,
//         });
//         console.log('Fetched sismiques:', response.data);
//         setSismiques(response.data);
//       } catch (err) {
//         setError('Failed to fetch data. Please try again.');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   let filteredData = sismiques;
//   if (activeFilter) {
//     filteredData = filteredData.filter((item) =>
//       (item.type || item.category || '').toUpperCase() === activeFilter
//     );
//   }
//   if (selectedPerimeter) {
//     filteredData = filteredData.filter((item) => {
//       const perimeterField = item.prm || item.prm?.name || item.prm;
//       return perimeterField === selectedPerimeter;
//     });
//   }

//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setFormData({
//       name: item.name || '',
//       prm: item.prm || '',
//       type: item.type || '',
//       start_date: item.start_date || '',
//       end_date: item.end_date || '',
//       company: item.company || '',
//       kilometrage: item.kilometrage || '',
//       cost: item.cost || '',
//       activity: item.activity || '',
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleNew = () => {
//     setSelectedItem(null);
//     setFormData({
//       name: '',
//       prm: '',
//       type: '',
//       start_date: '',
//       end_date: '',
//       company: '',
//       kilometrage: '',
//       cost: '',
//       activity: '',
//     });
//     setIsNewModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsEditModalOpen(false);
//     setIsNewModalOpen(false);
//     setSelectedItem(null);
//     setFormData({
//       name: '',
//       prm: '',
//       type: '',
//       start_date: '',
//       end_date: '',
//       company: '',
//       kilometrage: '',
//       cost: '',
//       activity: '',
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const dataToSend = {
//         name: formData.name,
//         prm: formData.prm,
//         type: formData.type,
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         company: formData.company,
//         kilometrage: formData.kilometrage,
//         activity: formData.activity,
//       };
//       if (selectedItem) {
//         // Edit existing seismic program
//         const response = await axios.put(
//           `/api/sismiques/${selectedItem.name}/`,
//           dataToSend,
//           {
//             headers: { 'X-CSRFToken': getCsrfToken() },
//             withCredentials: true,
//           }
//         );
//         console.log('Update response:', response.data);
//         setSismiques(sismiques.map((item) => (item.name === selectedItem.name ? response.data : item)));
//       } else {
//         // Create new seismic program
//         const response = await axios.post('/api/sismiques/', dataToSend, {
//           headers: { 'X-CSRFToken': getCsrfToken() },
//           withCredentials: true,
//         });
//         console.log('Create response:', response.data);
//         setSismiques([...sismiques, response.data]);
//       }
//       handleModalClose();
//     } catch (error) {
//       setError('Failed to save seismic program. Please try again.');
//       console.error('Error saving seismic program:', {
//         message: error.message,
//         response: error.response ? error.response.data : 'No response data',
//         status: error.response ? error.response.status : 'No status',
//       });
//     }
//   };

//   const handleDelete = async (itemName) => {
//     const isConfirmed = window.confirm(`Are you sure you want to delete this seismic program? This action cannot be undone.`);
//     if (!isConfirmed) {
//       console.log(`Deletion of seismic program with name ${itemName} canceled by user.`);
//       alert(`Deletion was canceled.`);
//       return;
//     }
//     try {
//       const response = await axios.delete(`/api/sismiques/${itemName}/`, {
//         headers: { 'X-CSRFToken': getCsrfToken() },
//         withCredentials: true,
//       });
//       if (response.status === 204) {
//         setSismiques(sismiques.filter((item) => item.name !== itemName));
//         console.log(`Successfully deleted seismic program with name ${itemName}`);
//       } else {
//         console.warn(`Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       setError('Failed to delete seismic program. Please try again.');
//       console.error('Error deleting seismic program:', {
//         message: error.message,
//         response: error.response ? error.response.data : 'No response data',
//         status: error.response ? error.response.status : 'No status',
//       });
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
//             <button className="new-buttonn" onClick={handleNew}>Nouveau</button>
//           </div>
//         </div>

//         <h1 className="page-title">Programme Sismique</h1>

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
//                   <th>Designations</th>
//                   <th>Périmètre</th>
//                   <th>Nom de l’étude</th>
//                   <th>Date Début</th>
//                   <th>Date Fin</th>
//                   <th>Compagnie de service</th>
//                   <th>Kilométrage</th>
//                   <th>Coûts</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item) => (
//                   <tr key={item.name}>
//                     <td>{item.activity || '-'}</td>
//                     <td>{item.prm || '-'}</td>
//                     <td>{item.name || '-'}</td>
//                     <td>{item.start_date || '-'}</td>
//                     <td>{item.end_date || '-'}</td>
//                     <td>{item.company || '-'}</td>
//                     <td>{item.kilometrage || '-'}</td>
//                     <td>{item.cost || '-'}</td>
//                     <td>
//                       <button
//                         className="action-buttonn edit"
//                         onClick={() => handleEdit(item)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="action-buttonn delete"
//                         onClick={() => handleDelete(item.name)}
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

//       {(isEditModalOpen || isNewModalOpen) && (
//         <div className="modal-overlay">
//           <div className="modal-contentt">
//             <div className="modal-header">
//               <h2>{selectedItem ? 'Modifier le programme sismique' : 'Ajouter un nouveau programme sismique'}</h2>
//               <button onClick={handleModalClose} className="modal-close-button">✕</button>
//             </div>
//             <form onSubmit={handleFormSubmit} className="modal-form">
//               <div className="form-group">
//                 <label>Nom de l’étude</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
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
//                   required
//                 >
//                   <option value="">Sélectionner</option>
//                   <option value="2D">2D</option>
//                   <option value="3D">3D</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Activité</label>
//                 <select name="activity" value={formData.activity} onChange={handleFormChange}>
//                   <option value="">Sélectionner</option>
//                   <option value="Acq">Acquisition</option>
//                   <option value="Tr">Traitement</option>
//                   <option value="Retr">Retraitement</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Date de début</label>
//                 <input
//                   type="date"
//                   name="start_date"
//                   value={formData.start_date}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Date de fin</label>
//                 <input
//                   type="date"
//                   name="end_date"
//                   value={formData.end_date}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Compagnie de service</label>
//                 <input
//                   type="text"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Kilométrage</label>
//                 <input
//                   type="number"
//                   name="kilometrage"
//                   value={formData.kilometrage}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </div>
              
//               <button type="submit" className="submit-button">
//                 {selectedItem ? 'Enregistrer les modifications' : 'Ajouter'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProgrammeSismique;




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

const ProgrammeSismique = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [sismiques, setSismiques] = useState([]);
  const [perimeters, setPerimeters] = useState([]);
  const [selectedPerimeter, setSelectedPerimeter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    nomEtude: '',
    prm: '',
    type: '',
    start_date: '',
    end_date: '',
    company: '',
    kilometrage: '',
    activity: '',
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
        setSelectedPerimeter(perimetersResponse.data[perimetersResponse.data.length ] || null);

        const response = await axios.get('/api/sismiques/', {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        console.log('Fetched sismiques:', response.data);
        setSismiques(response.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let filteredData = sismiques;

  if (searchQuery) {
    filteredData = filteredData.filter((item) =>
      (item.nomEtude || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (activeFilter) {
    filteredData = filteredData.filter((item) =>
      (item.prm || '').toUpperCase() === activeFilter
    );
  }

  if (selectedPerimeter) {
    filteredData = filteredData.filter((item) => {
      const perimeterField = item.prm || '-';
      return perimeterField === selectedPerimeter;
    });
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      nomEtude: item.nomEtude || '',
      prm: item.prm || '',
      type: item.type || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      company: item.company || '',
      kilometrage: item.kilometrage || '',
      activity: item.activity || '',
    });
    setIsEditModalOpen(true);
  };

  const handleNew = () => {
    setSelectedItem(null);
    setFormData({
      nomEtude: '',
      prm: '',
      type: '',
      start_date: '',
      end_date: '',
      company: '',
      kilometrage: '',
      activity: '',
    });
    setIsNewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsNewModalOpen(false);
    setSelectedItem(null);
    setFormData({
      nomEtude: '',
      prm: '',
      type: '',
      start_date: '',
      end_date: '',
      company: '',
      kilometrage: '',
      activity: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nomEtude: formData.nomEtude, // Matches serializer field
        prm: formData.prm,
        type: formData.type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        company: formData.company,
        kilometrage: formData.kilometrage,
        activity: formData.activity,
      };
      // Strict validation for required fields
      if (!dataToSend.nomEtude.trim()) {
        setError('Nom de l’étude is required and cannot be empty.');
        return;
      }
      if (!dataToSend.prm) {
        setError('Périmètre is required.');
        return;
      }
      if (!dataToSend.type) {
        setError('Type is required.');
        return;
      }
      if (!dataToSend.start_date) {
        setError('Date de début is required.');
        return;
      }
      if (!dataToSend.end_date) {
        setError('Date de fin is required.');
        return;
      }
      if (!dataToSend.company) {
        setError('Compagnie de service is required.');
        return;
      }
      if (!dataToSend.kilometrage) {
        setError('Kilométrage is required.');
        return;
      }

      if (selectedItem) {
        if (!selectedItem.nomEtude) {
          setError('No name found for the selected item. Cannot update.');
          return;
        }
        const response = await axios.put(
          `/api/sismiques/${selectedItem.nomEtude}/`,
          dataToSend,
          {
            headers: { 'X-CSRFToken': getCsrfToken() },
            withCredentials: true,
          }
        );
        console.log('Update response:', response.data);
        setSismiques(sismiques.map((item) => (item.nomEtude === selectedItem.nomEtude ? response.data : item)));
      } else {
        const response = await axios.post('/api/sismiques/', dataToSend, {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        console.log('Create response:', response.data);
        setSismiques([...sismiques, response.data]);
      }
      handleModalClose();
    } catch (error) {
      const errorMessage = `Failed to save seismic program: ${error.response?.data?.detail || error.response?.data || error.message}`;
      setError(errorMessage);
      console.error('Error saving seismic program:', {
        message: error.message,
        response: error.response ? error.response.data : 'No response data',
        status: error.response ? error.response.status : 'No status',
      });
    }
  };

  const handleDelete = async (itemName) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete this seismic program? This action cannot be undone.`);
    if (!isConfirmed) {
      console.log(`Deletion of seismic program with name ${itemName} canceled by user.`);
      alert(`Deletion was canceled.`);
      return;
    }
    try {
      const response = await axios.delete(`/api/sismiques/${itemName}/`, {
        headers: { 'X-CSRFToken': getCsrfToken() },
        withCredentials: true,
      });
      if (response.status === 204) {
        setSismiques(sismiques.filter((item) => item.nomEtude !== itemName));
        console.log(`Successfully deleted seismic program with name ${itemName}`);
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      setError('Failed to delete seismic program. Please try again.');
      console.error('Error deleting seismic program:', {
        message: error.message,
        response: error.response ? error.response.data : 'No response data',
        status: error.response ? error.response.status : 'No status',
      });
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

        <h1 className="page-title">Programme Sismique</h1>

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
                  <th>Designations</th>
                  <th>Périmètre</th>
                  <th>Nom de l’étude</th>
                  <th>Type</th>
                  <th>Date Début</th>
                  <th>Date Fin</th>
                  <th>Compagnie de service</th>
                  <th>Kilométrage</th>
                  <th>Coûts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.nomEtude}>
                    <td>{item.activity || '-'}</td>
                    <td>{item.prm || '-'}</td>
                    <td>{item.nomEtude || '-'}</td>
                    <td>{item.type || '-'}</td>
                    <td>{item.start_date || '-'}</td>
                    <td>{item.end_date || '-'}</td>
                    <td>{item.company || '-'}</td>
                    <td>{item.kilometrage || '-'}</td>
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
                        onClick={() => handleDelete(item.nomEtude)}
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
              <h2>{selectedItem ? 'Modifier le programme sismique' : 'Ajouter un nouveau programme sismique'}</h2>
              <button onClick={handleModalClose} className="modal-close-button">✕</button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Nom de l’étude</label>
                <input
                  type="text"
                  name="nomEtude"
                  value={formData.nomEtude}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Périmètre</label>
                <select
                  name="prm"
                  value={formData.prm}
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
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                </select>
              </div>
              <div className="form-group">
                <label>Activité</label>
                <select name="activity" value={formData.activity} onChange={handleFormChange}>
                  <option value="">Sélectionner</option>
                  <option value="Acq">Acquisition</option>
                  <option value="Tr">Traitement</option>
                  <option value="Retr">Retraitement</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date de début</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date de fin</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Compagnie de service</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Kilométrage</label>
                <input
                  type="number"
                  name="kilometrage"
                  value={formData.kilometrage}
                  onChange={handleFormChange}
                  required
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

export default ProgrammeSismique;