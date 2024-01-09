import { useEffect, useState } from 'react';
import { API_URL } from '../config/app';
import { Field, Formik, Form } from 'formik';

interface Voyage {
   id_voyage: number;
   titre: string;
   description: string;
   depenses: [];
}

export default function CreerMembreComponent() {
   function createUser(values: any) {
      fetch(API_URL + '/users', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
   }

   const [voyages, setVoyage] = useState<Voyage[]>([]);

   useEffect(() => {
      async function fetchVoyage() {
         const response = await fetch(`${API_URL}/voyages`);
         const data = await response.json();
         setVoyage(data);
      }

      fetchVoyage();
   }, []);

   return (
      <>
         <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creerMembre" style={{ margin: '10px' }}>
            + Ajouter un membre{' '}
         </button>

         <div className="modal" tabIndex={-1} id="creerMembre">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Ajouter un membre</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <Formik
                        initialValues={{
                           Prenom: '',
                           Nom: '',
                           Email: '',
                           id_voyage: 0,
                        }}
                        onSubmit={createUser}
                     >
                        <Form>
                           <div>
                              <label htmlFor="prenom">Prenom</label>
                              <Field name="prenom" type="text" placeholder="prenom" />
                           </div>
                           <div>
                              <label htmlFor="nom">Nom</label>
                              <Field name="nom" type="text" placeholder="nom" />
                           </div>
                           <div>
                              <label htmlFor="email">Email</label>
                              <Field name="email" type="text" placeholder="email" />
                           </div>
                           <div>
                              <label htmlFor="id_voyage">Choississez un voyage</label>
                              <Field as="select" name="id_voyage" placeholder="id_voyage">
                                 <option value="">Sélectionnez un voyage</option>
                                 {voyages.map((voyage) => (
                                    <option key={voyage.id_voyage} value={voyage.titre}>
                                       {voyage.titre}
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
