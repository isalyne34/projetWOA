import { Field, Form } from 'formik';
import CreerDepense from './creerDepense';
import CreerMembreComponent from './creerMembrecontent';

export default function cardDepenses({ depense}: any) {
   return (
      <div className="card">
         <div className="card-body">
            <h5 className="card-title">{depense.montant}</h5>
            <p className="card-text">
               <a href="depense.tsx" className="link-underline-light">
                  {depense.titre}
               </a>
            </p>
            <p className="lh-1">payé par {depense.idUser}</p>
         </div>
        
      </div>
   );
}
