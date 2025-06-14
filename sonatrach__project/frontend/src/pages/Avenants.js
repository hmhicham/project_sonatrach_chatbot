// // Configure axios to include CSRF token in requests
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Avenants.css';

// function Avenants() {
//   const [motif, setMotif] = useState('');
//   const [step, setStep] = useState(1);
//   const [perimeter, setPerimeter] = useState('');
//   const [requestNumber, setRequestNumber] = useState('');
//   const [requestDate, setRequestDate] = useState('');
//   const [responseNumber, setResponseNumber] = useState('');
//   const [responseDate, setResponseDate] = useState('');
//   const [status, setStatus] = useState('');
//   const [observation, setObservation] = useState('');
//   const [documentDem, setDocumentDem] = useState(null);
//   const [documentResp, setDocumentResp] = useState(null);
//   const [demFilename, setDemFilename] = useState('');
//   const [respFilename, setRespFilename] = useState('');
//   const [perimeters, setPerimeters] = useState([]);
//   const [phases, setPhases] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [demandes, setDemandes] = useState([]);
//   const [error, setError] = useState(null);
//   const [phase, setPhase] = useState('');
//   const [contract, setContract] = useState('');
//   const [hasTs, setHasTs] = useState('');
//   // const [phaseValue, setPhaseValue] = useState('');
//   const [surfaceRendue, setSurfaceRendue] = useState('');
//   const [motifsOptions, setMotifsOptions] = useState([
//     { value: 'ACP', label: 'Accord de passage de phase' },
//     { value: 'ASL', label: 'Adjonction de surfaces libres' },
//     { value: 'PSD', label: 'Prorogation de surfaces de découvertes' },
//     { value: 'ING', label: 'Integration des niveaux géologiques' },
//     { value: 'EPP', label: 'Extension de la période de prorogation' },
//     { value: 'ISDL', label: 'Intégration de surfaces de découvertes libres' },
//     { value: 'RPTAP', label: "Travaux d'engagement par anticipation" },
//     { value: 'EPC', label: 'Extension de la période contractuelle' },
//     { value: 'CACRC', label: 'Nouveau contrat R&E ou concession Amont' },
//   ]);

//   // Fetch data on component mount
//   useEffect(() => {
//     axios
//       .get('/api/concessions/')
//       .then((response) => {
//         console.log('Perimeters response:', response.data);
//         const fetchedPerimeters = response.data.map((item) => item.name);
//         console.log('Mapped perimeters:', fetchedPerimeters);
//         setPerimeters(fetchedPerimeters);
//         if (fetchedPerimeters.length > 0) {
//           setPerimeter(fetchedPerimeters[0]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching perimeters:', error.message);
//         console.error('Error response:', error.response);
//         setError('Failed to load perimeters. Please check the console for details.');
//       });

//     axios
//       .get('/api/phases/')
//       .then((response) => {
//         console.log('Phases response:', response.data);
//         setPhases(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching phases:', error.message);
//         setError('Failed to load phases');
//       });

//     axios
//       .get('/api/contracts/')
//       .then((response) => {
//         console.log('Contracts response:', response.data);
//         setContracts(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching contracts:', error.message);
//         setError('Failed to load contracts');
//       });

//     axios
//       .get('/api/demandes/')
//       .then((response) => {
//         console.log('Demandes response:', response.data);
//         setDemandes(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching demandes:', error.message);
//         setError('Failed to load demandes');
//       });
//   }, []);

  

//   const handleNext = () => {
//     if (step === 1 && !perimeter) {
//       setError('Please select a perimeter');
//       return;
//     }
//     if (step === 2 && (!motif || !requestNumber || !requestDate || !documentDem || !demFilename || (motif === 'ACP' && !phase))) {
//       setError('Please fill all required fields, including the demand document.');
//       return;
//     }
//     if (step < 3) setStep(step + 1);
//     setError(null);
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//     setError(null);
//   };

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result.split(',')[1]; // Remove "data:application/pdf;base64," prefix
//         if (type === 'dem') {
//           setDocumentDem(base64String);
//           setDemFilename(file.name);
//         } else {
//           setDocumentResp(base64String);
//           setRespFilename(file.name);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!motif || !requestNumber || !requestDate || !documentDem || !demFilename || motif === 'ACP' && (!phase || !surfaceRendue)) {
//       setError('Please fill all required fields, including the demand document.');
//       return;
//     }

//     console.log('Phase value:', phase);
//     console.log('Contract value:', contract);
  

//     const formData = {
//       numeroDemande: requestNumber,
//       type: motif === 'CACRC'? 'Av' : 'D', // 'Av' or 'D'
//       has_ts: hasTs === 'true' || hasTs === true,  // Convert to boolean
//       accord: status === 'Approuvé' ? true : false,
//       dateDemande: requestDate,
//       dem_filename: demFilename,
//       document_dem: documentDem,
//       reponse: responseNumber || null,
//       dateReponse: responseDate || null,
//       resp_filename: respFilename || null,
//       document_resp: documentResp || null,
//       motif: motif ,
//       phase: motif === "ACP" ? phase : null,
//       ctr: contract || null,
//       observation: observation || null,
//       surface_rendue: motif === 'ACP' ? parseFloat(surfaceRendue) : null, // Include surface rendue
//     };

