import { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import CardDepenses from '../components/Voyage_Depenses_cardDepense';
import CreerDepense from '../components/creerDepense';
import CreerMembreComponent from '../components/creerMembrecontent';
import { API_URL } from '../config/app';
import PartageDepense from '../components/partageDepense';
import { Link, useParams } from 'react-router-dom';

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

interface Depense {
   id_depense: number;
   titre: string;
   description: string;
   montant: number;
   date: Date;
   id_utilisateur: number;
   id_voyage: number;
}
const numberFormatter = new Intl.NumberFormat('fr-FR', {
   style: 'currency',
   currency: 'EUR',
});

export default function VoyageDes() {
   //recuperer le numero du voyage dans l'url
   let { tripid: numTrip } = useParams<{ tripid: string }>();

   //recuperer le voyage dont l'id est numTrip dans la base de données située dans API_URL
   const [voyage, setVoyage] = useState<Voyage>(voyageDefault);
   useEffect(() => {
      fetch(`${API_URL}/voyages/${numTrip}`)
         .then((response) => response.json())
         .then((data) => setVoyage(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   //recuperer les depenses associées au voyage

   const [listeDepenses, setListe] = useState<Depense[]>([]);
   useEffect(() => {
      fetch(`${API_URL}/voyages/${numTrip}/depenses`)
         .then((response) => response.json())
         .then((data: Depense[]) => setListe(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   // Calculez le total des dépenses
   const [total, setTotal] = useState(0); // Add state for total
   useEffect(() => {
      fetch(`${API_URL}/voyage/${numTrip}/totalDepenses`)
         .then((response) => response.json())
         .then((data) => setTotal(data))
         .catch((error) => console.error('Erreur:', error));
   }, [voyage.depenses]);

   //recuperer le prenom et le nom de chaque utilisateur
   const [listeUtilisateurs, setListeU] = useState<Utilisateur[]>([]);
   useEffect(() => {
      fetch(`${API_URL}/allusers/${numTrip}`)
         .then((response) => response.json())
         .then((data: Utilisateur[]) => setListeU(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   //affichage
   return (
      <>
         <Layout>
            <h1 className="titre1">{voyage.titre}</h1>
            <h3 className="titre2">{voyage.description}</h3>

            {/* <h3 className="text-decoration-underline">Listes des membres </h3> */}
            <h5 className="listeUser">{listeUtilisateurs.map((utilisateur: Utilisateur) => `${utilisateur.prenom} ${utilisateur.nom}`).join(', ')}</h5>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
               <h2>{numberFormatter.format(total)}</h2> <h5 style={{ marginLeft: '10px' }}>Total des dépenses</h5>
            </div>
            <hr style={{ borderColor: '#0d6efd', borderWidth: '3px' }} />

            <h3 className="text-decoration-underline">Listes des dépenses :</h3>
            {/* affichage des depenses grace au composent CardDepenses */}
            {listeDepenses.map((depense: Depense) => {
               return <CardDepenses key={depense.id_depense} depense={depense} />;
            })}

            <CreerDepense></CreerDepense>
            <CreerMembreComponent></CreerMembreComponent>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
               {/* bouton pour aller sur la page de partage des depenses */}
               <Link to={`/voyage/${numTrip}/partage`}>
                  <button className="btn btn-primary">
                     <img src="/assets/partage.jpg" alt="Icon" className="mr-2 partage" /> Partage des dépenses
                  </button>
               </Link>
            </div>
         </Layout>
      </>
   );
}
