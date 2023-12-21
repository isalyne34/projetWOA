import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Accueil from './pages/pageAccueil';
import DescripVoyage from './pages/pageVoyage';
import CreateTrip from './pages/CreateTrip';
import ListeDepenses from './components/Voyage_Depenses';
import Partage from './components/Voyage_Partage';

const router = createBrowserRouter([
   { path: '/', element: <Accueil /> },
   { path: '/signup', element: <SignUp /> },
   { path: '/users', element: <Users /> },
   { path: '/Voyage/:tripid', element: <DescripVoyage /> },
   { path: '/Voyage/:tripid/depense', element: <ListeDepenses/> },
   { path: '/Voyage/:tripid/partage', element: <Partage /> },
   { path: '/trips/create', element: <CreateTrip /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
