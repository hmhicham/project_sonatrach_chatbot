// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './PerimeterList.css';

// // function PerimeterList() {
// //   const navigate = useNavigate();
// //   const [perimeters, setPerimeters] = useState([
// //     {
// //       name: 'LOT DU 10/12/2019',
// //       validity: 'Du 10/12/2019 au 10/12/2026',
// //       blocs: '337, 330, 328, 333, 362, 335, 336, 334, 332, 330, 351, 352, 353, 341',
// //       department: 'Tind Reggane Sbaa',
// //       status: 'Contrat de recherche',
// //       linkedPerimeters: '',
// //       observation: '',
// //     },
// //     {
// //       name: 'REGGANE II',
// //       validity: 'Du 10/12/2019 au 10/12/2026',
// //       blocs: '337, 330, 328, 333, 362, 335, 336, 334, 332, 330, 351, 352, 353, 341',
// //       department: 'Tind Reggane Sbaa',
// //       status: 'Contrat de recherche',
// //       linkedPerimeters: '',
// //       observation: '',
// //     },
// //     {
// //       name: 'GARET EL BOUIB III',
// //       validity: 'Du 10/12/2019 au 10/12/2026',
// //       blocs: '425, 428, 430, 429, 438, 426, 431',
// //       department: 'Tind Reggane Sbaa',
// //       status: 'Contrat de recherche',
// //       linkedPerimeters: '',
// //       observation: '',
// //     },
// //     {
// //       name: 'LOT DU 02/05/2024',
// //       validity: 'Du 02/05/2024 au 02/05/2027',
// //       blocs: '413, 412, 416, 433, 415, 414, 128',
// //       department: 'Tind Reggane Sbaa',
// //       status: 'Contrat de recherche',
// //       linkedPerimeters: '',
// //       observation: '',
// //     },
// //     {
// //       name: 'MELRHIR',
// //       validity: 'Du 02/05/2024 au 02/05/2027',
// //       blocs: '413, 412, 416, 433, 415, 414, 128',
// //       department: 'Tind Reggane Sbaa',
// //       status: 'Contrat de recherche',
// //       linkedPerimeters: '',
// //       observation: '',
// //     },
// //     {
// //       name: 'ILLIZI CENTRE',
// //       validity: 'Du 02/05/2024 au 02/05/2031',
// //       blocs: '222, 229, 223, 245, 239, 294, 221, 238',
// //       department: 'Tind Reggane Sbaa',
// //       status: 'Contrat de recherche',
// //       linkedPerimeters: '',
// //       observation: '',
// //     },
// //     {
// //       name: 'EL BENNOUD',
// //       validity: 'Du 02/05/2024 au 02/05/2031',
// //       blocs: '120, 350, 408, 421, 312, 316, 116, 313, 315, 103, 314, 115',
// //       department: 'Tind Reggane Sbaa',
// //       status: 'Contrat de recherche',
// //       linkedPerimeters: '',
// //       observation: '',
// //     },
// //   ]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedPerimeter, setSelectedPerimeter] = useState(null);
// //   const [formData, setFormData] = useState({
// //     department: '',
// //     status: '',
// //     name: '',
// //     linkedPerimeters: '',
// //     observation: '',
// //   });

// //   const handleInitialize = (perimeterName) => {
// //   //   navigate(`/Perimetres/${encodeURIComponent(perimeterName)}`);
// //   // };
// //     // Normalize and encode the name properly
// //     const normalizedPerimeterName = perimeterName.normalize('NFC');
// //     navigate(`/Perimetres/${encodeURIComponent(normalizedPerimeterName)}`);
// //   };

// //   const handleUpdate = (perimeter) => {
// //     setSelectedPerimeter(perimeter);
// //     setFormData({
// //       department: perimeter.department,
// //       status: perimeter.status,
// //       name: perimeter.name,
// //       linkedPerimeters: perimeter.linkedPerimeters,
// //       observation: perimeter.observation,
// //     });
// //     setIsModalOpen(true);
// //   };

// //   const handleDelete = (perimeterName) => {
// //     setPerimeters(perimeters.filter((p) => p.name !== perimeterName));
// //   };
// //   const handleModalClose = () => {
// //     setIsModalOpen(false);
// //     setSelectedPerimeter(null);
// //     setFormData({
// //       department: '',
// //       status: '',
// //       name: '',
// //       linkedPerimeters: '',
// //       observation: '',
// //     });
// //   };

// //   const handleFormChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleFormSubmit = (e) => {
// //     e.preventDefault();
// //     const updatedPerimeters = perimeters.map((p) =>
// //       p.name === selectedPerimeter.name
// //         ? { ...p, ...formData }
// //         : p
// //     );
// //     setPerimeters(updatedPerimeters);
// //     handleModalClose();
// //   };

// //   return (
// //     <div className="perimeter-list-container">
// //       {/* Header */}
// //       <div className="headerr">
// //         <h1>Portefeuille concessions</h1>
// //         <div className="header-actions">
// //           <button className="filter-buttonn">Filtrer</button>
// //           <button className="new-button">Nouveau</button>
// //         </div>
// //       </div>

// //       {/* Sidebar Navigation */}
// //       <div className="main-content">
// //         {/* <div className="sidebar">
// //           <div className="sidebar-header">
// //             <div className="logo-placeholder"></div>
// //             <span>SONATRACH</span>
// //           </div>
// //           <nav className="sidebar-nav">
// //             <a href="#" className="active">Périmètres</a>
// //             <a href="#">Planning</a>
// //             <a href="#">Programmes</a>
// //             <a href="#">Surfaces</a>
// //             <a href="#">Avenant & demandes</a>
// //           </nav>
// //         </div> */}

// //         {/* Table */}
// //         <div className="table-container">
// //           <div className="table-header">
// //             <div className="table-header-actions">
// //               <input type="text" placeholder="Rechercher par nom" />
// //               <select>
// //                 <option>ASO</option>
// //                 <option>ASE</option>
// //                 <option>ASC</option>
// //                 <option>ASN</option>
// //               </select>
// //             </div>
// //           </div>

// //           <table className="perimeter-table">
// //             <thead>
// //               <tr>
// //                 <th>Nom du périmètre</th>
// //                 <th>Validité</th>
// //                 <th>Blocs</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {perimeters.map((perimeter, index) => (
// //                 <tr key={index}>
// //                   <td>
// //                     {perimeter.name === 'REGGANE II' ? (
// //                       <>
// //                         <a href="#" onClick={() => handleInitialize(perimeter.name)} className="link">
// //                           {perimeter.name}
// //                         </a>
// //                         <span className="fiche-link">Lien vers la fiche de synthèse</span>
// //                       </>
// //                     ) : (
// //                       perimeter.name
// //                     )}
// //                   </td>
// //                   <td>{perimeter.validity}</td>
// //                   <td>{perimeter.blocs}</td>
// //                   <td className="flex space-x-2">
// //                     <button
// //                       onClick={() => handleInitialize(perimeter.name)}
// //                       className="action-button initialize"
// //                       title="Initialiser le cadre contractuel"
// //                     >
// //                       📄
// //                     </button>
// //                     <button
// //                       onClick={() => handleUpdate(perimeter.name)}
// //                       className="action-button edit"
// //                       title="Mise à jour d’un périmètre"
// //                     >
// //                       ✏️
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(perimeter.name)}
// //                       className="action-button delete"
// //                       title="Supprimer"
// //                     >
// //                       🗑️
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //       {/* Modal for Updating Perimeter */}
// //       {isModalOpen && (
// //         <div className="modal-overlay">
// //           <div className="modal-content">
// //             <div className="modal-header">
// //               <h2>Mise à jour d’un périmètre</h2>
// //               <button onClick={handleModalClose} className="modal-close-button">✕</button>
// //             </div>
// //             <form onSubmit={handleFormSubmit} className="modal-form">
// //               <div className="form-group">
// //                 <label>Département</label>
// //                 <select
// //                   name="department"
// //                   value={formData.department}
// //                   onChange={handleFormChange}
// //                 >
// //                   <option value="Tind Reggane Sbaa">Tind Reggane Sbaa</option>
// //                   {/* Add more options as needed */}
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Statut</label>
// //                 <select
// //                   name="status"
// //                   value={formData.status}
// //                   onChange={handleFormChange}
// //                 >
// //                   <option value="Contrat de recherche">Contrat de recherche</option>
// //                   {/* Add more options as needed */}
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Nom du périmètre</label>
// //                 <input
// //                   type="text"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleFormChange}
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Périmètres liés</label>
// //                 <select
// //                   name="linkedPerimeters"
// //                   value={formData.linkedPerimeters}
// //                   onChange={handleFormChange}
// //                 >
// //                   <option value="">Aucun</option>
// //                   {perimeters
// //                     .filter((p) => p.name !== formData.name)
// //                     .map((p) => (
// //                       <option key={p.name} value={p.name}>
// //                         {p.name}
// //                       </option>
// //                     ))}
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Observation</label>
// //                 <textarea
// //                   name="observation"
// //                   value={formData.observation}
// //                   onChange={handleFormChange}
// //                   rows="3"
// //                 />
// //               </div>
// //               <button type="submit" className="submit-button">
// //                 Mettre à jour le périmètre
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default PerimeterList;


