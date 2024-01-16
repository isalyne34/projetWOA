//modifier les valeurs d'un voyage ( titre et description)

import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
import { API_URL } from '../config/app';
import { useEffect, useState } from 'react';

interface Voyage {
   id_voyage: number;
   titre: string;
   description: string;
   depenses: [];
}

const defaultVoyage: Voyage = {
   id_voyage: 0,
   titre: '',
   description: '',
   depenses: [],
};

type ModifierVoyageProps = {
   voyage: Voyage;
};

export default function ModifierVoyage({ voyage }: ModifierVoyageProps) {
   function modifierVoyage(values: any) {
      fetch(API_URL + `/voyagesud/${voyage.id_voyage}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
   }

   return (
      <>
         <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#modifierVoyage${voyage.id_voyage}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
               <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
               />
            </svg>
         </button>

         <div className="modal" tabIndex={-1} id={`modifierVoyage${voyage.id_voyage}`}>
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Modifier le ShareAll</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <Formik
                        initialValues={{
                           titre: voyage.titre || '',
                           description: voyage.description || '',
                        }}
                        onSubmit={modifierVoyage}
                     >
                        {({ handleSubmit }) => (
                           <Form onSubmit={handleSubmit}>
                              <div className="mb-3">
                                 <label htmlFor="titre" className="form-label">
                                    Titre
                                 </label>
                                 <Field type="text" className="form-control" id="titre" name="titre" placeholder={voyage.titre} />
                              </div>

                              <div className="mb-3">
                                 <label htmlFor="description" className="form-label">
                                    Description
                                 </label>
                                 <Field type="text" className="form-control" id="description" name="description" placeholder={voyage.description} />
                              </div>
                              <button type="submit" className="btn button btn-success" data-bs-dismiss="modal">
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
