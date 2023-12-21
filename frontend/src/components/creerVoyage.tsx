import { API_URL } from '../config/app';
import { Field, Formik, Form } from 'formik';

export default function CreerVoyage() {
   function createVoyage(values: any) {
      fetch(API_URL + '/voyages', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
   }

   return (
      <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creerShare">
      + Créer un ShareAll{' '}
   </button>

   <div className="modal" tabIndex={-1} id="creerShare">
      <div className="modal-dialog">
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">Créer un ShareAll</h5>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <Formik
            initialValues={{
               titre: '',
               description: '',
            }}
            onSubmit={createVoyage}
         >
            <Form>
               <Field name="titre" type="text" placeholder="titre" />
               <Field name="description" type="text" placeholder="description" />

               <button type="submit" className="btn btn-success">
                  Enregistrer
               </button>
               <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                  Supprimer le ShareAll
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
