import { useEffect, useState } from 'react';
import { API_URL } from '../config/app.ts';
import Voyage from '../components/cardVoyage.tsx';
import Layout from '../layout/layout.tsx';
import CreerVoyage from '../components/creerVoyage.tsx';
import CreerMembreComponent from '../components/creerMembre.tsx';

export default function Accueil() {
   const [voyages, setVoyage] = useState([]);

   useEffect(() => {
      async function fetchVoyage() {
         const response = await fetch(`${API_URL}/voyages`);
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
            {voyages.map((voyage: any) => (
               <Voyage key={voyage.id_voyage} voyage={voyage} />
            ))}

            <div className="text-center mt-5">
               <CreerVoyage></CreerVoyage>

               <CreerMembreComponent></CreerMembreComponent>
            </div>
         </div>
      </Layout>
   );
}