// // ------------------------------------------------

// // axios.defaults.xsrfCookieName = 'csrftoken';
// // axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// // axios.defaults.withCredentials = true;
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './PerimeterList.css';
// // import axios from 'axios';

// // function PerimeterList() {
// //   const navigate = useNavigate();
// //   const [departments, setDepartments] = useState([]);
// //   const [perimeters, setPerimeters] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedPerimeter, setSelectedPerimeter] = useState(null);
// //   const [formData, setFormData] = useState({
// //     department: '',
// //     status: '',
// //     name: '',
// //     linkedPerimeters: '',
// //     observation: '',
// //   });
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterAsset, setFilterAsset] = useState('');
// //   const [filterStatus, setFilterStatus] = useState('');

// //   const getCookie = (name) => {
// //     const value = `; ${document.cookie}`;
// //     const parts = value.split(`; ${name}=`);
// //     if (parts.length === 2) return parts.pop().split(';').shift();
// //   };

// //   // Fetch perimeters from the backend
// //   // useEffect(() => {
// //   //   const fetchPerimeters = async () => {
// //   //     try {
// //   //       const queryParams = new URLSearchParams({
// //   //         search: searchTerm,
// //   //         dept__asset: filterAsset,
// //   //         status: filterStatus,
// //   //       }).toString();
// //   //       const response = await fetch(`http://127.0.0.1:8000/api/concessions/?${queryParams}`);
// //   //       if (!response.ok) {
// //   //         throw new Error('Network response was not ok');
// //   //       }
// //   //       const data = await response.json();
// //   //       setPerimeters(data || []);
// //   //     } catch (error) {
// //   //       console.error('Error fetching perimeters:', error);
// //   //     }
// //   //   };

// //   //   fetchPerimeters();
// //   // }, [searchTerm, filterAsset, filterStatus]); // Re-fetch when search or filters change

// //   useEffect(() => {
// //     const checkAuthStatus = async () => {
// //       try {
// //         const response = await fetch('http://127.0.0.1:8000/api/auth-status/', {
// //           credentials: 'include',
// //         });
// //         const data = await response.json();
// //         if (!data.is_authenticated) {
// //           alert('Please log in to continue');
// //           navigate('/login');
// //         }
// //       } catch (error) {
// //         console.error('Error checking auth status:', error);
// //       }
// //     };
  
// //     const fetchPerimeters = async () => {
// //       try {
// //         const queryParams = new URLSearchParams({
// //           search: searchTerm,
// //           dept__asset: filterAsset,
// //           status: filterStatus,
// //         }).toString();
// //         const response = await fetch(`http://127.0.0.1:8000/api/concessions/?${queryParams}`);
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         const data = await response.json();
// //         setPerimeters(data || []);
// //       } catch (error) {
// //         console.error('Error fetching perimeters:', error);
// //       }
// //     };
  
// //     checkAuthStatus();
// //     fetchPerimeters();
// //   }, [searchTerm, filterAsset, filterStatus, navigate]);


// //   // Fetch departments
// //   useEffect(() => {
// //     const fetchDepartments = async () => {
// //       try {
// //         const response = await fetch('http://127.0.0.1:8000/api/departements/');
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         const data = await response.json();
// //         console.log('Fetched departments:', data); // Debug log
// //         setDepartments(data || []);
// //       } catch (error) {
// //         console.error('Error fetching departments:', error);
// //       }
// //     };

// //     fetchDepartments();
// //   }, []); // Run once on mount

// //   const handleInitialize = (perimeterName) => {
// //     const normalizedPerimeterName = perimeterName.normalize('NFC');
// //     navigate(`/Perimetres/${encodeURIComponent(normalizedPerimeterName)}`);
// //   };

// //   const handleUpdate = (perimeter) => {
// //     setSelectedPerimeter(perimeter);
// //     setFormData({
// //       department: perimeter.department,
// //       status: perimeter.status,
// //       name: perimeter.name,
// //       linkedPerimeters: perimeter.linkedPerimeters,
// //       observation: perimeter.observation,
// //     });
// //     setIsModalOpen(true);
// //   };

// //   const handleDelete = async (perimeterName) => {
// //     const isConfirmed = window.confirm(`Are you sure you want to delete the perimeter "${perimeterName}"? This action cannot be undone.`);
// //     // Proceed with deletion only if the user confirms
// //     if (!isConfirmed) {
// //       console.log(`Deletion of perimeter "${perimeterName}" canceled by user.`);
// //       alert(`Deletion of "${perimeterName}" was canceled.`);
// //       return; // Exit the function if the user cancels
// //     }
// //     try {
// //       const response = await axios.delete(`http://127.0.0.1:8000/api/concessions/${perimeterName}/`, {
// //         headers: {
// //           'X-CSRFToken': getCookie('csrftoken'),
// //         },
// //       });
// //       // Check the status directly from the response
// //       if (response.status === 204) {
// //         setPerimeters(perimeters.filter((p) => p.name !== perimeterName));
// //         console.log(`Successfully deleted perimeter: ${perimeterName}`);
// //       } else {
// //         console.warn(`Unexpected response status: ${response.status}`);
// //       }
// //     } catch (error) {
// //       console.error('Error deleting perimeter:', {
// //         message: error.message,
// //         response: error.response ? error.response.data : 'No response data',
// //         status: error.response ? error.response.status : 'No status',
// //       });
// //     }
// //   };

// //   const handleModalClose = () => {
// //     setIsModalOpen(false);
// //     setSelectedPerimeter(null);
// //     setFormData({
// //       department: '',
// //       status: '',
// //       name: '',
// //       linkedPerimeters: '',
// //       observation: '',
// //     });
// //   };

// //   const handleFormChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const updatedData = {
// //         // name: formData.name,
// //         status: formData.status,
// //         dept: formData.department !== 'N/A' ? formData.department : null, // Ensure valid dept
// //         notes: formData.observation,
// //         linked_prms: formData.linkedPerimeters ? [formData.linkedPerimeters] : [],
// //         classification: selectedPerimeter.classification || 'Near field mature',
// //         init_area: selectedPerimeter.init_area || 1000.00,
// //         distance: selectedPerimeter.distance || 50.00,
// //         zones_fisc: selectedPerimeter.zones_fisc || 'Zone A',
// //         coords: null,
// //         operator: selectedPerimeter.operator || 'Sonatrach',
// //       };
// //       console.log('Form Data:', formData);
// //       console.log('Data being sent:', updatedData);
// //       const response = await axios.put(`http://127.0.0.1:8000/api/concessions/${selectedPerimeter.name}/`, updatedData, {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'X-CSRFToken': getCookie('csrftoken'),
// //         },
// //       });
  
// //       const updatedPerimeter = response.data;
// //       console.log('Response data:', updatedPerimeter);  // Log the response to verify notes
// //       setPerimeters(perimeters.map((p) => (p.name === selectedPerimeter.name ? updatedPerimeter : p)));
// //       handleModalClose();
// //     } catch (error) {
// //       console.error('Error updating perimeter:', error.response ? error.response.data : error.message);
// //     }
// //   };

// //   return (
// //     <div className="perimeter-list-container">
// //       {/* Header */}
// //       <div className="headerr">
// //         <h1>Portefeuille concessions</h1>
// //         <div className="header-actions">
// //           <button className="filter-buttonn">Filtrer</button>
// //           <button className="new-button">Nouveau</button>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="main-content">
// //         {/* Table */}
// //         <div className="table-container">
// //           <div className="table-header">
// //             <div className="table-header-actions">
// //               <input
// //                 type="text"
// //                 placeholder="Rechercher par nom"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //               <select
// //                 value={filterAsset}
// //                 onChange={(e) => setFilterAsset(e.target.value)}
// //               >
// //                 <option value="">Tous</option>
// //                 <option value="ASO">ASO</option>
// //                 <option value="ASE">ASE</option>
// //                 <option value="ASC">ASC</option>
// //                 <option value="ASN">ASN</option>
// //               </select>
// //               <select
// //                 value={filterStatus}
// //                 onChange={(e) => setFilterStatus(e.target.value)}
// //               >
// //                 <option value="">Tous Statuts</option>
// //                 <option value="Contrat de recherche">Contrat de recherche</option>
// //                 <option value="ACPO">ACPO</option>
// //                 <option value="ACPN">ACPN</option>
// //                 <option value="Concession Amont">Concession Amont</option>
// //               </select>
// //             </div>
// //           </div>

