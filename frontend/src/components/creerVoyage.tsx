import { API_URL } from '../config/app';
import { Field, Formik, Form } from 'formik';

export default function CreerVoyage() {
   function createVoyage(values: any) {
      console.log('values', values);

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
         <button type="button" className="btn button btn-primary" data-bs-toggle="modal" data-bs-target="#creerShare">
            + Créer un ShareAll{' '}
         </button>

         <div className="modal" tabIndex={-2} id="creerShare">
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
                        {({ values }) => (
                           <Form>
                              <div className="left-align">
                                 <label htmlFor="titre" className="form-label">
                                    Titre
                                 </label>
                                 <Field name="titre" type="text" placeholder="titre" className="form-control" />
                              </div>
                              <div className="left-align">
                                 <label htmlFor="description" className="form-label">
                                    Description
                                 </label>
                                 <Field name="description" type="text" placeholder="description" className="form-control" />
                              </div>

                              <button type="submit" className="btn btn-success" data-bs-dismiss="modal" onClick={() => createVoyage(values)}>
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
