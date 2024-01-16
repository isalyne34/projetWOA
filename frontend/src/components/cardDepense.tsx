import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';
import ModifierDepense from './modifierDepense';

const numberFormatter = new Intl.NumberFormat('fr-FR', {
   style: 'currency',
   currency: 'EUR',
});

export default function CardDepenses({ depense }: any) {
   function supprimerDepense() {
      fetch(API_URL + `/depensesdel/${depense.id_depense}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }

   //recuperer le nom et le prenom de l'utilisateur dont l'id est depense.id_utilisateur
   const [user, setUser] = useState<{ prenom: string; nom: string } | undefined>();
   useEffect(() => {
      fetch(`${API_URL}/users/${depense.id_utilisateur}`)
         .then((response) => response.json())
         .then((data) => setUser(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);
   //utiliser le nom et le prenom de l'utilisateur pour afficher le nom de l'utilisateur qui a payé la depense
   const userName = user ? `${user.prenom} ${user.nom}` : 'pas trouvé';

   return (
      <div className="card mb-3 ">
         <div className="row g-0">
            <div className="col-md-4 ">
               <div className="card-title " style={{ textAlign: 'center', height: '100%' }}>
                  <h3 className="">{numberFormatter.format(depense.montant)} </h3>
               </div>
            </div>

            <div className="col-md-6">
               <div className="card-body">
                  <a href={`${depense.id_voyage}/depense/${depense.id_depense}`} className="link-underline-light">
                     <h3>{depense.titre}</h3>
                  </a>
                  <p>Payé par {userName}</p>
               </div>
            </div>
            <div className="col-md-2">
               <ModifierDepense depense={depense}></ModifierDepense>

               <button type="button" className="btn btn-danger" style={{ margin: '10px' }} onClick={supprimerDepense}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                     <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
               </button>
            </div>
         </div>
      </div>
   );
}
