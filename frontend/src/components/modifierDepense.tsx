//modifier les valeurs d'une dépense

import { Field, Formik } from 'formik';
import { Form, useParams } from 'react-router-dom';
import { API_URL } from '../config/app';
import { useEffect, useState } from 'react';

interface Depense {
   id_depense: number;
   titre: string;
   description: string;
   montant: number;
   id_voyage: number;
   id_utilisateur: number;
}
interface Membre {
   id_utilisateur: number;
   nom: string;
   prenom: string;
   email: string;
   id_voyage: number;
}

const defaultDepense: Depense = {
   id_depense: 0,
   titre: '',
   description: '',
   montant: 0,
   id_voyage: 0,
   id_utilisateur: 0,
};

export default function ModifierDepense() {
   function modifierDepense(values: any) {
      fetch(API_URL + `/uddepenses/${depense.id_depense}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
   }

   let { tripid: numTrip } = useParams<{ tripid: string }>();

   const [depense, setDepense] = useState(defaultDepense);
   useEffect(() => {
      fetch(`${API_URL}/depenses/${numTrip}`)
         .then((response) => response.json())
         .then((data) => setDepense(data))
         .catch((error) => console.error('Erreur:', error));
   }, []);

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
         <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modifierDepense">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
               <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
               />
            </svg>
         </button>

         <div className="modal" tabIndex={-1} id="modifierDepense">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Modifier la dépense</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <Formik
                        initialValues={{
                           titre: depense.titre || '',
                           description: depense.description || '',
                           montant: depense.montant || '',
                           id_utilisateur: depense.id_utilisateur || '',
                        }}
                        onSubmit={modifierDepense}
                     >
                        {({ handleSubmit }) => (
                           <Form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                 <label htmlFor="titre" className="form-label">
                                    Titre
                                 </label>
                                 <Field type="text" className="form-control" id="titre" name="titre" placeholder={depense.titre} />
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="description" className="form-label">
                                    Description
                                 </label>
                                 <Field type="text" className="form-control" id="description" name="description" placeholder={depense.description} />
                              </div>
                              <div className="mb-3">
                                 <label htmlFor="montant" className="form-label">
                                    Montant
                                 </label>
                                 <Field type="number" className="form-control" id="montant" name="montant" placeholder={depense.montant} />
                              </div>
                              <div>
                                 <label htmlFor="idUtilisateur">Utilisateur</label>
                                 <Field as="select" name="id_utilisateur" placeholder="id_utilisateur">
                                    <option value="">Sélectionnez un utilisateur</option>
                                    {membres &&
                                       membres.map((membre) => (
                                          <option key={membre.id_utilisateur} value={membre.id_utilisateur}>
                                             {membre.prenom}
                                          </option>
                                       ))}
                                 </Field>
                              </div>
                              <button type="submit" className="btn button">
                                 Enregistrer
                              </button>
                           </Form>
                        )}
                     </Formik>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
