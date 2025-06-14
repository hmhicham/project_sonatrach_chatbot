// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import  NavigationBar  from "./NavigationBar";
// import  HorizontalMenu  from "./HorizontalMenu";
// import  ToolPaletteSearch  from "./ToolPaletteSearch";
// import  ToolPaletteMap  from "./ToolPaletteMap";
// import { Accueil } from "../pages/Accueil";
// import { Perimetres } from "../pages/Perimetres";
// import { Planning } from "../pages/Planning";
// import { Programmes } from "../pages/Programmes";
// import { Surfaces } from "../pages/Surfaces";
// import { Avenants } from "../pages/Avenants";

// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-white text-black">
//         <NavigationBar />
//         <HorizontalMenu />
//         <div className="grid grid-cols-4 gap-4 p-4">
//           <div className="col-span-1">
//             <ToolPaletteSearch />
//           </div>
//           <div className="col-span-3">
//             <main>
//             <Routes>
//               <Route path="/" element={<Accueil />} />
//               <Route path="/perimetres" element={<Perimetres />} />
//               <Route path="/planning" element={<Planning />} />
//               <Route path="/programmes" element={<Programmes />} />
//               <Route path="/surfaces" element={<Surfaces />} />
//               <Route path="/avenants" element={<Avenants />} />
//             </Routes>
//             </main>
//             <ToolPaletteMap />
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Navbar from './NavigationBar';
// import HorizontalMenu from './HorizontalMenu';
// import  Home  from '../pages/home';
// import  Perimetres from '../pages/Perimetres';
// // import Planning from '../pages/Planning';
// // import Programs from '../pages/Programs';
// import Surfaces from '../pages/Surfaces';
// import Avenants from '../pages/Avenants';
// import PerimeterList from '../pages/PerimeterList';
// import Dashboard from '../pages/Dashboard';
// import Programmes from '../pages/Programmes';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
        
//         <Navbar />
//         <HorizontalMenu />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/PerimetreList" element={<PerimeterList />} />
//           <Route path="/Perimetres/:name" element={<Perimetres />} />
//           <Route path="/Surfaces" element={<Surfaces />} />
//           <Route path="/Avenants" element={<Avenants />} />
//           <Route path="/Dashboard" element={<Dashboard />} />
//           <Route path="/programs/P_sismiques" element={<Programmes initialTab="ASO" />} />
//           <Route path="/programs/P_puits" element={<Programmes initialTab="ASE" />} />
//           <Route path="/programs/P_Etude_GG" element={<Programmes initialTab="ASC" />} />
//           <Route path="/programs/P_F_Hydraulique" element={<Programmes initialTab="ASN" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// ________tets v __________



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HorizontalMenu from './HorizontalMenu';
import Home from '../pages/home';
import Perimetres from '../pages/Perimetres';
import Surfaces from '../pages/Surfaces';
import Avenants from '../pages/Avenants';
import PerimeterList from '../pages/PerimeterList';
import Dashboard from '../pages/Dashboard';
import ProgrammeSismique from '../pages/ProgrammeSismique';
import ProgrammePuits from '../pages/ProgrammePuits';
import ProgrammeEtudes from '../pages/ProgrammeEtudes';
import ProgrammeFracturation from '../pages/ProgrammeFracturation';
import PolygonDetails from '../pages/PolygonDetails';
import AvenantForm from '../pages/AvenantForm';
import PlanningSismique from '../pages/PlanningSismique';
import PlanningForage from '../pages/PlanningForage';
import PlanningPMT from '../pages/PlanningPMT';
import Historique from '../pages/Historique';
import PerimeterReservation from '../pages/PerimeterReservation';
// import Profile from '../pages/Profile';
import './App.css';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import '@geoman-io/leaflet-geoman-free';  // Remove the 'leaflet-geoman-free' import and use this instead
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [username, setUsername] = useState('');
  const [isManager, setIsManager] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000';
    fetch(`${apiUrl}/api/auth-status/`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setIsAuthenticated(data.is_authenticated);
        if (data.is_authenticated) {
          setUsername(data.username);
          setIsManager(data.is_manager || false);
        } else {
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to Django login on error
      });
  }, [navigate]);

  // Show a loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Redirect to Django login if not authenticated
  if (!isAuthenticated) {
    window.location.href = 'http://127.0.0.1:8000/login/';
    return null; // Prevent rendering anything until redirect completes
  }

  return (
    <div className="App">
      <NavigationBar />
      <HorizontalMenu />
      <Routes>
        <Route path="/" element={<Home username={username} isManager={isManager} />} />
        <Route path="/PerimetreList" element={<PerimeterList />} />
        <Route path="/Avenants/new" element={<AvenantForm />} />
        <Route path="/Perimetres/:name" element={<Perimetres />} />
        <Route path="/Surfaces" element={<Surfaces />} />
        <Route path="/Avenants" element={<Avenants />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/programs/P_sismiques" element={<ProgrammeSismique />} />
        <Route path="/programs/P_puits" element={<ProgrammePuits />} />
        <Route path="/programs/P_Etude_GG" element={<ProgrammeEtudes />} />
        <Route path="/programs/P_F_Hydraulique" element={<ProgrammeFracturation />} />
        {/* <Route path="/polygon/:id" element={<PolygonDetails />} /> */}
        <Route path="/map/polygon-details/:id" element={<PolygonDetails />} />
        <Route path="/planning/P_sismiques" element={<PlanningSismique />} />
        <Route path="/planning/P_forage" element={<PlanningForage />} />
        <Route path="/planning/P_pmt" element={<PlanningPMT />} />
        {/* <Route path="/planning" element={<PlanningSismique />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/historique" element={<Historique username={username} isManager={isManager} />} />
        <Route path="/perimeter-reservation" element={<PerimeterReservation />} />
        <Route path="/polygon-details/:id" element={<PolygonDetails />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;