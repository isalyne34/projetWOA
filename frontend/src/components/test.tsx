import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';
// import CardPartage from './cardPartage';

export default function PartageDepense2() {
   //recuperer le numero du voyage dans l'url
   const currentURL = window.location.href;
   const segments = currentURL.split('/');
   const numTrip = segments[4];
   //    const numTripNumber = parseInt(numTrip);

   const defaultVoyage = {
      id_voyage: 0,
      titre: '',
      description: '',
      depenses: [],
   };

   //utilisateur type
   const defaultUtilisateur = {
      id_utilisateur: 0,
      prenom: '',
      nom: '',
      email: '',
   };

   //depense type
   const defaultDepense = {
      id_depense: 0,
      titre: '',
      montant: 0,
      date: '',
      id_utilisateur: 0,
      id_voyage: 0,
   };

   //recuperer le voyage dont l'id est numTrip dans la base de données située dans API_URL
   const [voyage, setVoyage] = useState(defaultVoyage);
   useEffect(() => {
      fetch(`${API_URL}/voyages/${numTrip}`)
         .then((response) => response.json())
         .then((data) => setVoyage(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   //recuperer la liste des depenses du voyage
   const [listeDepenses, setListe] = useState([]);
   useEffect(() => {
      fetch(`${API_URL}/voyages/${numTrip}/depenses`)
         .then((response) => response.json())
         .then((data) => setListe(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   // Calculez le total des dépenses
   const [total, setTotal] = useState(listeDepenses.length); // Add state for total
   useEffect(() => {
      setTotal(listeDepenses.length);
      console.log('total', total);
   }, [listeDepenses])

   //recuperer chaque utilisateur
   const [listeUtilisateurs, setListeU] = useState([]);
   useEffect(() => {
      fetch(`${API_URL}/users/${numTrip}`)
         .then((response) => response.json())
         .then((data) => setListeU(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   //compter le nombre d'utilisateurs
   const [nbUtilisateurs, setNbUtilisateurs] = useState(0);
   useEffect(() => {
      setNbUtilisateurs(listeUtilisateurs.length)
      console.log('nbUtilisateurs', nbUtilisateurs);
   }, [listeUtilisateurs])

   //calculer le partage des depenses
   const partage = total / nbUtilisateurs;

   //calculer la dépense pour chaque utilisateur
   const [soldesUtilisateurs, setSoldeUtilisateurs] = useState<{ id_utilisateur: number; solde: number }[]>([]);
   useEffect(() => {
   listeUtilisateurs.map((utilisateur: typeof defaultUtilisateur) => {
      let solde = 0;
      listeDepenses.map((depense: typeof defaultDepense) => {
         if (depense.id_utilisateur === utilisateur.id_utilisateur) {
            solde = solde + depense.montant;
         }
      });
      solde = partage - solde;
      //ajouter le solde et l'id de l'utilisateur à la liste des soldesUtilisateurs
      const user = { id_utilisateur: utilisateur.id_utilisateur, solde };
      setSoldeUtilisateurs([...soldesUtilisateurs, user]);
   });

   console.log('soldesUtilisateurs', soldesUtilisateurs);

   }, [listeUtilisateurs, listeDepenses])

   //savoir qui doit quoi et à qui

   const [transactions, setTransactions] = useState<{ id_debiteur: number; id_crediteur: number; montant: number }[]>([]);
   const [debiteurs, setDebiteurs] = useState<{ id_utilisateur: number; solde: number }[]>([]);
   const [crediteurs, setCrediteurs] = useState<{ id_utilisateur: number; solde: number }[]>([]);

   useEffect(() => {
      console.log('soldesUtilisateurs', soldesUtilisateurs);
      const transactions = [];
      //recuperer les debiteurs et les crediteurs
      //parcourir soldesUtilisateurs si solde>0 alors crediteur sinon debiteur
      const debiteurs = [];
      const crediteurs = [];
      for (const utilisateur of soldesUtilisateurs) {
         if (utilisateur.solde > 0) {
            crediteurs.push(utilisateur);
         } else {
            debiteurs.push(utilisateur);
         }
      }
      for (const debiteur of debiteurs) {
         for (const crediteur of crediteurs) {
            if (crediteur.solde > 0) {
               if (crediteur.solde > debiteur.solde) {
                  transactions.push({ id_debiteur: debiteur.id_utilisateur, id_crediteur: crediteur.id_utilisateur, montant: debiteur.solde });
                  crediteur.solde = crediteur.solde - debiteur.solde;
                  debiteur.solde = 0;
               } else {
                  transactions.push({ id_debiteur: debiteur.id_utilisateur, id_crediteur: crediteur.id_utilisateur, montant: crediteur.solde });
                  debiteur.solde = debiteur.solde - crediteur.solde;
                  crediteur.solde = 0;
               }
            }
         }
      }

      setTransactions(transactions);
      setDebiteurs(debiteurs);
      setCrediteurs(crediteurs);
      // return transactions;
   }, [soldesUtilisateurs]);

   console.log('transactions', transactions);

   return (
      <>
         <p>{numTrip}</p>
         <h1>{voyage.titre}</h1>
         <h3>Listes des membres </h3>
         {listeUtilisateurs.map((utilisateur: typeof defaultUtilisateur) => {
            return (
               <p key={utilisateur.id_utilisateur}>
                  {utilisateur.prenom} {utilisateur.nom}
               </p>
            );
         })}
         <h2>Total: {total}</h2>
      </>
   );
}
