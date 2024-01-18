//modifier un utilisateur

import { Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
import { API_URL } from '../config/app';
import { useEffect, useState } from 'react';

interface Utilisateur {
   id_utilisateur: number;
   prenom: string;
   nom: string;
   email: string;
}

const defaultUtilisateur: Utilisateur = {
   id_utilisateur: 0,
   prenom: '',
   nom: '',
   email: '',
};

type ModifierUtilisateurProps = {
   utilisateur: Utilisateur;
};

export default function ModifierUtilisateur({ utilisateur }: ModifierUtilisateurProps) {
   function modifierUtilisateur(values: any) {
      console.log(values);
      fetch(API_URL + `/usersud/${utilisateur.id_utilisateur}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
   }

   function supprimerUtilisateur() {
      fetch(API_URL + `/usersdel/${utilisateur.id_utilisateur}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }
   return (
      <>
         <button type="button" className="btn " data-bs-toggle="modal" data-bs-target={`#modifierUtilisateur${utilisateur.id_utilisateur}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
               <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
         </button>

         <div className="modal" tabIndex={-1} id={`modifierUtilisateur${utilisateur.id_utilisateur}`}>
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Modifier l'utilisateur</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <Formik
                        initialValues={{
                           prenom: utilisateur.prenom || '',
                           nom: utilisateur.nom || '',
                           email: utilisateur.email || '',
                        }}
                        onSubmit={modifierUtilisateur}
                     >
                        {({ handleSubmit }) => (
                           <Form onSubmit={handleSubmit}>
                              <div className="left-align">
                                 <label htmlFor="prenom" className="form-label">
                                    Prénom
                                 </label>
                                 <Field id="prenom" name="prenom" type="text" className="form-control" />
                              </div>
                              <div className="left-align">
                                 <label htmlFor="nom" className="form-label">
                                    Nom
                                 </label>
                                 <Field id="nom" name="nom" type="text" className="form-control" />
                              </div>

                              <div className="left-align">
                                 <label htmlFor="email" className="form-label">
                                    Email
                                 </label>
                                 <Field id="email" name="email" type="email" className="form-control" />
                              </div>
                              <div>
                                 <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                                    Enregistrer
                                 </button>

                                 <button type="button" className="btn btn-danger" onClick={supprimerUtilisateur}>
                                    Supprimer
                                 </button>
                              </div>
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
