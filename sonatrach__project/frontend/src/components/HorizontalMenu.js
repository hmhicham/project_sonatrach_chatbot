// import React from 'react';
// import { NavLink } from "react-router-dom";

// function HorizontalMenu() {
//   return (
//     <div className="bg-gray-200 px-4 py-2 flex space-x-4">
//       <NavLink to="/" className="hover:text-orange-500">Accueil</NavLink>
//       <NavLink to="/perimetres" className="hover:text-orange-500">Périmètres</NavLink>
//       <NavLink to="/planning" className="hover:text-orange-500">Planning</NavLink>
//       <NavLink to="/programmes" className="hover:text-orange-500">Programmes</NavLink>
//       <NavLink to="/surfaces" className="hover:text-orange-500">Surfaces</NavLink>
//       <NavLink to="/avenants" className="hover:text-orange-500">Avenants & Demandes</NavLink>
//     </div>
//   );
// }
// export default HorizontalMenu;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HorizontalMenu.css';

function HorizontalMenu() {
  const [isDesUser, setIsDesUser] = useState(false);

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

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth-status/', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.is_authenticated) {
        setIsDesUser(data.groups && data.groups.includes('des'));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <div className="horizontal-menu">
      <Link to="/" className="menu-item">Accueil</Link>
      <Link to="/PerimetreList" className="menu-item">Périmètres</Link>
      <div className="dropdownn">
        <button className="menu-item">Planning</button>
        <div className="dropdown-content">
          <Link to="/planning/P_sismiques" className="dropdown-itemm">Planing sismique mensuel</Link>
          <Link to="/planning/P_forage" className="dropdown-itemm">Planing Forage mensuel</Link>
          <Link to="/planning/P_pmt" className="dropdown-itemm">PMT</Link>
        </div>
      </div>
      <div className="dropdownn">
        <button className="menu-item">Programmes</button>
        <div className="dropdown-content">
          <Link to="/programs/P_sismiques" className="dropdown-itemm">Programmes sismiques</Link>
          <Link to="/programs/P_puits" className="dropdown-itemm">Programmes puits</Link>
          <Link to="/programs/P_Etude_GG" className="dropdown-itemm">Programmes Etude G&G</Link>
          <Link to="/programs/P_F_Hydraulique" className="dropdown-itemm">Programmes Facturation Hydraulique</Link>
        </div>
      </div>
      <Link to="/surfaces" className="menu-item">{isDesUser ? 'Reservoir' : 'Surfaces'}</Link>
      <Link to="/Avenants" className="menu-item">Avenants & Demandes</Link>
      <Link to="/perimeter-reservation" className="menu-item">Record Reservoir Estimate</Link>
    </div>
  );
}
export default HorizontalMenu;