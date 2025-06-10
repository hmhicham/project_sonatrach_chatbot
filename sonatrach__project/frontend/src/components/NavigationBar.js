// // import React from 'react';
// // function NavigationBar() {
// //     return (
// //       <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
// //         <div className="font-bold text-xl">Sonatrach</div>
// //         <div className="space-x-4">
// //           <span>🔔 Notifications</span>
// //           <span>👤 Profil</span>
// //         </div>
// //       </div>
// //     );
// //   }
// // export default NavigationBar;

// // import React from 'react';
// // import './navbar.css';
// // import { useNavigate } from 'react-router-dom'; // Si tu utilises react-router

// // function Navbar() {
// //   const navigate = useNavigate(); // Pour la navigation avec react-router

// //   const goToDashboard = () => {
// //     navigate('/dashboard'); // Change le chemin selon ta route
// //   };

// //   return (
// //     <div className="navbar">
// //       <div className="logo">
// //         <h2>Sonatrach</h2>
// //       </div>

// //       <div className="navbar-right">
// //         <button className="dashboard-button" onClick={goToDashboard}>
// //           🧭 Dashboard
// //         </button>

// //         {/* <div className="notifications">
// //           <span>🔔 Notifications (3)</span>
// //           <div className="notification-dropdown">
// //             <div className="notification-item">
// //               <span>Notification 1</span>
// //               <span>2023-04-05</span>
// //             </div>
// //             <div className="notification-item">
// //               <span>Notification 2</span>
// //               <span>2023-04-05</span>
// //             </div>
// //             <div className="notification-item">
// //               <span>Notification 3</span>
// //               <span>2023-04-05</span>
// //             </div>
// //           </div>
// //         </div> */}

// //         {/* <div className="profile">
// //           <span>👤 Profil</span>
// //           <div className="profile-dropdown">
// //             <div className="profile-item">
// //               <span>Profil</span>
// //             </div>
// //             <div className="profile-item">
// //               <span>Déconnexion</span>
// //             </div>
// //           </div>
// //         </div> */}

// // <button className="icon-button">
// //     <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
// //     </svg>
// //   </button>
// //   <div className="user-avatar">A</div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Navbar;



// // -------------------------- old ------------------


// // import React, { useState } from 'react';
// // import './navbar.css';
// // import { useNavigate } from 'react-router-dom';

// // function Navbar() {
// //   const navigate = useNavigate();

// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [showProfile, setShowProfile] = useState(false);

// //   const toggleNotifications = () => {
// //     setShowNotifications(!showNotifications);
// //     setShowProfile(false); // Close profile if open
// //   };

// //   const toggleProfile = () => {
// //     setShowProfile(!showProfile);
// //     setShowNotifications(false); // Close notifications if open
// //   };

// //   return (
// //     <div className="navbar">
// //       <div className="logo">
// //       {/* <img src="//logotyp.us/file/sonatrach.svg" alt="Sonatrach"/><a href="//logotyp.us/logo/sonatrach">Sonatrach logo</a> */}
// //         <h2>Portefeuille Exploration</h2>
// //       </div>

// //       <div className="navbar-right">
// //         <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
// //           🧭 Dashboard
// //         </button>

// //         <div className="icon-wrapper">
// //           <button className="icon-button" onClick={toggleNotifications}>
// //             <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
// //               />
// //             </svg>
// //           </button>
// //           {showNotifications && (
// //             <div className="dropdown">
// //               <div className="dropdown-item">Notification 1 — 2023-04-05</div>
// //               <div className="dropdown-item">Notification 2 — 2023-04-05</div>
// //               <div className="dropdown-item">Notification 3 — 2023-04-05</div>
// //             </div>
// //           )}
// //         </div>

// //         <div className="icon-wrapper">
// //           <div className="user-avatar" onClick={toggleProfile}>A</div>
// //           {showProfile && (
// //             <div className="dropdown">
// //               <div className="dropdown-item">Profil</div>
// //               <div className="dropdown-item">Déconnexion</div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Navbar;

// // -------------------------- V5 ------------------


