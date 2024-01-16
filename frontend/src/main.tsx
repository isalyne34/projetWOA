import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './index.css';
import Accueil from './pages/pageAccueil';
import VoyageDes from './pages/pageVoyage';
import DescripDepense from './pages/pageDepense';
import PartageDepense from './pages/pagePartage';
import Aide from './pages/pageAide';
// import PartageDepense2 from './components/test';

const router = createBrowserRouter([
   { path: '/', element: <Accueil /> },
   { path: '/signup', element: <SignUp /> },
   { path: '/voyage/:tripid', element: <VoyageDes /> },
   { path: '/voyage/:tripid/depense/:depenseid', element: <DescripDepense /> },
   { path: '/voyage/:tripid/partage', element: <PartageDepense /> },
   { path: '/aide', element :<Aide/>},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
