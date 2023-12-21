import { API_URL } from '../config/app';
import { Field, Formik, Form } from 'formik';

export default function CreerMembreComponent({ onClose }: any) {
   function createUser(values: any) {
      fetch(API_URL + '/users', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
   }

   return (
      <>
         <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creerMembre">
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
                        }}
                        onSubmit={createUser}
                     >
                        <Form>
                           <Field name="Prenom" type="text" placeholder="Prenom" />
                           <Field name="Nom" type="text" placeholder="Nom" />
                           <Field name="Email" type="text" placeholder="Email" />

                           <button type="submit" className="btn btn-success">
                              Enregistrer
                           </button>
                           <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                              Supprimer
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