// import React, { useState, useEffect } from 'react';
// import './navbar.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Navbar() {
//   const navigate = useNavigate();
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState(null);

//   const handleLogout = () => {
//     fetch('http://127.0.0.1:8000/logout/', {
//       method: 'GET',
//       credentials: 'include',
//     })
//       .then(() => {
//         window.location.href = 'http://127.0.0.1:8000/login/';
//       })
//       .catch(error => {
//         console.error('Error logging out:', error);
//       });
//   };

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setNotifications(response.data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//       setError(err.message);
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.patch(
//         `http://127.0.0.1:8000/api/notifications/${notificationId}/`,
//         { read: true },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setNotifications(
//         notifications.map((notification) =>
//           notification.id === notificationId
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//     } catch (err) {
//       console.error('Error marking notification as read:', err);
//       setError('Failed to mark notification as read');
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//     setShowProfile(false);
//   };

//   const toggleProfile = () => {
//     setShowProfile(!showProfile);
//     setShowNotifications(false);
//   };

//   const goToHistorique = () => {
//     setShowProfile(false); // Close the dropdown
//     navigate('/historique'); // Navigate to the Historique page
//   };

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <h2>Portefeuille Exploration</h2>
//       </div>

//       <div className="navbar-right">
//         <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
//           🧭 Dashboard
//         </button>

//         <div className="icon-wrapper">
//           <button className="icon-button" onClick={toggleNotifications}>
//             <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//               />
//             </svg>
//             {unreadCount > 0 && (
//               <span className="notification-badge">{unreadCount}</span>
//             )}
//           </button>
//           {showNotifications && (
//             <div className="dropdown">
//               {error ? (
//                 <div className="dropdown-item error">Error: {error}</div>
//               ) : notifications.length === 0 ? (
//                 <div className="dropdown-item">No notifications</div>
//               ) : (
//                 notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`dropdown-item ${notification.read ? 'read' : 'unread'}`}
//                   >
//                     <span>{notification.msg}</span>
//                     <span>{new Date(notification.date).toLocaleDateString()}</span>
//                     {!notification.read && (
//                       <button
//                         className="mark-read-button"
//                         onClick={() => markAsRead(notification.id)}
//                       >
//                         Mark as Read
//                       </button>
//                     )}
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>

//         <div className="icon-wrapper">
//           <div className="user-avatar" onClick={toggleProfile}>
//             A
//           </div>
//           {showProfile && (
//             <div className="dropdown">
//               <div className="dropdown-item" onClick={() => navigate('/profile')}>

// Profil

// </div>

// <div className="dropdown-item" onClick={goToHistorique}>

// Historique

// </div>

// <div className="dropdown-item" onClick={handleLogout}>

// Déconnexion

// </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;



// ---------------------------- plf ----------------------------

// import React, { useState, useEffect } from 'react';

// import './navbar.css';

// import { useNavigate } from 'react-router-dom';

// import axios from 'axios';



// function Navbar() {

//   const navigate = useNavigate();

//   const [showNotifications, setShowNotifications] = useState(false);

//   const [showProfile, setShowProfile] = useState(false);

//   const [notifications, setNotifications] = useState([]);

//   const [error, setError] = useState(null);



//   const getCsrfToken = () => {

//     const name = 'csrftoken=';

//     const decodedCookie = decodeURIComponent(document.cookie);

//     const ca = decodedCookie.split(';');

//     for (let i = 0; i < ca.length; i++) {

//       let c = ca[i].trim();

//       if (c.indexOf(name) === 0) return c.substring(name.length, c.length);

//     }

//     return '';

//   };



//   // Set Axios defaults for session-based authentication

//   axios.defaults.withCredentials = true;

//   axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();



//   const handleLogout = () => {

//     fetch('http://127.0.0.1:8000/logout/', {

//       method: 'GET',

//       credentials: 'include',

//     })

//       .then(() => {

//         window.location.href = 'http://127.0.0.1:8000/login/';

//       })

//       .catch(error => {

//         console.error('Error logging out:', error);

//       });

//   };



//   const fetchNotifications = async () => {

//     try {

//       const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {

//         withCredentials: true,

//       });

//       setNotifications(response.data);

//       setError(null);

//     } catch (err) {

//       console.error('Error fetching notifications:', err);

//       setError(err.message);

//       if (err.response?.status === 401 || err.response?.status === 403) {

//         window.location.href = 'http://127.0.0.1:8000/login/';

//       }

//     }

//   };



//   const markAsRead = async (notificationId) => {

//     try {

//       await axios.patch(

//         `http://127.0.0.1:8000/api/notifications/${notificationId}/`,

//         { read: true },

//         {

//           withCredentials: true,

//           headers: {

//             'X-CSRFToken': getCsrfToken(),

//           },

//         }

//       );

//       setNotifications(

//         notifications.map((notification) =>

//           notification.id === notificationId

//             ? { ...notification, read: true }

//             : notification

//         )

//       );

//     } catch (err) {

//       console.error('Error marking notification as read:', err);

//       setError('Failed to mark notification as read');

//     }

//   };



//   useEffect(() => {

//     fetchNotifications();

//     const interval = setInterval(fetchNotifications, 30000);

//     return () => clearInterval(interval);

//   }, []);



//   const unreadCount = notifications.filter((n) => !n.read).length;



//   const toggleNotifications = () => {

//     setShowNotifications(!showNotifications);

//     setShowProfile(false);

//   };



//   const toggleProfile = () => {

//     setShowProfile(!showProfile);

//     setShowNotifications(false);

//   };



//   const goToHistorique = () => {
//     console.log('Navigating to /historique');
//     setShowProfile(false);

//     navigate('/historique');

//   };



//   return (

//     <div className="navbar">

//       <div className="logo">

//         <h2>Portefeuille Exploration</h2>

//       </div>



//       <div className="navbar-right">

//         <button className="dashboard-button" onClick={() => navigate('/dashboard')}>

//           🧭 Dashboard

//         </button>



//         <div className="icon-wrapper">

//           <button className="icon-button" onClick={toggleNotifications}>

//             <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">

//               <path

//                 strokeLinecap="round"

//                 strokeLinejoin="round"

//                 strokeWidth="2"

//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"

//               />

//             </svg>

//             {unreadCount > 0 && (

//               <span className="notification-badge">{unreadCount}</span>

//             )}

//           </button>

//           {showNotifications && (

//             <div className="dropdown">

//               {error ? (

//                 <div className="dropdown-item error">Error: {error}</div>

//               ) : notifications.length === 0 ? (

//                 <div className="dropdown-item">No notifications</div>

//               ) : (

//                 notifications.map((notification) => (

//                   <div

//                     key={notification.id}

//                     className={`dropdown-item ${notification.read ? 'read' : 'unread'}`}

//                   >

//                     <span>{notification.msg}</span>

//                     <span>{new Date(notification.date).toLocaleDateString()}</span>

//                     {!notification.read && (

//                       <button

//                         className="mark-read-button"

//                         onClick={() => markAsRead(notification.id)}

//                       >

//                         Mark as Read

//                       </button>

//                     )}

//                   </div>

//                 ))

//               )}

//             </div>

//           )}

//         </div>



//         <div className="icon-wrapper">

//           <div className="user-avatar" onClick={toggleProfile}>

//             A

//           </div>

//           {showProfile && (

//             <div className="dropdown">

//               <div className="dropdown-item" onClick={() => navigate('/profile')}>

//                 Profil

//               </div>

//               <div className="dropdown-item" onClick={goToHistorique}>

//                 Historique

//               </div>

//               <div className="dropdown-item" onClick={handleLogout}>

//                 Déconnexion

//               </div>

//             </div>

//           )}

//         </div>

//       </div>

//     </div>

//   );

// }



// export default Navbar;


// ----------------------------- plf -------------------



import React, { useState, useEffect } from 'react';

import './navbar.css';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';



function Navbar() {

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [error, setError] = useState(null);
  const [isPLFUser, setIsPLFUser] = useState(false); // Track PLF role
  const [userRoles, setUserRoles] = useState([]); // Store array of user roles

  const isDashboardVisible = () => {
    return ['manager', 'des', 'asset'].some(role => userRoles.includes(role));
  };



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



  // Set Axios defaults for session-based authentication

  axios.defaults.withCredentials = true;

  axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();



  const handleLogout = () => {

    fetch('http://127.0.0.1:8000/logout/', {

      method: 'GET',

      credentials: 'include',

    })

      .then(() => {

        window.location.href = 'http://127.0.0.1:8000/login/';

      })

      .catch(error => {

        console.error('Error logging out:', error);

      });

  };



  const fetchNotifications = async () => {

    try {

      const response = await axios.get('http://127.0.0.1:8000/api/notifications/', {

        withCredentials: true,

      });

      setNotifications(response.data);

      setError(null);

    } catch (err) {

      console.error('Error fetching notifications:', err);

      setError(err.message);

      if (err.response?.status === 401 || err.response?.status === 403) {

        window.location.href = 'http://127.0.0.1:8000/login/';

      }

    }

  };



  const markAsRead = async (notificationId) => {

    try {

      await axios.patch(

        `http://127.0.0.1:8000/api/notifications/${notificationId}/`,

        { read: true },

        {

          withCredentials: true,

          headers: {

            'X-CSRFToken': getCsrfToken(),

          },

        }

      );

      setNotifications(

        notifications.map((notification) =>

          notification.id === notificationId

            ? { ...notification, read: true }

            : notification

        )

      );

    } catch (err) {

      console.error('Error marking notification as read:', err);

      setError('Failed to mark notification as read');

    }

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
        setUserRoles(data.groups); // Store all user roles
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);

  }, []);



  const unreadCount = notifications.filter((n) => !n.read).length;



  const toggleNotifications = () => {

    setShowNotifications(!showNotifications);

    setShowProfile(false);

  };



  const toggleProfile = () => {

    setShowProfile(!showProfile);

    setShowNotifications(false);

  };



  const goToHistorique = () => {
    console.log('Navigating to /historique');
    setShowProfile(false);

    navigate('/historique');

  };



  return (

    <div className="navbar">

      <div className="logo">

        <h2>Portefeuille Exploration</h2>

      </div>



      <div className="navbar-right">
      {isDashboardVisible() && (
          <button className="dashboard-button" onClick={() => navigate('/dashboard')}>
            🧭 Dashboard
          </button>
)}



        <div className="icon-wrapper">

          <button className="icon-button" onClick={toggleNotifications}>

            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <path

                strokeLinecap="round"

                strokeLinejoin="round"

                strokeWidth="2"

                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"

              />

            </svg>

            {unreadCount > 0 && (

              <span className="notification-badge">{unreadCount}</span>

            )}

          </button>

          {showNotifications && (

            <div className="dropdown">

              {error ? (

                <div className="dropdown-item error">Error: {error}</div>

              ) : notifications.length === 0 ? (

                <div className="dropdown-item">No notifications</div>

              ) : (

                notifications.map((notification) => (

                  <div

                    key={notification.id}

                    className={`dropdown-item ${notification.read ? 'read' : 'unread'}`}

                  >

                    <span>{notification.msg}</span>

                    <span>{new Date(notification.date).toLocaleDateString()}</span>

                    {!notification.read && (

                      <button

                        className="mark-read-button"

                        onClick={() => markAsRead(notification.id)}

                      >

                        Mark as Read

                      </button>

                    )}

                  </div>

                ))

              )}

            </div>

          )}

        </div>



        <div className="icon-wrapper">

          <div className="user-avatar" onClick={toggleProfile}>

            A

          </div>

          {showProfile && (

            <div className="dropdown">

              <div className="dropdown-item" onClick={() => navigate('/profile')}>

                Profil

              </div>

              <div className="dropdown-item" onClick={goToHistorique}>

                Historique

              </div>

              <div className="dropdown-item" onClick={handleLogout}>

                Déconnexion

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}



export default Navbar;