// //           <table className="perimeter-table">
// //             <thead>
// //               <tr>
// //                 <th>Nom du périmètre</th>
// //                 <th>Validité</th>
// //                 <th>Blocs</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {perimeters.map((perimeter, index) => (
// //                 <tr key={index}>
// //                   <td>
// //                     {/* {perimeter.name === 'REGGANE II' ? ( */}
// //                       <>
// //                         <a
// //                           // href="#"
// //                           onClick={() => handleInitialize(perimeter.name)}
// //                           className="link"
// //                         >
// //                           {perimeter.name}
// //                         </a>
// //                         {/* <span className="fiche-link">Lien vers la fiche de synthèse</span> */}
// //                       </>
// //                     {/* ) : (
// //                       perimeter.name
// //                     )} */}
// //                   </td>
// //                   <td>{perimeter.validity}</td>
// //                   <td>{perimeter.blocs}</td>
// //                   <td className="flex space-x-2">
// //                     <button
// //                       onClick={() => handleInitialize(perimeter.name)}
// //                       className="action-button initialize"
// //                       title="Initialiser le cadre contractuel"
// //                     >
// //                       📄
// //                     </button>
// //                     <button
// //                       onClick={() => handleUpdate(perimeter)} // Pass the entire perimeter object
// //                       className="action-button edit"
// //                       title="Mise à jour d’un périmètre"
// //                     >
// //                       ✏️
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(perimeter.name)}
// //                       className="action-button delete"
// //                       title="Supprimer"
// //                     >
// //                       🗑️
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {/* Modal for Updating Perimeter */}
// //       {isModalOpen && (
// //         <div className="modal-overlay">
// //           <div className="modal-contentt">
// //             <div className="modal-header">
// //               <h2>Mise à jour d’un périmètre</h2>
// //               <button onClick={handleModalClose} className="modal-close-button">✕</button>
// //             </div>
// //             <form onSubmit={handleFormSubmit} className="modal-form">
// //               <div className="form-group">
// //                 <label>Département</label>
// //                 <select
// //                   name="department"
// //                   value={formData.department}
// //                   onChange={handleFormChange}
// //                 >
// //                   <option value="N/A">N/A</option>
// //                   {departments.map((dept) => (
// //                     <option key={dept.id} value={dept.id}>
// //                       {dept.id}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Statut</label>
// //                 <select
// //                   name="status"
// //                   value={formData.status}
// //                   onChange={handleFormChange}
// //                 >
// //                   <option value="Contrat de recherche">Contrat de recherche</option>
// //                   <option value="ACPO">ACPO</option>
// //                   <option value="ACPN">ACPN</option>
// //                   <option value="Concession Amont">Concession Amont</option>
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Nom du périmètre</label>
// //                 <input
// //                   type="text"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleFormChange}
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Périmètres liés</label>
// //                 <select
// //                   name="linkedPerimeters"
// //                   value={formData.linkedPerimeters}
// //                   onChange={handleFormChange}
// //                 >
// //                   <option value="">Aucun</option>
// //                   {perimeters
// //                     .filter((p) => p.name !== formData.name)
// //                     .map((p) => (
// //                       <option key={p.name} value={p.name}>
// //                         {p.name}
// //                       </option>
// //                     ))}
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Observation</label>
// //                 <textarea
// //                   name="observation"
// //                   value={formData.observation}
// //                   onChange={handleFormChange}
// //                   rows="2"
// //                 />
// //               </div>
// //               <button type="submit" className="submit-button">
// //                 Mettre à jour le périmètre
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default PerimeterList;



// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './PerimeterList.css';
// import axios from 'axios';

// function PerimeterList() {
//   const navigate = useNavigate();
//   const [departments, setDepartments] = useState([]);
//   const [perimeters, setPerimeters] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPerimeter, setSelectedPerimeter] = useState(null);
//   const [formData, setFormData] = useState({
//     department: '',
//     status: '',
//     name: '',
//     linkedPerimeters: '',
//     observation: '',
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterAsset, setFilterAsset] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');

//   // State for new contract modal
//   const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false);
//   const [contractNumber, setContractNumber] = useState('');
//   const [signatureDate, setSignatureDate] = useState('');
//   const [effectiveDate, setEffectiveDate] = useState('');
//   const [contractDuration, setContractDuration] = useState('');
//   const [phases, setPhases] = useState([{ name: 'Phase 1', duration: '', surface: '' }]);

//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   };

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/auth-status/', {
//           credentials: 'include',
//         });
//         const data = await response.json();
//         if (!data.is_authenticated) {
//           alert('Please log in to continue');
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error('Error checking auth status:', error);
//       }
//     };

//     const fetchPerimeters = async () => {
//       try {
//         const queryParams = new URLSearchParams({
//           search: searchTerm,
//           dept__asset: filterAsset,
//           status: filterStatus,
//         }).toString();
//         const response = await fetch(`http://127.0.0.1:8000/api/concessions/?${queryParams}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setPerimeters(data || []);
//       } catch (error) {
//         console.error('Error fetching perimeters:', error);
//       }
//     };

//     checkAuthStatus();
//     fetchPerimeters();
//   }, [searchTerm, filterAsset, filterStatus, navigate]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/departements/');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log('Fetched departments:', data);
//         setDepartments(data || []);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleInitialize = (perimeterName) => {
//     const normalizedPerimeterName = perimeterName.normalize('NFC');
//     navigate(`/Perimetres/${encodeURIComponent(normalizedPerimeterName)}`);
//   };

