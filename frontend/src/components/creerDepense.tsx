import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';
import { Field, Formik, Form } from 'formik';
import { useParams } from 'react-router-dom';

interface Membre {
   id_utilisateur: number;
   nom: string;
   prenom: string;
   email: string;
   id_voyage: number;
}

export default function CreerDepense() {
   let { tripid: numTrip } = useParams<{ tripid: string }>();

   //creer une depense dans la base de données située dans API_URL
   function createDepense(values: any) {
      fetch(API_URL + '/depenses', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
   }

   const [membres, setMembre] = useState<Membre[]>([]);
   useEffect(() => {
      async function fetchMembre() {
         const response = await fetch(`${API_URL}/allusers/${numTrip}`);
         const data = await response.json();
         setMembre(data);
      }

      fetchMembre();
   }, []);

   return (
      <>
         <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creerDepense" style={{ margin: '10px' }}>
            + Créer une dépense{''}
         </button>

         <div className="modal" tabIndex={-1} id="creerDepense">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" >Créer une dépense</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <Formik
                        initialValues={{
                           titre: '',
                           description: '',
                           montant: 0,
                           date: new Date(),
                           id_voyage: numTrip,
                           id_utilisateur: 0,
                        }}
                        onSubmit={createDepense}
                     >
                        <Form>
                           <div  className="left-align"> 
                              <label htmlFor="titre" className="form-label">Titre</label>
                              <Field name="titre" type="text" placeholder="titre"  className="form-control" />
                           </div>
                           <div  className="left-align">
                              <label htmlFor="description" className="form-label">Description</label>
                              <Field name="description" type="text" placeholder="description"  className="form-control" />
                           </div>
                           <div  className="left-align">
                              <label htmlFor="montant" className="form-label">Montant</label>
                              <Field name="montant" type="number" placeholder="montant ( en € )"  className="form-control"/>
                           </div>
                           <div  className="left-align">
                              <label htmlFor="date_crea" className="form-label">Date</label>
                              <Field name="date_crea" type="date" placeholder="date_crea"  className="form-control"/>
                           </div>

                           <div  className="left-align">
                              <label htmlFor="idUtilisateur" className="form-label">Utilisateur</label>
                              <Field as="select" name="id_utilisateur" placeholder="id_utilisateur"  className="form-control">
                                 <option value="">Sélectionnez un utilisateur</option>
                                 {membres &&
                                    membres.map((membre) => (
                                       <option key={membre.id_utilisateur} value={membre.id_utilisateur}>
                                          {membre.prenom}
                                       </option>
                                    ))}
                              </Field>
                           </div>

                           <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                              Enregistrer
                           </button>
                        </Form>
                     </Formik>
                  </div>
               </div>
            </div> 
         </div>
      </>
   );
}
