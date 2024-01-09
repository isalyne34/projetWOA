export default function Voyage({ voyage }: any) {
   return (
         <div className="card mb-3">
            <div className="row g-0">
               {/* Image à gauche */}
               <div className="col-md-4">
                  <img src="{`assets/img_${voyage.id_voyage}.jpeg`}" className="img-fluid rounded-start" alt="Image" />
               </div>
               {/* Contenu à droite */}
               <div className="col-md-8">
                  <div className="card-body">
                     <h3 className="card-title">{voyage.titre}</h3>
                     <p className="card-text">{voyage.description} </p>
                     <a href={`./voyage/${voyage.id_voyage}`} className="btn btn-primary ">
                        Voir
                     </a>
                  </div>
               </div>
            </div>
         </div>
      
   );
}