//   const handleUpdate = (perimeter) => {
//     setSelectedPerimeter(perimeter);
//     setFormData({
//       department: perimeter.department,
//       status: perimeter.status,
//       name: perimeter.name,
//       linkedPerimeters: perimeter.linkedPerimeters,
//       observation: perimeter.observation,
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (perimeterName) => {
//     const isConfirmed = window.confirm(`Are you sure you want to delete the perimeter "${perimeterName}"? This action cannot be undone.`);
//     if (!isConfirmed) {
//       console.log(`Deletion of perimeter "${perimeterName}" canceled by user.`);
//       alert(`Deletion of "${perimeterName}" was canceled.`);
//       return;
//     }
//     try {
//       const response = await axios.delete(`http://127.0.0.1:8000/api/concessions/${perimeterName}/`, {
//         headers: {
//           'X-CSRFToken': getCookie('csrftoken'),
//         },
//       });
//       if (response.status === 204) {
//         setPerimeters(perimeters.filter((p) => p.name !== perimeterName));
//         console.log(`Successfully deleted perimeter: ${perimeterName}`);
//       } else {
//         console.warn(`Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error deleting perimeter:', {
//         message: error.message,
//         response: error.response ? error.response.data : 'No response data',
//         status: error.response ? error.response.status : 'No status',
//       });
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedPerimeter(null);
//     setFormData({
//       department: '',
//       status: '',
//       name: '',
//       linkedPerimeters: '',
//       observation: '',
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedData = {
//         status: formData.status,
//         dept: formData.department !== 'N/A' ? formData.department : null,
//         notes: formData.observation,
//         linked_prms: formData.linkedPerimeters ? [formData.linkedPerimeters] : [],
//         classification: selectedPerimeter.classification || 'Near field mature',
//         init_area: selectedPerimeter.init_area || 1000.00,
//         distance: selectedPerimeter.distance || 50.00,
//         zones_fisc: selectedPerimeter.zones_fisc || 'Zone A',
//         coords: null,
//         operator: selectedPerimeter.operator || 'Sonatrach',
//       };
//       console.log('Form Data:', formData);
//       console.log('Data being sent:', updatedData);
//       const response = await axios.put(`http://127.0.0.1:8000/api/concessions/${selectedPerimeter.name}/`, updatedData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': getCookie('csrftoken'),
//         },
//       });

//       const updatedPerimeter = response.data;
//       console.log('Response data:', updatedPerimeter);
//       setPerimeters(perimeters.map((p) => (p.name === selectedPerimeter.name ? updatedPerimeter : p)));
//       handleModalClose();
//     } catch (error) {
//       console.error('Error updating perimeter:', error.response ? error.response.data : error.message);
//     }
//   };

//   // New contract modal handlers
//   const handleOpenNewContractModal = () => {
//     setIsNewContractModalOpen(true);
//     setContractNumber(`CON-${Date.now()}`); // Auto-generate a unique contract number
//     setSignatureDate('');
//     setEffectiveDate('');
//     setContractDuration('');
//     setPhases([{ name: 'Phase 1', duration: '', surface: '' }]);
//   };

//   const handleCloseNewContractModal = () => {
//     setIsNewContractModalOpen(false);
//     setContractNumber('');
//     setSignatureDate('');
//     setEffectiveDate('');
//     setContractDuration('');
//     setPhases([{ name: 'Phase 1', duration: '', surface: '' }]);
//   };

//   const handleAddPhase = () => {
//     setPhases([...phases, { name: `Phase ${phases.length + 1}`, duration: '', surface: '' }]);
//   };

//   const handleUpdatePhase = (index, field, value) => {
//     const updatedPhases = [...phases];
//     updatedPhases[index][field] = value;
//     setPhases(updatedPhases);
//   };

//   const handleDeletePhase = (index) => {
//     if (index === 0) return; // Prevent deleting the first phase
//     const updatedPhases = phases.filter((_, i) => i !== index);
//     setPhases(updatedPhases);
//   };

//   const handleSaveNewContract = async () => {
//     try {
//       const contractData = {
//         num: contractNumber,
//         signatureDate,
//         effectiveDate,
//         duration: contractDuration,
//         phases: phases.map((phase) => ({
//           name: phase.name,
//           duration: phase.duration,
//           surface: phase.surface,
//         })),
//       };
//       console.log('Sending contract data:', contractData);
//       const response = await axios.post('http://127.0.0.1:8000/api/contracts/', contractData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': getCookie('csrftoken'),
//         },
//       });
//       console.log('Contract created:', response.data);
//       handleCloseNewContractModal();
//       // Optionally refetch perimeters or contracts if needed
//     } catch (error) {
//       console.error('Error creating contract:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="perimeter-list-container">
//       <div className="headerr">
//         <h1>Portefeuille concessions</h1>
//         <div className="header-actions">
//           <button className="filter-buttonn">Filtrer</button>
//           <button onClick={handleOpenNewContractModal} className="new-button">
//             Nouveau
//           </button>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="table-container">
//           <div className="table-header">
//             <div className="table-header-actions">
//               <input
//                 type="text"
//                 placeholder="Rechercher par nom"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <select
//                 value={filterAsset}
//                 onChange={(e) => setFilterAsset(e.target.value)}
//               >
//                 <option value="">Tous</option>
//                 <option value="ASO">ASO</option>
//                 <option value="ASE">ASE</option>
//                 <option value="ASC">ASC</option>
//                 <option value="ASN">ASN</option>
//               </select>
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//               >
//                 <option value="">Tous Statuts</option>
//                 <option value="Contrat de recherche">Contrat de recherche</option>
//                 <option value="ACPO">ACPO</option>
//                 <option value="ACPN">ACPN</option>
//                 <option value="Concession Amont">Concession Amont</option>
//               </select>
//             </div>
//           </div>

//           <table className="perimeter-table">
//             <thead>
//               <tr>
//                 <th>Nom du périmètre</th>
//                 <th>Validité</th>
//                 <th>Blocs</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {perimeters.map((perimeter, index) => (
//                 <tr key={index}>
//                   <td>
//                     <a
//                       onClick={() => handleInitialize(perimeter.name)}
//                       className="link"
//                     >
//                       {perimeter.name}
//                     </a>
//                   </td>
//                   <td>{perimeter.validity}</td>
//                   <td>{perimeter.blocs}</td>
//                   <td className="flex space-x-2">
//                     <button
//                       onClick={() => handleInitialize(perimeter.name)}
//                       className="action-button initialize"
//                       title="Initialiser le cadre contractuel"
//                     >
//                       📄
//                     </button>
//                     <button
//                       onClick={() => handleUpdate(perimeter)}
//                       className="action-button edit"
//                       title="Mise à jour d’un périmètre"
//                     >
//                       ✏️
//                     </button>
//                     <button
//                       onClick={() => handleDelete(perimeter.name)}
//                       className="action-button delete"
//                       title="Supprimer"
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-contentt">
//             <div className="modal-header">
//               <h2>Mise à jour d’un périmètre</h2>
//               <button onClick={handleModalClose} className="modal-close-button">✕</button>
//             </div>
//             <form onSubmit={handleFormSubmit} className="modal-form">
//               <div className="form-group">
//                 <label>Département</label>
//                 <select
//                   name="department"
//                   value={formData.department}
//                   onChange={handleFormChange}
//                 >
//                   <option value="N/A">N/A</option>
//                   {departments.map((dept) => (
//                     <option key={dept.id} value={dept.id}>
//                       {dept.id}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Statut</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleFormChange}
//                 >
//                   <option value="Contrat de recherche">Contrat de recherche</option>
//                   <option value="ACPO">ACPO</option>
//                   <option value="ACPN">ACPN</option>
//                   <option value="Concession Amont">Concession Amont</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Nom du périmètre</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleFormChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Périmètres liés</label>
//                 <select
//                   name="linkedPerimeters"
//                   value={formData.linkedPerimeters}
//                   onChange={handleFormChange}
//                 >
//                   <option value="">Aucun</option>
//                   {perimeters
//                     .filter((p) => p.name !== formData.name)
//                     .map((p) => (
//                       <option key={p.name} value={p.name}>
//                         {p.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Observation</label>
//                 <textarea
//                   name="observation"
//                   value={formData.observation}
//                   onChange={handleFormChange}
//                   rows="2"
//                 />
//               </div>
//               <button type="submit" className="submit-button">
//                 Mettre à jour le périmètre
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {isNewContractModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-contentt">
//             <div className="modal-header">
//               <h2>Initialisation situation contractuelle du périmètre</h2>
//               <button onClick={handleCloseNewContractModal} className="modal-close-button">✕</button>
//             </div>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Numéro du contrat</label>
//                 <input
//                   type="text"
//                   value={contractNumber}
//                   onChange={(e) => setContractNumber(e.target.value)}
//                   disabled
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Date de signature de contrat</label>
//                 <input
//                   type="date"
//                   value={signatureDate}
//                   onChange={(e) => setSignatureDate(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Date d’entrée en vigueur</label>
//                 <input
//                   type="date"
//                   value={effectiveDate}
//                   onChange={(e) => setEffectiveDate(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Durée du contrat (mois)</label>
//                 <input
//                   type="number"
//                   value={contractDuration}
//                   onChange={(e) => setContractDuration(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="phases-table-container">
//               <h3>Phases</h3>
//               <button onClick={handleAddPhase} className="add-button">
//                 Ajouter une phase
//               </button>
//               <div className="table-container">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Phase</th>
//                       <th>Durée (mois)</th>
//                       <th>Superficie à rendre (%)</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {phases.map((phase, index) => (
//                       <tr key={index}>
//                         <td>{phase.name}</td>
//                         <td>
//                           <input
//                             type="number"
//                             value={phase.duration}
//                             onChange={(e) => handleUpdatePhase(index, 'duration', e.target.value)}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             value={phase.surface}
//                             onChange={(e) => handleUpdatePhase(index, 'surface', e.target.value)}
//                           />
//                         </td>
//                         <td className="flex space-x-2">
//                           <button
//                             onClick={() => handleDeletePhase(index)}
//                             disabled={index === 0}
//                             className="action-button delete disabled:opacity-50"
//                           >
//                             🗑️
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             <button onClick={handleSaveNewContract} className="submit-button">
//               Enregistrer le contrat
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PerimeterList;

// -----------26-05-------


// ----------------------- plf -------------------------

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './PerimeterList.css';
// import axios from 'axios';

// function PerimeterList() {
//   const navigate = useNavigate();
//   const [departments, setDepartments] = useState([]);
//   const [perimeters, setPerimeters] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPerimeter, setSelectedPerimeter] = useState(null);
//   const [formData, setFormData] = useState({
//     department: '',
//     status: '',
//     name: '',
//     linkedPerimeters: '',
//     observation: '',
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterAsset, setFilterAsset] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');

//   // State for new contract modal
//   const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false);
//   const [contractNumber, setContractNumber] = useState('');
//   const [signatureDate, setSignatureDate] = useState('');
//   const [effectiveDate, setEffectiveDate] = useState('');
//   const [phases, setPhases] = useState([{ name: 'Phase 1', duration: '', surface: '' }]);
//   const [availablePerimeters, setAvailablePerimeters] = useState([]);
//   const [selectedPerimeterForContract, setSelectedPerimeterForContract] = useState('');
  
//     // State for new perimeter modal
//     const [isNewPerimeterModalOpen, setIsNewPerimeterModalOpen] = useState(false);
//     const [newPerimeterData, setNewPerimeterData] = useState({
//       department: '',
//       statut: '',
//       nom_de_perimetre: '',
//       perimetre_liee: '',
//       observation: '',
//     });


//   // Calculate contract duration dynamically
//   const calculateContractDuration = () => {
//     if (!signatureDate || !effectiveDate) return 0;
//     const start = new Date(signatureDate);
//     const end = new Date(effectiveDate);
//     const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
//     return months > 0 ? months : 0;
//   };

//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   };

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/auth-status/', {
//           credentials: 'include',
//         });
//         const data = await response.json();
//         if (!data.is_authenticated) {
//           alert('Please log in to continue');
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error('Error checking auth status:', error);
//       }
//     };

//     const fetchPerimeters = async () => {
//       try {
//         const queryParams = new URLSearchParams({
//           search: searchTerm,
//           dept__asset: filterAsset,
//           status: filterStatus,
//         }).toString();
//         const response = await fetch(`http://127.0.0.1:8000/api/concessions/?${queryParams}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setPerimeters(data || []);

//         const perimetersWithoutContracts = data.filter(p => !p.contracts || p.contracts.length === 0);
//         setAvailablePerimeters(perimetersWithoutContracts);
//       } catch (error) {
//         console.error('Error fetching perimeters:', error);
//       }
//     };

//     checkAuthStatus();
//     fetchPerimeters();
//   }, [searchTerm, filterAsset, filterStatus, navigate]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/departements/');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setDepartments(data || []);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleInitialize = (perimeterName) => {
//     const normalizedPerimeterName = perimeterName.normalize('NFC');
//     navigate(`/Perimetres/${encodeURIComponent(normalizedPerimeterName)}`);
//   };

//   const handleUpdate = (perimeter) => {
//     setSelectedPerimeter(perimeter);
//     setFormData({
//       department: perimeter.department,
//       status: perimeter.status,
//       name: perimeter.name,
//       linkedPerimeters: perimeter.linkedPerimeters,
//       observation: perimeter.observation,
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (perimeterName) => {
//     const isConfirmed = window.confirm(`Are you sure you want to delete the perimeter "${perimeterName}"? This action cannot be undone.`);
//     if (!isConfirmed) {
//       console.log(`Deletion of perimeter "${perimeterName}" canceled by user.`);
//       alert(`Deletion of "${perimeterName}" was canceled.`);
//       return;
//     }
//     try {
//       const response = await axios.delete(`http://127.0.0.1:8000/api/concessions/${perimeterName}/`, {
//         headers: {
//           'X-CSRFToken': getCookie('csrftoken'),
//         },
//       });
//       if (response.status === 204) {
//         setPerimeters(perimeters.filter((p) => p.name !== perimeterName));
//         console.log(`Successfully deleted perimeter: ${perimeterName}`);
//       } else {
//         console.warn(`Unexpected response status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error deleting perimeter:', {
//         message: error.message,
//         response: error.response ? error.response.data : 'No response data',
//         status: error.response ? error.response.status : 'No status',
//       });
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedPerimeter(null);
//     setFormData({
//       department: '',
//       status: '',
//       name: '',
//       linkedPerimeters: '',
//       observation: '',
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };


// // 


// // const handleFormSubmit = async (e) => {
// //   e.preventDefault();
// //   try {
// //     const updatedData = {
      
// //       status: formData.status,
// //       dept: formData.department !== 'N/A' ? formData.department : null,
// //       notes: formData.observation,
// //       linked_prms: formData.linkedPerimeters ? [formData.linkedPerimeters] : [],

      
      
// //     };
// //     console.log('Sending updated data:', updatedData);
// //     const response = await axios.put(`http://127.0.0.1:8000/api/concessions/${selectedPerimeter.name}/`, updatedData, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'X-CSRFToken': getCookie('csrftoken'),
// //       },
// //     });
   
// //     const updatedPerimeter = response.data;
// //     console.log('Updated perimeter response:', updatedPerimeter);
// //     setPerimeters(perimeters.map((p) => (p.name === selectedPerimeter.name ? updatedPerimeter : p)));
// //     handleModalClose();
// //   } catch (error) {
// //     console.error('Error updating perimeter:', error.response ? error.response.data : error.message);
// //   }
// // };


//   // 
//   const handleFormSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       if (formData.name !== selectedPerimeter.name) {

//         // Rename case: Confirm deletion and create new

//         const isConfirmed = window.confirm(`Renaming "${selectedPerimeter.name}" to "${formData.name}" will delete the existing perimeter and create a new one. Are you sure?`);

//         if (!isConfirmed) {

//           console.log('Rename canceled by user');

//           return;

//         }

//         // Delete the old perimeter

//         await axios.delete(`http://127.0.0.1:8000/api/concessions/${selectedPerimeter.name}/`, {

//           headers: { 'X-CSRFToken': getCookie('csrftoken') },

//         });

//         // Create a new perimeter with the updated name

//         const newPerimeterData = {

//           name: formData.name,

//           status: formData.status,

//           dept: formData.department !== 'N/A' ? formData.department : null,

//           linked_prms: formData.linkedPerimeters ? [formData.linkedPerimeters] : [],

//           observation: formData.observation,

//           classification: selectedPerimeter.classification || 'Near field mature',

//           init_area: selectedPerimeter.init_area || 1000.00,

//           distance: selectedPerimeter.distance || 50.00,

//           zones_fisc: selectedPerimeter.zones_fisc || 'Zone A',

//           coords: selectedPerimeter.coords || null,

//           operator: selectedPerimeter.operator || 'Sonatrach',

//         };

//         console.log('Sending new perimeter data for rename:', newPerimeterData);

//         const createResponse = await axios.post('http://127.0.0.1:8000/api/concessions/', newPerimeterData, {

//           headers: {

//             'Content-Type': 'application/json',

//             'X-CSRFToken': getCookie('csrftoken'),

//           },

//           withCredentials: true,

//         });

//         const updatedPerimeter = createResponse.data;

//         console.log('New perimeter created:', updatedPerimeter);

//         setPerimeters(perimeters.map(p => p.name === selectedPerimeter.name ? updatedPerimeter : p));

//       } else {

//         // Normal update case

//         const updatedData = {

//           status: formData.status,

//           dept: formData.department !== 'N/A' ? formData.department : null,

//           observation: formData.observation,

//           linked_prms: formData.linkedPerimeters ? [formData.linkedPerimeters] : [],

//         };

//         console.log('Sending updated data:', updatedData);

//         const response = await axios.put(`http://127.0.0.1:8000/api/concessions/${selectedPerimeter.name}/`, updatedData, {

//           headers: {

//             'Content-Type': 'application/json',

//             'X-CSRFToken': getCookie('csrftoken'),

//           },

//         });

//         const updatedPerimeter = response.data;

//         console.log('Updated perimeter response:', updatedPerimeter);

//         setPerimeters(perimeters.map((p) => (p.name === selectedPerimeter.name ? updatedPerimeter : p)));

//       }

//       handleModalClose();

//     } catch (error) {

//       console.error('Error updating perimeter:', error.response ? error.response.data : error.message);

//       alert('Failed to update perimeter: ' + (error.response?.data?.error || error.message));

//     }

//   };



//   const handleCloseNewContractModal = () => {
//     setIsNewContractModalOpen(false);
//     setContractNumber('');
//     setSignatureDate('');
//     setEffectiveDate('');
//     setPhases([{ name: 'Phase 1', duration: '', surface: '' }]);
//     setSelectedPerimeterForContract('');
//   };

//   const handleAddPhase = () => {
//     if (phases.length < 3) {
//       setPhases([...phases, { name: `Phase ${phases.length + 1}`, duration: '', surface: '' }]);
//     } else {
//       alert('Maximum of 3 phases allowed.');
//     }
//   };

//   const handleUpdatePhase = (index, field, value) => {
//     const updatedPhases = [...phases];
//     updatedPhases[index][field] = value;
//     setPhases(updatedPhases);
//   };

//   const handleDeletePhase = (index) => {
//     if (index === 0) return;
//     if (phases.length > 1) {
//       const updatedPhases = phases.filter((_, i) => i !== index);
//       setPhases(updatedPhases);
//     }
//   };

//   const handleSaveNewContract = async () => {
//     try {
//       for (const phase of phases) {
//         if (!phase.name) {
//           throw new Error('Phase name is required.');
//         }
//         const duration = parseInt(phase.duration);
//         const surface = parseFloat(phase.surface);
//         if (isNaN(duration) || duration <= 0) {
//           throw new Error(`Invalid duration for ${phase.name}: must be a positive integer.`);
//         }
//         if (isNaN(surface) || surface < 0) {
//           throw new Error(`Invalid surface for ${phase.name}: must be a non-negative number.`);
//         }
//       }
  
//       if (!signatureDate) {
//         throw new Error('Signature date is required.');
//       }
//       if (!effectiveDate) {
//         throw new Error('Effective date is required.');
//       }
  
//       const contractData = {
//         contractNumber: contractNumber, // Changed from contractNumber to num
//         sign_date: signatureDate,
//         vig_date: effectiveDate,
//         prm: selectedPerimeterForContract,
//         contract_phs: phases.map((phase) => ({
//           name: phase.name,
//           duration: parseInt(phase.duration),
//           surface: parseFloat(phase.surface),
//         })),
//       };
//       console.log('Sending contract data:', contractData);
  
//       const response = await fetch('http://127.0.0.1:8000/api/contracts/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': getCookie('csrftoken'),
//         },
//         credentials: 'include',
//         body: JSON.stringify(contractData),
//       });
  
//       const contentType = response.headers.get('content-type');
//       const responseBody = await response.text();
//       let responseData;
//       try {
//         responseData = contentType && contentType.includes('application/json') ? JSON.parse(responseBody) : {};
//       } catch (e) {
//         throw new Error(`Invalid response format: ${responseBody}`);
//       }
  
//       console.log('Response status:', response.status);
//       console.log('Response data:', responseData);
  
//       if (!response.ok) {
//         const errorMessage = responseData.error || responseData.detail || Object.values(responseData).join(', ') || `Failed to create contract: ${response.statusText}`;
//         throw new Error(errorMessage);
//       }
  
//       const queryParams = new URLSearchParams({
//         search: searchTerm,
//         dept__asset: filterAsset,
//         status: filterStatus,
//       }).toString();
//       const perimetersResponse = await fetch(`http://127.0.0.1:8000/api/concessions/?${queryParams}`);
//       if (!perimetersResponse.ok) {
//         throw new Error('Failed to refresh perimeters');
//       }
//       const updatedPerimeters = await perimetersResponse.json();
//       setPerimeters(updatedPerimeters || []);
  
//       const perimetersWithoutContracts = updatedPerimeters.filter(p => !p.contracts || p.contracts.length === 0);
//       setAvailablePerimeters(perimetersWithoutContracts);
  
//       handleCloseNewContractModal();
//       alert('Contract created successfully!');
//     } catch (error) {
//       console.error('Error creating contract:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       });
//       alert('Failed to create contract: ' + error.message);
//     }
//   };

//   const handleNewPerimeterChange = (e) => {

//     const { name, value } = e.target;

//     setNewPerimeterData((prev) => ({ ...prev, [name]: value }));

//   };



//   const handleSaveNewPerimeter = async (e) => {

//     e.preventDefault();

//     try {

//       const newPerimeterDataToSend = {

//         name: newPerimeterData.nom_de_perimetre,

//         status: newPerimeterData.statut,

//         dept: newPerimeterData.department !== 'N/A' ? newPerimeterData.department : null,

//         linked_prms: newPerimeterData.perimetre_liee ? [newPerimeterData.perimetre_liee] : [],

//         observation: newPerimeterData.observation,

//         classification: 'Near field mature',

//         init_area: 1000.00,

//         distance: 50.00,

//         zones_fisc: 'Zone A',

//         coords: null,

//         operator: 'Sonatrach',  // Default operator

//       };

//       console.log('Sending new perimeter data:', newPerimeterDataToSend);



//       const response = await axios.post('http://127.0.0.1:8000/api/concessions/', newPerimeterDataToSend, {

//         headers: {

//           'Content-Type': 'application/json',

//           'X-CSRFToken': getCookie('csrftoken'),

//         },

//         withCredentials: true,

//       });



//       if (response.status === 201) {

//         console.log('Perimeter created successfully:', response.data);

//         const updatedPerimeters = [...perimeters, response.data];

//         setPerimeters(updatedPerimeters);

//         const perimetersWithoutContracts = updatedPerimeters.filter(p => !p.contracts || p.contracts.length === 0);

//         setAvailablePerimeters(perimetersWithoutContracts);

//         handleCloseNewPerimeterModal();

//         alert('Perimeter created successfully!');

//       } else {

//         throw new Error('Failed to create perimeter');

//       }

//     } catch (error) {

//       console.error('Error creating perimeter:', error.response ? error.response.data : error.message);

//       alert('Failed to create perimeter: ' + (error.response?.data?.error || error.message));

//     }

//   };



//   const handleCloseNewPerimeterModal = () => {

//     setIsNewPerimeterModalOpen(false);

//     setNewPerimeterData({

//       department: '',

//       statut: '',

//       nom_de_perimetre: '',

//       perimetre_liee: '',

//       observation: '',

//     });

//   };

//   return (
//     <div className="perimeter-list-container">
//       <div className="headerr">
//         <h1>Portefeuille concessions</h1>
//         <div className="header-actions">
//           <button className="filter-buttonn">Filtrer</button>
//           <button onClick={() => setIsNewPerimeterModalOpen(true)} className="new-button">
//             Nouveau
//           </button>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="table-container">
//           <div className="table-header">
//             <div className="table-header-actions">
//               <input
//                 type="text"
//                 placeholder="Rechercher par nom"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <select
//                 value={filterAsset}
//                 onChange={(e) => setFilterAsset(e.target.value)}
//               >
//                 <option value="">Tous</option>
//                 <option value="ASO">ASO</option>
//                 <option value="ASE">ASE</option>
//                 <option value="ASC">ASC</option>
//                 <option value="ASN">ASN</option>
//               </select>
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//               >
//                 <option value="">Tous Statuts</option>
//                 <option value="Contrat de recherche">Contrat de recherche</option>
//                 <option value="ACPO">ACPO</option>
//                 <option value="ACPN">ACPN</option>
//                 <option value="Concession Amont">Concession Amont</option>
//               </select>
//             </div>
//           </div>

//           <table className="perimeter-table">
//             <thead>
//               <tr>
//                 <th>Nom du périmètre</th>
//                 <th>Validité</th>
//                 <th>Blocs</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {perimeters.map((perimeter, index) => (
//                 <tr key={index}>
//                   <td>
//                     <a onClick={() => handleInitialize(perimeter.name)} className="link">
//                       {perimeter.name}
//                     </a>
//                   </td>
//                   <td>{perimeter.validity}</td>
//                   <td>{perimeter.blocs}</td>
//                   <td className="flex space-x-2">
//                     <button
//                       onClick={() => handleInitialize(perimeter.name)}
//                       className="action-button initialize"
//                       title="Initialiser le cadre contractuel"
//                     >
//                       📄
//                     </button>
//                     <button
//                       onClick={() => handleUpdate(perimeter)}
//                       className="action-button edit"
//                       title="Mise à jour d’un périmètre"
//                     >
//                       ✏️
//                     </button>
//                     <button
//                       onClick={() => handleDelete(perimeter.name)}
//                       className="action-button delete"
//                       title="Supprimer"
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-contentt">
//             <div className="modal-header">
//               <h2>Mise à jour d’un périmètre</h2>
//               <button onClick={handleModalClose} className="modal-close-button">✕</button>
//             </div>
//             <form onSubmit={handleFormSubmit} className="modal-form">
//               <div className="form-group">
//                 <label>Département</label>
//                 <select
//                   name="department"
//                   value={formData.department}
//                   onChange={handleFormChange}
//                 >
//                   <option value="N/A">N/A</option>
//                   {departments.map((dept) => (
//                     <option key={dept.id} value={dept.id}>
//                       {dept.id}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Statut</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleFormChange}
//                 >
//                   <option value="Contrat de recherche">Contrat de recherche</option>
//                   <option value="ACPO">ACPO</option>
//                   <option value="ACPN">ACPN</option>
//                   <option value="Concession Amont">Concession Amont</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Nom du périmètre</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleFormChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Périmètres liés</label>
//                 <select
//                   name="linkedPerimeters"
//                   value={formData.linkedPerimeters}
//                   onChange={handleFormChange}
//                 >
//                   <option value="">Aucun</option>
//                   {perimeters
//                     .filter((p) => p.name !== formData.name)
//                     .map((p) => (
//                       <option key={p.name} value={p.name}>
//                         {p.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Observation</label>
//                 <textarea
//                   name="observation"
//                   value={formData.observation}
//                   onChange={handleFormChange}
//                   rows="2"
//                 />
//               </div>
//               <button type="submit" className="submit-button">
//                 Mettre à jour le périmètre
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

// {isNewPerimeterModalOpen && (

// <div className="modal-overlay">

//   <div className="modal-contentt">

//     <div className="modal-header">

//       <h2>Créer un nouveau périmètre</h2>

//       <button onClick={handleCloseNewPerimeterModal} className="modal-close-button">✕</button>

//     </div>

//     <form onSubmit={handleSaveNewPerimeter} className="modal-form">

//       <div className="form-group">

//         <label>Département</label>

//         <select

//           name="department"

//           value={newPerimeterData.department}

//           onChange={handleNewPerimeterChange}

//           required

//         >

//           <option value="N/A">N/A</option>

//           {departments.map((dept) => (

//             <option key={dept.id} value={dept.id}>

//               {dept.id}

//             </option>

//           ))}

//         </select>

//       </div>

//       <div className="form-group">

//         <label>Statut</label>

//         <select

//           name="statut"

//           value={newPerimeterData.statut}

//           onChange={handleNewPerimeterChange}

//           required

//         >

//           <option value="">Sélectionner un statut</option>

//           <option value="Contrat de recherche">Contrat de recherche</option>

//           <option value="ACPO">ACPO</option>

//           <option value="ACPN">ACPN</option>

//           <option value="Concession Amont">Concession Amont</option>

//         </select>

//       </div>

//       <div className="form-group">

//         <label>Nom du périmètre</label>

//         <input

//           type="text"

//           name="nom_de_perimetre"

//           value={newPerimeterData.nom_de_perimetre}

//           onChange={handleNewPerimeterChange}

//           required

//         />

//       </div>

//       <div className="form-group">

//         <label>Périmètre liée</label>

//         <select

//           name="perimetre_liee"

//           value={newPerimeterData.perimetre_liee}

//           onChange={handleNewPerimeterChange}

//         >

//           <option value="">Aucun</option>

//           {perimeters.map((p) => (

//             <option key={p.name} value={p.name}>

//               {p.name}

//             </option>

//           ))}

//         </select>

//       </div>

//       <div className="form-group">

//         <label>Observation</label>

//         <textarea

//           name="observation"

//           value={newPerimeterData.observation}

//           onChange={handleNewPerimeterChange}

//           rows="2"

//         />

//       </div>

//       <button type="submit" className="submit-button">

//         Créer le périmètre

//       </button>

//     </form>

//   </div>

// </div>

// )}
//     </div>
//   );
// }

// export default PerimeterList;

// ----------------------- plf -------------------------


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerimeterList.css';
import axios from 'axios';

function PerimeterList() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [perimeters, setPerimeters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerimeter, setSelectedPerimeter] = useState(null);
  const [formData, setFormData] = useState({
    department: '',
    status: '',
    name: '',
    linkedPerimeters: '',
    observation: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAsset, setFilterAsset] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isPLFUser, setIsPLFUser] = useState(false); // Track PLF role

  // State for new contract modal
  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false);
  const [contractNumber, setContractNumber] = useState('');
  const [signatureDate, setSignatureDate] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [phases, setPhases] = useState([{ name: 'Phase 1', duration: '', surface: '' }]);
  const [availablePerimeters, setAvailablePerimeters] = useState([]);
  const [selectedPerimeterForContract, setSelectedPerimeterForContract] = useState('');

  // State for new perimeter modal
  const [isNewPerimeterModalOpen, setIsNewPerimeterModalOpen] = useState(false);
  const [newPerimeterData, setNewPerimeterData] = useState({
    department: '',
    statut: '',
    nom_de_perimetre: '',
    perimetre_liee: '',
    observation: '',
  });

  // Calculate contract duration dynamically
  const calculateContractDuration = () => {
    if (!signatureDate || !effectiveDate) return 0;
    const start = new Date(signatureDate);
    const end = new Date(effectiveDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return months > 0 ? months : 0;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
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
        setIsPLFUser(data.groups.includes('plf')); // Check for PLF role
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    const fetchPerimeters = async () => {
      try {
        const queryParams = new URLSearchParams({
          search: searchTerm,
          dept__asset: filterAsset,
          status: filterStatus,
        }).toString();
        const response = await fetch(`http://127.0.0.1:8000/api/concessions/?${queryParams}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPerimeters(data || []);

        const perimetersWithoutContracts = data.filter(p => !p.contracts || p.contracts.length === 0);
        setAvailablePerimeters(perimetersWithoutContracts);
      } catch (error) {
        console.error('Error fetching perimeters:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/departements/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDepartments(data || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    checkAuthStatus();
    fetchPerimeters();
    fetchDepartments();
  }, [searchTerm, filterAsset, filterStatus, navigate]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/departements/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDepartments(data || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleInitialize = (perimeterName) => {
    // if (!isPLFUser) {
    //   alert('Only PLF users can initialize a contract.');
    //   return;
    // }
    const normalizedPerimeterName = perimeterName.normalize('NFC');
    navigate(`/Perimetres/${encodeURIComponent(normalizedPerimeterName)}`);
  };

  const handleUpdate = (perimeter) => {
    if (!isPLFUser) {
      alert('Only PLF users can update a perimeter.');
      return;
    }
    setSelectedPerimeter(perimeter);
    setFormData({
      department: perimeter.department,
      status: perimeter.status,
      name: perimeter.name,
      linkedPerimeters: perimeter.linkedPerimeters,
      observation: perimeter.observation,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (perimeterName) => {
    if (!isPLFUser) {
      alert('Only PLF users can delete a perimeter.');
      return;
    }
    const isConfirmed = window.confirm(`Are you sure you want to delete the perimeter "${perimeterName}"? This action cannot be undone.`);
    if (!isConfirmed) {
      console.log(`Deletion of perimeter "${perimeterName}" canceled by user.`);
      alert(`Deletion of "${perimeterName}" was canceled.`);
      return;
    }
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/concessions/${perimeterName}/`, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });
      if (response.status === 204) {
        setPerimeters(perimeters.filter((p) => p.name !== perimeterName));
        console.log(`Successfully deleted perimeter: ${perimeterName}`);
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting perimeter:', {
        message: error.message,
        response: error.response ? error.response.data : 'No response data',
        status: error.response ? error.response.status : 'No status',
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPerimeter(null);
    setFormData({
      department: '',
      status: '',
      name: '',
      linkedPerimeters: '',
      observation: '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isPLFUser) {
      alert('Only PLF users can update a perimeter.');
      return;
    }
    try {
      if (formData.name !== selectedPerimeter.name) {
        const isConfirmed = window.confirm(`Renaming "${selectedPerimeter.name}" to "${formData.name}" will delete the existing perimeter and create a new one. Are you sure?`);
        if (!isConfirmed) {
          console.log('Rename canceled by user');
          return;
        }
        await axios.delete(`http://127.0.0.1:8000/api/concessions/${selectedPerimeter.name}/`, {
          headers: { 'X-CSRFToken': getCookie('csrftoken') },
        });
        const newPerimeterData = {
          name: formData.name,
          status: formData.status,
          dept: formData.department !== 'N/A' ? formData.department : null,
          linked_prms: formData.linkedPerimeters ? [formData.linkedPerimeters] : [],
          observation: formData.observation,
          classification: selectedPerimeter.classification || 'Near field mature',
          init_area: selectedPerimeter.init_area || 1000.00,
          distance: selectedPerimeter.distance || 50.00,
          zones_fisc: selectedPerimeter.zones_fisc || 'Zone A',
          coords: selectedPerimeter.coords || null,
          operator: selectedPerimeter.operator || 'Sonatrach',
        };
        console.log('Sending new perimeter data for rename:', newPerimeterData);
        const createResponse = await axios.post('http://127.0.0.1:8000/api/concessions/', newPerimeterData, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
          },
          withCredentials: true,
        });
        const updatedPerimeter = createResponse.data;
        console.log('New perimeter created:', updatedPerimeter);
        setPerimeters(perimeters.map(p => p.name === selectedPerimeter.name ? updatedPerimeter : p));
      } else {
        const updatedData = {
          status: formData.status,
          dept: formData.department !== 'N/A' ? formData.department : null,
          observation: formData.observation,
          linked_prms: formData.linkedPerimeters ? [formData.linkedPerimeters] : [],
        };
        console.log('Sending updated data:', updatedData);
        const response = await axios.put(`http://127.0.0.1:8000/api/concessions/${selectedPerimeter.name}/`, updatedData, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
          },
        });
        const updatedPerimeter = response.data;
        console.log('Updated perimeter response:', updatedPerimeter);
        setPerimeters(perimeters.map((p) => (p.name === selectedPerimeter.name ? updatedPerimeter : p)));
      }
      handleModalClose();
    } catch (error) {
      console.error('Error updating perimeter:', error.response ? error.response.data : error.message);
      alert('Failed to update perimeter: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCloseNewContractModal = () => {
    setIsNewContractModalOpen(false);
    setContractNumber('');
    setSignatureDate('');
    setEffectiveDate('');
    setPhases([{ name: 'Phase 1', duration: '', surface: '' }]);
    setSelectedPerimeterForContract('');
  };

  const handleAddPhase = () => {
    if (phases.length < 3) {
      setPhases([...phases, { name: `Phase ${phases.length + 1}`, duration: '', surface: '' }]);
    } else {
      alert('Maximum of 3 phases allowed.');
    }
  };

  const handleUpdatePhase = (index, field, value) => {
    const updatedPhases = [...phases];
    updatedPhases[index][field] = value;
    setPhases(updatedPhases);
  };

  const handleDeletePhase = (index) => {
    if (index === 0) return;
    if (phases.length > 1) {
      const updatedPhases = phases.filter((_, i) => i !== index);
      setPhases(updatedPhases);
    }
  };

  const handleSaveNewContract = async () => {
    if (!isPLFUser) {
      alert('Only PLF users can create a contract.');
      return;
    }
    try {
      for (const phase of phases) {
        if (!phase.name) {
          throw new Error('Phase name is required.');
        }
        const duration = parseInt(phase.duration);
        const surface = parseFloat(phase.surface);
        if (isNaN(duration) || duration <= 0) {
          throw new Error(`Invalid duration for ${phase.name}: must be a positive integer.`);
        }
        if (isNaN(surface) || surface < 0) {
          throw new Error(`Invalid surface for ${phase.name}: must be a non-negative number.`);
        }
      }
      if (!signatureDate) {
        throw new Error('Signature date is required.');
      }
      if (!effectiveDate) {
        throw new Error('Effective date is required.');
      }
      const contractData = {
        contractNumber: contractNumber,
        sign_date: signatureDate,
        vig_date: effectiveDate,
        prm: selectedPerimeterForContract,
        contract_phs: phases.map((phase) => ({
          name: phase.name,
          duration: parseInt(phase.duration),
          surface: parseFloat(phase.surface),
        })),
      };
      console.log('Sending contract data:', contractData);
      const response = await fetch('http://127.0.0.1:8000/api/contracts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify(contractData),
      });
      const contentType = response.headers.get('content-type');
      const responseBody = await response.text();
      let responseData;
      try {
        responseData = contentType && contentType.includes('application/json') ? JSON.parse(responseBody) : {};
      } catch (e) {
        throw new Error(`Invalid response format: ${responseBody}`);
      }
      console.log('Response status:', response.status);
      console.log('Response data:', responseData);
      if (!response.ok) {
        const errorMessage = responseData.error || responseData.detail || Object.values(responseData).join(', ') || `Failed to create contract: ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const queryParams = new URLSearchParams({
        search: searchTerm,
        dept__asset: filterAsset,
        status: filterStatus,
      }).toString();
      const perimetersResponse = await fetch(`http://127.0.0.1:8000/api/concessions/?${queryParams}`);
      if (!perimetersResponse.ok) {
        throw new Error('Failed to refresh perimeters');
      }
      const updatedPerimeters = await perimetersResponse.json();
      setPerimeters(updatedPerimeters || []);
      const perimetersWithoutContracts = updatedPerimeters.filter(p => !p.contracts || p.contracts.length === 0);
      setAvailablePerimeters(perimetersWithoutContracts);
      handleCloseNewContractModal();
      alert('Contract created successfully!');
    } catch (error) {
      console.error('Error creating contract:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert('Failed to create contract: ' + error.message);
    }
  };

  const handleNewPerimeterChange = (e) => {
    const { name, value } = e.target;
    setNewPerimeterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewPerimeter = async (e) => {
    if (!isPLFUser) {
      alert('Only PLF users can create a perimeter.');
      return;
    }
    e.preventDefault();
    try {
      const newPerimeterDataToSend = {
        name: newPerimeterData.nom_de_perimetre,
        status: newPerimeterData.statut,
        dept: newPerimeterData.department !== 'N/A' ? newPerimeterData.department : null,
        linked_prms: newPerimeterData.perimetre_liee ? [newPerimeterData.perimetre_liee] : [],
        observation: newPerimeterData.observation,
        classification: 'Near field mature',
        init_area: 1000.00,
        distance: 50.00,
        zones_fisc: 'Zone A',
        coords: null,
        operator: 'Sonatrach',
      };
      console.log('Sending new perimeter data:', newPerimeterDataToSend);
      const response = await axios.post('http://127.0.0.1:8000/api/concessions/', newPerimeterDataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        console.log('Perimeter created successfully:', response.data);
        const updatedPerimeters = [...perimeters, response.data];
        setPerimeters(updatedPerimeters);
        const perimetersWithoutContracts = updatedPerimeters.filter(p => !p.contracts || p.contracts.length === 0);
        setAvailablePerimeters(perimetersWithoutContracts);
        handleCloseNewPerimeterModal();
        alert('Perimeter created successfully!');
      } else {
        throw new Error('Failed to create perimeter');
      }
    } catch (error) {
      console.error('Error creating perimeter:', error.response ? error.response.data : error.message);
      alert('Failed to create perimeter: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCloseNewPerimeterModal = () => {
    setIsNewPerimeterModalOpen(false);
    setNewPerimeterData({
      department: '',
      statut: '',
      nom_de_perimetre: '',
      perimetre_liee: '',
      observation: '',
    });
  };

  return (
    <div className="perimeter-list-container">
      <div className="headerr">
        <h1>Portefeuille concessions</h1>
        <div className="header-actions">
          <button className="filter-buttonn">Filtrer</button>
          {isPLFUser && (
            <button onClick={() => setIsNewPerimeterModalOpen(true)} className="new-button">
              Nouveau
            </button>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="table-container">
          <div className="table-header">
            <div className="table-header-actions">
              <input
                type="text"
                placeholder="Rechercher par nom"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={filterAsset}
                onChange={(e) => setFilterAsset(e.target.value)}
              >
                <option value="">Tous</option>
                <option value="ASO">ASO</option>
                <option value="ASE">ASE</option>
                <option value="ASC">ASC</option>
                <option value="ASN">ASN</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Tous Statuts</option>
                <option value="Contrat de recherche">Contrat de recherche</option>
                <option value="ACPO">ACPO</option>
                <option value="ACPN">ACPN</option>
                <option value="Concession Amont">Concession Amont</option>
              </select>
            </div>
          </div>

          <table className="perimeter-table">
            <thead>
              <tr>
                <th>Nom du périmètre</th>
                <th>Validité</th>
                <th>Blocs</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {perimeters.map((perimeter, index) => (
                <tr key={index}>
                  <td>
                    <a onClick={() => handleInitialize(perimeter.name)} className="link">
                      {perimeter.name}
                    </a>
                  </td>
                  <td>{perimeter.validity}</td>
                  <td>{perimeter.blocs}</td>
                  <td className="flex space-x-2">
                  <button
                          onClick={() => handleInitialize(perimeter.name)}
                          className="action-button initialize"
                          title="Initialiser le cadre contractuel"
                        >
                          📄
                        </button>
                    {isPLFUser && (
                      <>
                        
                        <button
                          onClick={() => handleUpdate(perimeter)}
                          className="action-button edit"
                          title="Mise à jour d’un périmètre"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(perimeter.name)}
                          className="action-button delete"
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </>
                    ) }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && isPLFUser && (
        <div className="modal-overlay">
          <div className="modal-contentt">
            <div className="modal-header">
              <h2>Mise à jour d’un périmètre</h2>
              <button onClick={handleModalClose} className="modal-close-button">✕</button>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label>Département</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleFormChange}
                >
                  <option value="N/A">N/A</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="Contrat de recherche">Contrat de recherche</option>
                  <option value="ACPO">ACPO</option>
                  <option value="ACPN">ACPN</option>
                  <option value="Concession Amont">Concession Amont</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nom du périmètre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Périmètres liés</label>
                <select
                  name="linkedPerimeters"
                  value={formData.linkedPerimeters}
                  onChange={handleFormChange}
                >
                  <option value="">Aucun</option>
                  {perimeters
                    .filter((p) => p.name !== formData.name)
                    .map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>Observation</label>
                <textarea
                  name="observation"
                  value={formData.observation}
                  onChange={handleFormChange}
                  rows="2"
                />
              </div>
              <button type="submit" className="submit-button">
                Mettre à jour le périmètre
              </button>
            </form>
          </div>
        </div>
      )}

      {isNewPerimeterModalOpen && isPLFUser && (
        <div className="modal-overlay">
          <div className="modal-contentt">
            <div className="modal-header">
              <h2>Créer un nouveau périmètre</h2>
              <button onClick={handleCloseNewPerimeterModal} className="modal-close-button">✕</button>
            </div>
            <form onSubmit={handleSaveNewPerimeter} className="modal-form">
              <div className="form-group">
                <label>Département</label>
                <select
                  name="department"
                  value={newPerimeterData.department}
                  onChange={handleNewPerimeterChange}
                  required
                >
                  <option value="N/A">N/A</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Statut</label>
                <select
                  name="statut"
                  value={newPerimeterData.statut}
                  onChange={handleNewPerimeterChange}
                  required
                >
                  <option value="">Sélectionner un statut</option>
                  <option value="Contrat de recherche">Contrat de recherche</option>
                  <option value="ACPO">ACPO</option>
                  <option value="ACPN">ACPN</option>
                  <option value="Concession Amont">Concession Amont</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nom du périmètre</label>
                <input
                  type="text"
                  name="nom_de_perimetre"
                  value={newPerimeterData.nom_de_perimetre}
                  onChange={handleNewPerimeterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Périmètre liée</label>
                <select
                  name="perimetre_liee"
                  value={newPerimeterData.perimetre_liee}
                  onChange={handleNewPerimeterChange}
                >
                  <option value="">Aucun</option>
                  {perimeters.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Observation</label>
                <textarea
                  name="observation"
                  value={newPerimeterData.observation}
                  onChange={handleNewPerimeterChange}
                  rows="2"
                />
              </div>
              <button type="submit" className="submit-button">
                Créer le périmètre
              </button>
            </form>
          </div>
        </div>
      )}

      {isNewContractModalOpen && isPLFUser && (
        <div className="modal-overlay">
          <div className="modal-contentt">
            <div className="modal-header">
              <h2>Nouveau cadre contractuel</h2>
              <button onClick={handleCloseNewContractModal} className="modal-close-button">✕</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveNewContract(); }} className="modal-form">
              <div classNum="form-group">
                <label>Numéro du contrat</label>
                <input
                  type="text"
                  value={contractNumber}
                  onChange={(e) => setContractNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date de signature</label>
                <input
                  type="date"
                  value={signatureDate}
                  onChange={(e) => setSignatureDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date d’effet</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Durée du contrat (mois)</label>
                <input
                  type="number"
                  value={calculateContractDuration()}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Périmètre associé</label>
                <select
                  value={selectedPerimeterForContract}
                  onChange={(e) => setSelectedPerimeterForContract(e.target.value)}
                  required
                >
                  <option value="">Sélectionner un périmètre</option>
                  {availablePerimeters.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              {phases.map((phase, index) => (
                <div key={index} className="phase-group">
                  <div className="form-group">
                    <label>Phase {phase.name}</label>
                    <input
                      type="text"
                      value={phase.name}
                      onChange={(e) => handleUpdatePhase(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Durée (mois)</label>
                    <input
                      type="number"
                      value={phase.duration}
                      onChange={(e) => handleUpdatePhase(index, 'duration', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Surface (km²)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={phase.surface}
                      onChange={(e) => handleUpdatePhase(index, 'surface', e.target.value)}
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleDeletePhase(index)}
                      className="delete-phase-button"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddPhase} className="add-phase-button">
                Ajouter une phase
              </button>
              <button type="submit" className="submit-button">
                Créer le contrat
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerimeterList;