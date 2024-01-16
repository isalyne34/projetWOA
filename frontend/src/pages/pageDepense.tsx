// Description: Page de description d'une depense

import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';
import Layout from '../layout/layout';
import { useParams } from 'react-router-dom';

interface Voyage {
   id_voyage: number;
   titre: string;
   description: string;
   depenses: [];
}
const voyageDefault: Voyage = {
   id_voyage: 0,
   titre: '',
   description: '',
   depenses: [],
};

interface Utilisateur {
   id_utilisateur: number;
   nom: string;
   prenom: string;
   email: string;
   id_voyage: number;
}
const payeurDefault = {
   id_utilisateur: 0,
   prenom: '',
   nom: '',
   email: '',
};

interface Depense {
   id_depense: number;
   titre: string;
   description: string;
   montant: number;
   date_crea: Date;
   id_utilisateur: number;
   id_voyage: number;
}

const depenseDefault: Depense = {
   id_depense: 0,
   titre: '',
   description: '',
   montant: 0,
   date_crea: new Date(),
   id_utilisateur: 0,
   id_voyage: 0,
};
const numberFormatter = new Intl.NumberFormat('fr-FR', {
   style: 'currency',
   currency: 'EUR',
});

export default function DescripDepense() {
   let { tripid: numTrip } = useParams<{ tripid: string }>();
   let { depenseid: idDepense } = useParams<{ depenseid: string }>();

   //recuperer le voyage dont l'id est numTrip dans la base de données située dans API_URL
   const [voyage, setVoyage] = useState<Voyage>(voyageDefault);
   useEffect(() => {
      fetch(`${API_URL}/voyages/${numTrip}`)
         .then((response) => response.json())
         .then((data) => setVoyage(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   //recuperer la depense correspondant au numero de depense dans l'url
   const [depense, setDepense] = useState<Depense>(depenseDefault);
   useEffect(() => {
      if (voyage.id_voyage) {
         fetch(`${API_URL}/depenses/${idDepense}}`)
            .then((response) => response.json())
            .then((data) => setDepense(data))
            .catch((error) => console.error('Erreur:', error));
      }
   }, [voyage]);
   console.log('depense', depense);

   const [payeur, setPayeur] = useState(payeurDefault);
   useEffect(() => {
      if (depense.id_utilisateur) {
         fetch(`${API_URL}/users/${depense.id_utilisateur}`)
            .then((response) => response.json())
            .then((data) => setPayeur(data))
            .catch((error) => console.error('Erreur:', error));
      }
   }, [depense]);

   //recuperer les utilisateurs
   const [listeUtilisateurs, setListeU] = useState<Utilisateur[]>([]);
   useEffect(() => {
      fetch(`${API_URL}/allusers/${numTrip}`)
         .then((response) => response.json())
         .then((data: Utilisateur[]) => setListeU(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   const date = depense.date_crea ? new Date(depense.date_crea) : undefined;
   const formattedDate = date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '';

   //affichage
   return (
      <>
         <Layout>
            <a href={`/voyage/${numTrip}`} className="btn btn-primary">
               Retour
            </a>
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
