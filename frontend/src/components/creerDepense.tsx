import { API_URL } from '../config/app';
import { Field, Formik, Form } from 'formik';

export default function CreerDepense() {
   function createDepense(values: any) {
      fetch(API_URL + '/depense', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
   }

   return (
      <>
         <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creerDepense">
            + Créer une dépense{''}
         </button>

         <div className="modal" tabIndex={-1} id="creerDepense">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Créer une dépense</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <Formik
                        initialValues={{
                           titre: '',
                           description: '',
                           montant: 0,
                           date: new Date(),
                        }}
                        onSubmit={createDepense}
                     >
                        <Form>
                           <Field name="titre" type="text" placeholder="titre" />
                           <Field name="description" type="text" placeholder="description" />
                           <Field name="montant" type="number" placeholder="montant ( en € )" />
                           <Field name="date" type="date" placeholder="date" />
                           <button type="submit">Enregistrer</button>
                        </Form>
                     </Formik>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
