// Description: Page de description d'une depense

import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';
import Layout from '../layout/layout';

export default function DescripDepense() {
   const currentURL = window.location.href;
   console.log(currentURL);
   const segments = currentURL.split('/');
   //recuperer le numero de la depense dans l'url
   const numDepense = segments[6];
   console.log('depense', numDepense);
   //recuperer le numero du voyage dans l'url
   const numTrip = segments[4];
   console.log('numTrip', numTrip);

   const defaultVoyage = {
      id_voyage: 0,
      titre: 'err',
      description: 'err',
      depenses: [],
   };
   const defaultDepense = {
      id_depense: 100,
      titre: 'err',
      description: 'err',
      montant: 0,
      date_crea: '2021-10-10',
      id_voyage: 100,
      id_utilisateur: 100,
   };
   interface Utilisateur {
      id_utilisateur: number;
      nom: string;
      prenom: string;
      email: string;
      id_voyage: number;
   }

   //recuperer le voyage dont l'id est numTrip dans la base de données située dans API_URL
   const [voyage, setVoyage] = useState(defaultVoyage);
   useEffect(() => {
      console.log('numTrip2', numTrip);
      fetch(`${API_URL}/voyages/${numTrip}`)
         .then((response) => response.json())
         .then((data) => setVoyage(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);
   console.log('voyagevoyage', voyage);

   //recuperer la depense correspondant au numero de depense dans l'url
   const [depense, setDepense] = useState(defaultDepense);
   useEffect(() => {
      if (voyage.id_voyage) {
         console.log('numDepense', voyage.id_voyage);
         fetch(`${API_URL}/depenses/${voyage.id_voyage}}`)
            .then((response) => response.json())
            .then((data) => setDepense(data))
            .catch((error) => console.error('Erreur:', error));
      }
   }, [voyage]);
   console.log('depense', depense);

   //recuperer le payeur
   const payeurDefault = {
      id_utilisateur: 0,
      prenom: '',
      nom: '',
      email: '',
   };

   const [payeur, setPayeur] = useState(payeurDefault);
   console.log('id payeur', depense.id_utilisateur);
   useEffect(() => {
      if (depense.id_utilisateur) {
         fetch(`${API_URL}/users/${depense.id_utilisateur}`)
            .then((response) => response.json())
            .then((data) => setPayeur(data))
            .catch((error) => console.error('Erreur:', error));
      }
   }, [depense]);
   console.log('payeur', payeur);

   //recuperer les utilisateurs
   const [listeUtilisateurs, setListeU] = useState<Utilisateur[]>([]);
   useEffect(() => {
      fetch(`${API_URL}/allusers/${numTrip}`)
         .then((response) => response.json())
         .then((data: Utilisateur[]) => setListeU(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   const date = new Date(depense.date_crea);
   const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

   //affichage
   return (
      <>
         <Layout>
            <h1 className="titre1">{voyage.titre}</h1>
            <h3 className="titre2">{voyage.description}</h3>

            {/* <h3 className="text-decoration-underline">Listes des membres </h3> */}
            <h5 className="listeUser">{listeUtilisateurs.map((utilisateur: Utilisateur) => `${utilisateur.prenom} ${utilisateur.nom}`).join(', ')}</h5>

            <hr style={{ borderColor: '#0d6efd', borderWidth: '3px' }} />

            <h1 className="text-center">{depense.titre}</h1>
            <h3 className="text-center">{depense.description}</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
               <p style={{ margin: '20px' }}>
                  {' '}
                  Payé par :{payeur.prenom} {payeur.nom}{' '}
               </p>
               <p style={{ margin: '20px' }}>Le {formattedDate}</p>
            </div>

            <h2>Montant: {depense.montant} €</h2>
         </Layout>
      </>
   );
}
