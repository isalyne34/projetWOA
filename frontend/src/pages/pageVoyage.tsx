import { useEffect, useState } from 'react';
import { API_URL } from '../config/app.ts';
import Layout from '../layout/layout.tsx';
import CreerMembreComponent from '../components/creerMembrecontent.tsx';
import jsonData from './../../../back.json';
import { Link } from 'react-router-dom';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListeDepenses from '../components/Voyage_Depenses.tsx';
import Partage from '../components/Voyage_Partage.tsx';

export default function DescripVoyage() {
   const defaultVoyage = {
      id: 0,
      titre: '',
      description: '',
   };

   const [key, setKey] = useState('home');
   const [voyage, setVoyage] = useState(defaultVoyage);

   const currentURL = window.location.href;
   const segments = currentURL.split('/');
   const numTrip = segments[4];

   console.log(numTrip);

   useEffect(() => {
      const findVoyageById = () => {
         const foundVoyage = jsonData.trips.find((trip) => trip.id === Number(numTrip));
         setVoyage(foundVoyage || defaultVoyage);
      };

      findVoyageById();
   }, []);

   return (
      <>
         <Layout>
            <p>{numTrip}</p>
            <h1>{voyage.titre}</h1>
            <h3>listes des membres</h3>
            <h2>Total: {/* somme des depenses associés*/}</h2>

            <Tabs id="controlled-tab-example" activeKey={key} defaultActiveKey="depense" onSelect={(k) => setKey(k)} className="mb-3" fill>
               <Tab eventKey="depense" title="Dépenses">
                   <ListeDepenses voyage={voyage} />
               </Tab>
               <Tab eventKey="partage" title="Partage">
                   <Partage/>
               </Tab>
            </Tabs>
         </Layout>
      </>
   );
}
