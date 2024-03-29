import { API_URL } from '../config/app';
import ModifierVoyage from './modifierVoyage';

interface Voyage {
   id_voyage: number;
   titre: string;
   description: string;
   depenses: [];
}
type VoyageProps = {
   voyage: Voyage;
};

export default function Voyage({ voyage }: VoyageProps) {
   //importer la suppression d'un voyage

   function supprimerVoyage() {
      fetch(API_URL + `/voyagesdel/${voyage.id_voyage}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }

   return (
      <div className="card mb-3">
         <div className="row g-0 row justify-content-between">
            {/* Image à gauche */}
            <div className="col-md-4">
            <img className="w-50" style={{ margin:"auto", width:"400px", left:"50px", right:"50px"}}  src={`/assets/img_${voyage.id_voyage}.jpeg`} />

            </div>
            {/* Contenu à droite */}
            <div className="col-md-6">
               <div className="card-body">
                  <h3 className="card-title">{voyage.titre}</h3>
                  <p className="card-text">{voyage.description} </p>
                  <a href={`./voyage/${voyage.id_voyage}`} className="btn btn-primary ">
                     Voir
                  </a>
               </div>
            </div>
            <div className="col-md-2 align-self-center ">
               <ModifierVoyage voyage={voyage}></ModifierVoyage>
               <button type="button" className="btn btn-danger" style={{ margin: '10px' }} onClick={supprimerVoyage}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                     <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
               </button>
             
            </div>
         </div>
      </div>
   );
}
