//page d'aide
import { ReactNode } from 'react';
import Layout from '../layout/layout';




export default function Aide() {
   //aide

   return (
      <Layout>
         <h1> Guide d'installations </h1> <br />

         <p> !  Rafraichir la page afin d'afficher les modifications </p>

         <h3> Si la base de données est vide, vous pouvez :</h3>
         <p>
            {' '}
            - Créer un voyage <br />
            - Créer un utilisateur et l'ajouter au voyage <br />- Cliquer sur le voyage, et créer des dépenses en associant la dépense à la personne qui l'a créée
         </p>
         <p> ! Il faut créer l'utilisateur avant de pouvoir l'associer</p>  <br />

         <h3> Si la base de données existe déjà, vous pouvez :</h3>
         <p>
            {' '}
            - Modifier un voyage grâce au bouton crayon situé à droite <br />
            - Supprimer un voyage <br />
            - Rajouter un membre ou une dépense <br />
            - Modifier une dépense <br />
            - Modifier un utilisateur <br />- Voir le partage des dépenses{' '}
         </p>
      </Layout>
   );
}
