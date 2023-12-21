import { useEffect, useState } from 'react';
import { API_URL } from '../config/app.ts';
import Voyage from '../components/cardVoyage.tsx';
import Layout from '../layout/layout.tsx';
import CreerVoyage from '../components/creerVoyage.tsx';

export default function Accueil() {
   const [voyages, setVoyage] = useState([]);

   useEffect(() => {
      async function fetchVoyage() {
         const response = await fetch(`${API_URL}/trips`);
         const data = await response.json();
         setVoyage(data);
      }

      fetchVoyage();
   }, []);

   return (
      <Layout>
         <div>
            <h1 className="titre text-decoration-underline">Mes ShareAlls :</h1>

{/* parcourir tous les voyages de la classe Voyage et afficher le cardVoyage associé */}




            {voyages.map((trip: any) => {
               return <Voyage trip={trip} />;
            })}

            <div className="text-center mt-5">
               
               <CreerVoyage></CreerVoyage>
            </div>
         </div>
      </Layout>
   );
}
