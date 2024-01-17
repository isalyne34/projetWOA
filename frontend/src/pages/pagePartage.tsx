import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';
import Layout from '../layout/layout';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';

interface Voyage {
   id_voyage: number;
   titre: string;
   description: string;
   depenses: [];
}

interface Utilisateur {
   id_utilisateur: number;
   nom: string;
   prenom: string;
   email: string;
   id_voyage: number;
}

const numberFormatter = new Intl.NumberFormat('fr-FR', {
   style: 'currency',
   currency: 'EUR',
});

const Transaction = ({ crediteur, debiteur, montant }: { crediteur: Utilisateur; debiteur: Utilisateur; montant: number }) => {
   return (
      <div>
         {debiteur.prenom} {debiteur.nom} doit {numberFormatter.format(Math.abs(montant))} à {crediteur.prenom} {crediteur.nom}
      </div>
   );
};

export default function PartageDepense() {
   let { tripid: numTrip } = useParams<{ tripid: string }>();

   const [voyage, setVoyage] = useState<Voyage>();
   useEffect(() => {
      fetch(`${API_URL}/voyages/${numTrip}`)
         .then((response) => response.json())
         .then((data) => setVoyage(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

   //recuperer le total des depenses du voyage
   const [total, setTotal] = useState(0);
   useEffect(() => {
      if (voyage) {
         fetch(`${API_URL}/voyage/${numTrip}/totalDepenses`)
            .then((response) => response.json())
            .then((data) => setTotal(data))
            .catch((error) => console.error('Erreur:', error));
      }
   }, [voyage]);

   //recuperer chaque utilisateur
   const [listeUtilisateurs, setListeU] = useState<Utilisateur[]>([]);
   useEffect(() => {
      fetch(`${API_URL}/allusers/${numTrip}`)
         .then((response) => response.json())
         .then((data: Utilisateur[]) => setListeU(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);
   console.log('listeUtilisateurs', listeUtilisateurs);

   // recuperer le partage des dépenses en fonction du nombre d'utilisateurs ( Total des depenses / nb utilisateur)
   const [partage, setPartage] = useState(0);
   useEffect(() => {
      fetch(`${API_URL}/voyage/${numTrip}/partage`)
         .then((response) => response.json())
         .then((data) => setPartage(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);
   console.log('partage', partage);

   const [soldesUtilisateurs, setSoldeUtilisateurs] = useState<{ id_utilisateur: number; solde: number }[]>([]);

   useEffect(() => {
      Promise.all(
         listeUtilisateurs.map((utilisateur: Utilisateur) => {
            //recuperer le total des depenses pour un utilisateur dans un voyage
            return fetch(`${API_URL}/voyage/${numTrip}/totalDepensesUtilisateur/${utilisateur.id_utilisateur}`)
               .then((response) => response.json())
               .then((data) => {
                  const solde = partage - data;
                  return { id_utilisateur: utilisateur.id_utilisateur, solde: solde };
               })
               .then((data) => {
                  return data;
               });

            // .catch((error) => console.error('Erreur:', error));
         })
      ).then((data) => {
         if (data) setSoldeUtilisateurs(data);
      });
   }, [listeUtilisateurs, partage]);
   console.log('soldesUtilisateurs', soldesUtilisateurs);

   const [transactions, setTransactions] = useState<{ id_debiteur: number; id_crediteur: number; montant: number }[]>([]);
   useEffect(() => {
      const transactions: any[] = [];

      //recuperer les debiteurs et les crediteurs
      //parcourir soldesUtilisateurs si solde<0 alors crediteur sinon debiteur
      const debiteurs = [];
      const crediteurs = [];

      for (let utilisateur of soldesUtilisateurs) {
         utilisateur = Object.assign({}, utilisateur); //copie de l'objet

         if (utilisateur.solde < 0) {
            crediteurs.push({
               id_utilisateur: utilisateur.id_utilisateur,
               solde: utilisateur.solde,
            });
         } else {
            debiteurs.push({
               id_utilisateur: utilisateur.id_utilisateur,
               solde: utilisateur.solde,
            });
         }
      }
      console.log('crediteurs', crediteurs);
      console.log('debiteurs', debiteurs);
      for (const debiteur of debiteurs) {
         for (const crediteur of crediteurs) {
            if (crediteur.solde < 0) {
               if (-crediteur.solde > debiteur.solde) {
                  transactions.push({
                     id_debiteur: debiteur.id_utilisateur,
                     id_crediteur: crediteur.id_utilisateur,
                     montant: debiteur.solde,
                  });

                  crediteur.solde = crediteur.solde + debiteur.solde;
                  debiteur.solde = 0;
               } else {
                  transactions.push({
                     id_debiteur: debiteur.id_utilisateur,
                     id_crediteur: crediteur.id_utilisateur,
                     montant: -crediteur.solde,
                  });

                  debiteur.solde = debiteur.solde + crediteur.solde;
                  crediteur.solde = 0;
               }
            }
         }
      }

      setTransactions(transactions);
   }, [soldesUtilisateurs]);
   console.log('transactions', transactions);

   return (
      <>
         {voyage && (
            <Layout>
               <a href={`/voyage/${numTrip}`} className="btn btn-primary">
                  Retour au voyage
               </a>
               <h1 className="titre1">{voyage.titre}</h1>
               <h3 className="titre2">{voyage.description}</h3>

               <h5 className="listeUser">{listeUtilisateurs.map((utilisateur: Utilisateur) => `${utilisateur.prenom} ${utilisateur.nom}`).join(', ')}</h5>
               <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <h2>{numberFormatter.format(total)}</h2>
                  <h5 style={{ marginLeft: '10px' }}>Total des dépenses</h5>
               </div>

               <hr style={{ borderColor: '#0d6efd', borderWidth: '3px' }} />
               <div>
                  <h3 className="text-decoration-underline">Transactions:</h3>
                  {soldesUtilisateurs.map((solde) => {
                     const utilisateur = listeUtilisateurs.find((utilisateur) => utilisateur.id_utilisateur === solde.id_utilisateur);
                     const style = solde.solde < 0 ? ({ backgroundColor: 'rgba(0, 128, 0, 0.5)' } as React.CSSProperties) : ({ backgroundColor: 'rgba(255, 0, 0, 0.5)' } as React.CSSProperties);
                     const transaction = transactions.filter((transaction) => transaction.id_debiteur === utilisateur?.id_utilisateur);

                     if (utilisateur) {
                        return (
                           <Card key={utilisateur.id_utilisateur}>
                              <Card.Header>
                                 {utilisateur.prenom} {utilisateur.nom}
                              </Card.Header>
                              <Card.Body style={style}>
                                 {' '}
                                 <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>{numberFormatter.format(-solde.solde)}</h1>
                                 {transaction.map((transaction) => {
                                    const debiteur = listeUtilisateurs.find((utilisateur) => utilisateur.id_utilisateur === transaction.id_debiteur);
                                    const crediteur = listeUtilisateurs.find((utilisateur) => utilisateur.id_utilisateur === transaction.id_crediteur);

                                    if (!debiteur || !crediteur) return null;
                                    return (
                                       <Transaction
                                          key={`${transaction.id_crediteur}/${transaction.id_debiteur}/${transaction.montant}`}
                                          crediteur={crediteur}
                                          debiteur={debiteur}
                                          montant={transaction.montant}
                                       />
                                    );
                                 })}{' '}
                              </Card.Body>
                           </Card>
                        );
                     }
                     return <></>;
                  })}
               </div>
            </Layout>
         )}
      </>
   );
}
