import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';

const numberFormatter = new Intl.NumberFormat('fr-FR', {
   style: 'currency',
   currency: 'EUR',
});

export default function CardDepenses({ depense }: any) {

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
            <div className="col-md-4 " >
               <div className="card-title " style={{ textAlign: 'center',height:"100%" }}>
                  <h3 className=''>{numberFormatter.format(depense.montant)} </h3>
                  </div>
            </div>

            <div className="col-md-8">
               <div className="card-body">
                  <a href={`${depense.id_voyage}/depense/${depense.id_depense}`} className="link-underline-light">
                     <h3>{depense.titre}</h3>
                  </a>
                  <p>Payé par {userName}</p>
               </div>
            </div>
         </div>
      </div>
   );
}