//     console.log("motif value:", motif, "phase value:", phase);
//     console.log('Form data:', JSON.stringify(formData, null, 2));

//     try {
//       const response = await axios.post('/api/demandes/create/', formData);
//       console.log('Demande created:', response.data);
//       setStep(1);
//       setMotif('');
//       setPerimeter(perimeters[0] || '');
//       setRequestNumber('');
//       setRequestDate('');
//       setResponseNumber('');
//       setResponseDate('');
//       setStatus('');
//       setObservation('');
//       setDocumentDem(null);
//       setDocumentResp(null);
//       setDemFilename('');
//       setRespFilename('');
//       setPhase('');
//       setContract('');
//       setSurfaceRendue(''); // Reset surface rendue
//       setError(null);
//       alert('Demande submitted successfully!');
//       const demandesResponse = await axios.get('/api/demandes/');
//       setDemandes(demandesResponse.data);
//     } catch (error) {
//       console.error('Error submitting demande:', error);
//       console.error('Full error response:', JSON.stringify(error.response?.data, null, 2));
//       setError(
//         error.response?.data
//           ? JSON.stringify(error.response.data, null, 2)
//           : 'Failed to submit demande. Check console for details.'
//       );
//     }
//   };

//   return (
//     <div className="requests-container">
//       <div className="header">
//         <h1>Avenants et demandes</h1>
//         <button className="addd-button">Ajouter une nouvelle demande</button>
//       </div>

//       {error && <div className="error-message">{error}</div>}

//       <div className="demandes-table">
//         <h2>Liste des demandes</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Numéro</th>
//               <th>Type</th>
//               <th>Motif</th>
//               <th>Date d’envoi</th>
//               <th>Statut</th>
//             </tr>
//           </thead>
//           <tbody>
//             {demandes.map((demande) => (
//               <tr key={demande.num}>
//                 <td>{demande.numeroDemande}</td>
//                 <td>{demande.type === 'Av' ? 'Avenant' : 'Demande'}</td>
//                 <td>{demande.motif}</td>
//                 <td>{demande.dateDemande}</td>
//                 <td>{demande.accord ? 'Approuvé' : 'Non approuvé'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="stepper">
//         <div className="step">
//           <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
//           <span className="step-label">Périmètre</span>
//         </div>
//         <div className={`step-connector ${step >= 2 ? 'active' : ''}`} />
//         <div className="step">
//           <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
//           <span className="step-label">Demande</span>
//         </div>
//         <div className={`step-connector ${step >= 3 ? 'active' : ''}`} />
//         <div className="step">
//           <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
//           <span className="step-label">Réponse</span>
//         </div>
//       </div>

//       <div className="form-container">
//         {step === 1 && (
//           <div>
//             <h2>Périmètre</h2>
//             <div>Perimeters state: {JSON.stringify(perimeters)}</div>
//             <div className="form-group">
//               <label>Périmètre</label>
//               <select value={perimeter} onChange={(e) => setPerimeter(e.target.value)}>
//                 <option value="">Sélectionner un périmètre</option>
//                 {perimeters.map((p, index) => (
//                   <option key={index} value={p}>
//                     {p}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <h2>Demande</h2>
//             <div className="form-group">
//               <label>Motif</label>
//               <select value={motif} onChange={(e) => setMotif(e.target.value)}>
//                 <option value="">Sélectionner un motif</option>
//                 {motifsOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Numéro de la demande</label>
//               <input
//                 type="text"
//                 value={requestNumber}
//                 onChange={(e) => setRequestNumber(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Date d’envoi de la demande</label>
//               <input
//                 type="date"
//                 value={requestDate}
//                 onChange={(e) => setRequestDate(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Document de la demande (requis)</label>
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, 'dem')}
//                 accept=".pdf,.doc,.docx"
//               />
//             </div>
//              <div className="form-group">
//       <label>
//         Inclut des Travaux Supplémentaires (TS)
//         <input
//           type="checkbox"
//           checked={hasTs}
//           onChange={(e) => setHasTs(e.target.checked)}
//         />
//       </label>
//     </div>
//             {motif === 'ACP' && (
//               <div>
//               <div className="form-group">
//                 <label>Phase (pour ACP)</label>
//                 <select value={phase} onChange={(e) => setPhase(e.target.value)}>
//                   <option value="">Sélectionner une phase</option>
//                   {phases.map((p) => (
//                     <option key={p.id} value={p.id}>
//                       {p.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="form-group">
//               <label>Surface rendue (en m²)</label>
//               <input
//                 type="number"
//                 value={surfaceRendue}
//                 onChange={(e) => setSurfaceRendue(e.target.value)}
//                 placeholder="Entrez la surface rendue"
//               />
//             </div>
//           </div>
              
              
//             )}
//             <div className="form-group">
//               <label>Contrat</label>
//               <select value={contract} onChange={(e) => setContract(e.target.value)}>
//                 <option value="">Sélectionner un contrat</option>
//                 {contracts.map((c) => (
//                   <option key={c.num} value={c.num}>
//                     {c.num}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div>
//             <h2>Réponse</h2>
//             <div className="form-group">
//               <label>Numéro de la réponse</label>
//               <input
//                 type="text"
//                 value={responseNumber}
//                 onChange={(e) => setResponseNumber(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Date de la réponse d’ALNAFT</label>
//               <input
//                 type="date"
//                 value={responseDate}
//                 onChange={(e) => setResponseDate(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Document de la réponse</label>
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, 'resp')}
//                 accept=".pdf,.doc,.docx"
//               />
//             </div>
//             <div className="form-group">
//               <label>Statut ALNAFT</label>
//               <select value={status} onChange={(e) => setStatus(e.target.value)}>
//                 <option value="">Sélectionner un statut</option>
//                 <option value="Approuvé">Approuvé</option>
//                 <option value="Rejeté">Rejeté</option>
//                 <option value="En attente">En attente</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Observation</label>
//               <textarea
//                 value={observation}
//                 onChange={(e) => setObservation(e.target.value)}
//                 rows="4"
//               />
//             </div>
//           </div>
//         )}

