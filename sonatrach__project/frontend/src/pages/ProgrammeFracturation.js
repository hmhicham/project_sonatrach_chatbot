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

// const ProgrammeFracturation = () => {
//   const [activeFilter, setActiveFilter] = useState('');
//   const [fracturations, setFracturations] = useState([]);
//   const [perimeters, setPerimeters] = useState([]);
//   const [wells, setWells] = useState([]); // Add state for wells
//   const [selectedPerimeter, setSelectedPerimeter] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isNewModalOpen, setIsNewModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     prm: '',
//     well_name: '', // Replace well_name with well (sigle)
//     reservoirs: '',
//     start_date: '',
//     end_date: '',
//     init_rate: '',
//     fin_rate: '',
//     company: '',
//     cost: '',
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
//         // Fetch perimeters
//         const perimetersResponse = await axios.get('/api/concessions/?names_only=true', {
//           headers: { 'X-CSRFToken': getCsrfToken() },
//           withCredentials: true,
//         });
//         setPerimeters(perimetersResponse.data);
//         setSelectedPerimeter(perimetersResponse.data[perimetersResponse.data.length - 1] || null);

//         // Fetch wells
//         const wellsResponse = await axios.get('/api/wells/', {
//           headers: { 'X-CSRFToken': getCsrfToken() },
//           withCredentials: true,
//         });
//         setWells(wellsResponse.data);

//         // Fetch fracturations
//         const response = await axios.get('/api/fracturation/', {
//           headers: { 'X-CSRFToken': getCsrfToken() },
//           withCredentials: true,
//         });
//         console.log('Fracturation data:', response.data);
//         setFracturations(response.data);
//       } catch (err) {
//         setError('Failed to fetch data. Please try again.');
//         console.error('Error fetching data:', err.response ? err.response.data : err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   let filteredData = fracturations;

//   if (searchQuery) {
//     filteredData = filteredData.filter((item) =>
//       (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   if (activeFilter) {
//     filteredData = filteredData.filter((item) =>
//       (item.prm || '').toUpperCase() === activeFilter
//     );
//   }

//   if (selectedPerimeter) {
//     filteredData = filteredData.filter((item) => {
//       const perimeterField = item.prm || '-';
//       return perimeterField === selectedPerimeter;
//     });
//   }

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setFormData({
//       name: item.name || '',
//       prm: item.prm || '',
//       well_name: item.well_name || '', // Use well (sigle)
//       reservoirs: item.reservoirs || '',
//       start_date: item.start_date || '',
//       end_date: item.end_date || '',
//       init_rate: item.init_rate || '',
//       fin_rate: item.fin_rate || '',
//       company: item.company || '',
//       cost: item.cost || '',
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleNew = () => {
//     setSelectedItem(null);
//     setFormData({
//       name: '',
//       prm: '',
//       well_name: '',
//       reservoirs: '',
//       start_date: '',
//       end_date: '',
//       init_rate: '',
//       fin_rate: '',
//       company: '',
//       cost: '',
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
//       well_name: '',
//       reservoirs: '',
//       start_date: '',
//       end_date: '',
//       init_rate: '',
//       fin_rate: '',
//       company: '',
//       cost: '',
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
//     try {
//       const dataToSend = {
//         name: formData.name,
//         prm: formData.prm,
//         well_sigle: formData.well_name, // Send well (sigle)
//         reservoirs: formData.reservoirs,
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         init_rate: formData.init_rate,
//         fin_rate: formData.fin_rate,
//         company: formData.company,
//         cost: formData.cost,
//       };
//       // Validation
//       if (!dataToSend.name.trim()) {
//         setError('Name is required and cannot be empty.');
//         return;
//       }
//       if (!dataToSend.prm) {
//         setError('Périmètre is required.');
//         return;
//       }
//       if (!dataToSend.well_sigle) {
//         setError('Well is required.');
//         return;
//       }
//       if (!dataToSend.company) {
//         setError('Company is required.');
//         return;
//       }
//       if (selectedItem) {
//         const response = await axios.put(
//           `/api/fracturation/${selectedItem.name}/`,
//           dataToSend,
//           {
//             headers: { 'X-CSRFToken': getCsrfToken() },
//             withCredentials: true,
//           }
//         );
//         console.log('Update response:', response.data);
//         setFracturations(fracturations.map((item) => (item.name === selectedItem.name ? response.data : item)));
//       } else {
//         const response = await axios.post('/api/fracturation/', dataToSend, {
//           headers: { 'X-CSRFToken': getCsrfToken() },
//           withCredentials: true,
//         });
//         console.log('Create response:', response.data);
//         setFracturations([...fracturations, response.data]);
//       }
//       handleModalClose();
//     } catch (error) {
//       setError('Failed to save fracturation. Please try again.');
//       console.error('Error saving fracturation:', error.response ? error.response.data : error.message);
//     }
//   };

//   const handleDelete = async (name) => {
//     const isConfirmed = window.confirm(`Are you sure you want to delete this fracturation? This action cannot be undone.`);
//     if (!isConfirmed) {
//       console.log(`Deletion of fracturation with name ${name} canceled by user.`);
//       alert(`Deletion was canceled.`);
//       return;
//     }
//     try {
//       const response = await axios.delete(`/api/fracturation/${name}/`, {
//         headers: { 'X-CSRFToken': getCsrfToken() },
//         withCredentials: true,
//       });
//       if (response.status === 204) {
//         setFracturations(fracturations.filter((item) => item.name !== name));
//         console.log(`Successfully deleted fracturation with name ${name}`);
//       } else {
//         console.warn(`Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       setError('Failed to delete fracturation. Please try again.');
//       console.error('Error deleting fracturation:', error.response ? error.response.data : error.message);
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
//             <button className="new-buttonn" onClick={handleNew}>Nouveau</button>
//           </div>
//         </div>

//         <h1 className="page-title">Programme Fracturation Hydraulique</h1>

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
//                   <th>Name</th>
//                   <th>Périmètre</th>
//                   <th>Well</th>
//                   <th>Reservoirs</th>
//                   <th>Date Début</th>
//                   <th>Date Fin</th>
//                   <th>Initial Rate</th>
//                   <th>Final Rate</th>
//                   <th>Company</th>
//                   <th>Cost (KDA)</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((item) => (
//                   <tr key={item.name}>
//                     <td>{item.name || '-'}</td>
//                     <td>{item.prm || '-'}</td>
//                     <td>{item.well_name || '-'}</td>
//                     <td>{item.reservoirs || '-'}</td>
//                     <td>{item.start_date || '-'}</td>
//                     <td>{item.end_date || '-'}</td>
//                     <td>{item.init_rate || '-'}</td>
//                     <td>{item.fin_rate || '-'}</td>
//                     <td>{item.company || '-'}</td>
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
//               <h2>{selectedItem ? 'Modifier la fracturation' : 'Ajouter une nouvelle fracturation'}</h2>
//               <button onClick={handleModalClose} className="modal-close-button">✕</button>
//             </div>
//             <form onSubmit={handleFormSubmit} className="modal-form">
//               <div className="form-group">
//                 <label>Name</label>
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
//   <label>Well</label>
//   <select
//     name="well_name"
//     value={formData.well_name}
//     onChange={handleFormChange}
//     required
//   >
//     <option value="">Sélectionner un puits</option>
//     {wells.map((well) => (
//       <option key={well.sigle} value={well.sigle}>
//         {well.sigle} - {well.name || 'No name'}
//       </option>
//     ))}
//   </select>
// </div>
//                 {/* <select
//                   name="well_name"
//                   value={formData.well_name}
//                   onChange={handleFormChange}
//                   required
//                 >
//                   <option value="">Sélectionner un puits</option>
//                   {wells.map((well) => (
//                     <option key={well.sigle} value={well.sigle}>
//                       {well.sigle}
//                     </option>
//                   ))}
//                 </select> */}
//               {/* </div> */}
//               <div className="form-group">
//                 <label>Reservoirs</label>
//                 <input
//                   type="text"
//                   name="reservoirs"
//                   value={formData.reservoirs}
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
//                 <label>Initial Rate</label>
//                 <input
//                   type="number"
//                   name="init_rate"
//                   value={formData.init_rate}
//                   onChange={handleFormChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Final Rate</label>
//                 <input
//                   type="number"
//                   name="fin_rate"
//                   value={formData.fin_rate}
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
//                   required
//                 />
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

// export default ProgrammeFracturation;


















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

const ProgrammeFracturation = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [fracturations, setFracturations] = useState([]);
  const [perimeters, setPerimeters] = useState([]);
  const [wells, setWells] = useState([]); // Add state for wells
  const [selectedPerimeter, setSelectedPerimeter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    // prm: '',
    prm_name: '',
    well_name: '', // Replace well_name with well (sigle)
    reservoirs: '',
    start_date: '',
    end_date: '',
    init_rate: '',
    fin_rate: '',
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
        // Fetch perimeters
        const perimetersResponse = await axios.get('/api/concessions/?names_only=true', {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        setPerimeters(perimetersResponse.data);
        setSelectedPerimeter(perimetersResponse.data[perimetersResponse.data.length ] || null);

        // Fetch wells
        const wellsResponse = await axios.get('/api/wells/', {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        setWells(wellsResponse.data);

        // Fetch fracturations
        const response = await axios.get('/api/fracturation/', {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        console.log('Fracturation data:', response.data);
        setFracturations(response.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let filteredData = fracturations;

  if (searchQuery) {
    filteredData = filteredData.filter((item) =>
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
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
      name: item.name || '',
      prm: item.prm || '',
      prm_name: item.prm_name || '',
      well_name: item.well_name || '', // Use well (sigle)
      reservoirs: item.reservoirs || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      init_rate: item.init_rate || '',
      fin_rate: item.fin_rate || '',
      company: item.company || '',
      cost: item.cost || '',
    });
    setIsEditModalOpen(true);
  };

  const handleNew = () => {
    setSelectedItem(null);
    setFormData({
      name: '',
      // prm: '',
      prm_name: '',
      well_name: '',
      reservoirs: '',
      start_date: '',
      end_date: '',
      init_rate: '',
      fin_rate: '',
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
      // prm: '',
      prm_name: '',
      well_name: '',
      reservoirs: '',
      start_date: '',
      end_date: '',
      init_rate: '',
      fin_rate: '',
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
        // prm: formData.prm,
        prm_name: formData.prm_name,
        well_sigle: formData.well_name, // Send well (sigle)
        reservoirs: formData.reservoirs,
        start_date: formData.start_date,
        end_date: formData.end_date,
        init_rate: formData.init_rate,
        fin_rate: formData.fin_rate,
        company: formData.company,
        cost: formData.cost,
      };
      // Validation
      if (!dataToSend.name.trim()) {
        setError('Name is required and cannot be empty.');
        return;
      }
      // if (!dataToSend.prm) {
      //   setError('Périmètre is required.');
      //   return;
      // }
      if (!dataToSend.well_sigle) {
        setError('Well is required.');
        return;
      }
      if (!dataToSend.company) {
        setError('Company is required.');
        return;
      }
      if (selectedItem) {
        const response = await axios.put(
          `/api/fracturation/${selectedItem.name}/`,
          dataToSend,
          {
            headers: { 'X-CSRFToken': getCsrfToken() },
            withCredentials: true,
          }
        );
        console.log('Update response:', response.data);
        setFracturations(fracturations.map((item) => (item.name === selectedItem.name ? response.data : item)));
      } else {
        const response = await axios.post('/api/fracturation/', dataToSend, {
          headers: { 'X-CSRFToken': getCsrfToken() },
          withCredentials: true,
        });
        console.log('Create response:', response.data);
        setFracturations([...fracturations, response.data]);
      }
      handleModalClose();
    } catch (error) {
      setError('Failed to save fracturation. Please try again.');
      console.error('Error saving fracturation:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (name) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete this fracturation? This action cannot be undone.`);
    if (!isConfirmed) {
      console.log(`Deletion of fracturation with name ${name} canceled by user.`);
      alert(`Deletion was canceled.`);
      return;
    }
    try {
      const response = await axios.delete(`/api/fracturation/${name}/`, {
        headers: { 'X-CSRFToken': getCsrfToken() },
        withCredentials: true,
      });
      if (response.status === 204) {
        setFracturations(fracturations.filter((item) => item.name !== name));
        console.log(`Successfully deleted fracturation with name ${name}`);
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      setError('Failed to delete fracturation. Please try again.');
      console.error('Error deleting fracturation:', error.response ? error.response.data : error.message);
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

        <h1 className="page-title">Programme Fracturation Hydraulique</h1>

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
                  <th>Well</th>
                  <th>Reservoirs</th>
                  <th>Date Début</th>
                  <th>Date Fin</th>
                  <th>Initial Rate</th>
                  <th>Final Rate</th>
                  <th>Company</th>
                  <th>Cost (KDA)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name || '-'}</td>
                    <td>{item.prm || '-'}</td>
                    <td>{item.well_name || '-'}</td>
                    <td>{item.reservoirs || '-'}</td>
                    <td>{item.start_date || '-'}</td>
                    <td>{item.end_date || '-'}</td>
                    <td>{item.init_rate || '-'}</td>
                    <td>{item.fin_rate || '-'}</td>
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
              <h2>{selectedItem ? 'Modifier la fracturation' : 'Ajouter une nouvelle fracturation'}</h2>
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
  <label>Well</label>
  <select
    name="well_name"
    value={formData.well_name}
    onChange={handleFormChange}
    required
  >
    <option value="">Sélectionner un puits</option>
    {wells.map((well) => (
      <option key={well.sigle} value={well.sigle}>
        {well.sigle} - {well.name || 'No name'}
      </option>
    ))}
  </select>
</div>
                {/* <select
                  name="well_name"
                  value={formData.well_name}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Sélectionner un puits</option>
                  {wells.map((well) => (
                    <option key={well.sigle} value={well.sigle}>
                      {well.sigle}
                    </option>
                  ))}
                </select> */}
              {/* </div> */}
              <div className="form-group">
                <label>Reservoirs</label>
                <input
                  type="text"
                  name="reservoirs"
                  value={formData.reservoirs}
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
                <label>Initial Rate</label>
                <input
                  type="number"
                  name="init_rate"
                  value={formData.init_rate}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Final Rate</label>
                <input
                  type="number"
                  name="fin_rate"
                  value={formData.fin_rate}
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
                  required
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

export default ProgrammeFracturation;