//         <div className="navigation-buttons">
//           <button onClick={handleBack} disabled={step === 1}>
//             Retour
//           </button>
//           {step < 3 ? (
//             <button onClick={handleNext}>Suivant</button>
//           ) : (
//             <button onClick={handleSubmit}>Soumettre</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Avenants;




/// src/components/Avenants.js

import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { FiDownload } from 'react-icons/fi'; // Import the download icon

import { Buffer } from 'buffer';

import './Avenants.css';



function Avenants() {

  const [demandes, setDemandes] = useState([]);

  const [error, setError] = useState(null);

  

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const navigate = useNavigate();

  const [isPLFUser, setIsPLFUser] = useState(false);



  // Fetch demandes on component mount

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

    checkAuthStatus();

    axios

      .get('/api/demandes/')

      .then((response) => {

        console.log('Demandes response:', response.data);

        setDemandes(response.data);

      })

      .catch((error) => {

        console.error('Error fetching demandes:', error.message);

        setError('Failed to load demandes');

      });

  }, []);



  // Function to download a file (demand or response)

  const handleDownload = (document, filename) => {

    if (typeof document !== 'undefined') {

      console.log('Downloading document:', document, 'with filename:', filename);

      try {

        const blob = new Blob([Buffer.from(document, 'base64')], { type: 'application/pdf' });

        const link = window.URL.createObjectURL(blob);

        if (typeof window.document.createElement === 'function') {

          const a = window.document.createElement('a'); // Use global document

          a.href = link;

          a.download = filename || 'document.pdf';

          window.document.body.appendChild(a);

          a.click();

          window.document.body.removeChild(a);

          window.URL.revokeObjectURL(link);

        } else {

          console.error('document.createElement is not a function');

        }

      } catch (error) {

        console.error('Download error:', error);

        setError('Failed to download document. Check console for details.');

      }

    } else {

      console.warn('No document available for download');

    }

  };



    // Pagination logic

    const totalPages = Math.ceil(demandes.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentDemandes = demandes.slice(indexOfFirstItem, indexOfLastItem);

  

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (

    <div className="requests-container">

      <div className="header">

        <h1>Avenants et demandes</h1>
{isPLFUser && (
        <button className="addd-button" onClick={() => navigate('/avenants/new')}>

          Ajouter une nouvelle demande

        </button>
)}

      </div>



      {error && <div className="error-message">{error}</div>}



      <div className="demandes-table">

        <h2>Liste des demandes</h2>

        <table>

          <thead>

            <tr>

              <th>Numéro</th>

              <th>Type</th>

              <th>Motif</th>

              <th>Date d’envoi</th>

              <th>Statut</th>

              <th>Document Demande</th>

              <th>Document Réponse</th>

            </tr>

          </thead>

          <tbody>

            {currentDemandes.map((demande) => (

              <tr key={demande.num || demande.numeroDemande}>

                <td>{demande.numeroDemande}</td>

                <td>{demande.type === 'Av' ? 'Avenant' : 'Demande'}</td>

                <td>{demande.motif}</td>

                <td>{demande.dateDemande}</td>

                <td>{demande.accord ? 'Approuvé' : 'Non approuvé'}</td>

                <td>

                  {demande.document_dem && demande.dem_filename ? (

                    <FiDownload

                      className="download-icon"

                      onClick={() => handleDownload(demande.document_dem, demande.dem_filename)}

                      title="Télécharger Document Demande"

                    />

                  ) : (

                    'N/A'

                  )}

                </td>

                <td>

                  {demande.document_resp && demande.resp_filename ? (

                    <FiDownload

                      className="download-icon"

                      onClick={() => handleDownload(demande.document_resp, demande.resp_filename)}

                      title="Télécharger Document Réponse"

                    />

                  ) : (

                    'N/A'

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="pagination">
          <span>Lignes par page: {itemsPerPage}</span>
          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Précédent
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avenants;