//aide
//https://dev.to/napoleon039/how-to-create-a-simple-postgresql-database-with-expressjs-58n8

const db = require('./postgres-config.js');

//creer un utilisateur
const createUser = (req, res) => {
   const { prenom, nom, email, password_u } = req.body;
   db.pool.query('INSERT INTO utilisateur (prenom,nom,email, password_u) VALUES ($1,$2,$3,$4) RETURNING *;', [prenom, nom, email, password_u], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(201).send(`User added with ID: ${results.insertId}`);
   });
};

// recuperer tous les utilisateurs
const getAllUsers = (req, res) => {
   db.pool.query('SELECT * FROM utilisateur ORDER BY id_utilisateur ASC', (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

// recuperer un utilisateur par son id
const getUserById = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('SELECT * FROM utilisateur WHERE id_utilisateur=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

// mettre a jour un utilisateur
const updateUser = (req, res) => {
   const id = parseInt(req.params.id);
   const { name, email } = req.body;
   db.pool.query('UPDATE utilisateur SET prenom=$1,nom=$2,email=$3 WHERE id_utilisateur=$4', [nom, prenom, email, id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
   });
};
// supprimer un utilisateur
const deleteUser = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('DELETE FROM utilisateur WHERE id_utilisateur=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
   });
};
//creerVoyage
const createVoyage = (req, res) => {
   const { titre, description } = req.body;
   db.pool.query('INSERT INTO voyage (titre, description) VALUES ($1,$2) RETURNING *;', [titre, description], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(201).send(`Voyage added with ID: ${results.insertId}`);
   });
};

//modifierVoyage
const updateVoyage = (req, res) => {
   const id = parseInt(req.params.id);
   const { titre, description } = req.body;
   db.pool.query('UPDATE voyage SET titre=$1,description=$2 WHERE id_voyage=$3', [titre, description, id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).send(`Voyage modified with ID: ${id}`);
   });
};

//supprimerVoyage
const deleteVoyage = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('DELETE FROM voyage WHERE id_voyage=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).send(`Voyage deleted with ID: ${id}`);
   });
};

//recupererVoyage
const getAllVoyages = (req, res) => {
   db.pool.query('SELECT * FROM voyage ORDER BY id_voyage ASC', (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

//recupererVoyageParId
const getVoyageById = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('SELECT * FROM voyage WHERE id_voyage=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

//recupererVoyageParUtilisateur
const getVoyageByUtilisateur = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('SELECT * FROM voyage WHERE id_utilisateur=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

//creerDepense
const createDepense = (req, res) => {
   const { titre, description, montant, date_crea, id_voyage, id_utilisateur } = req.body;
   db.pool.query(
      'INSERT INTO depense (titre, description, montant,date_crea, id_voyage, id_utilisateur) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;',
      [titre, description, montant, date_crea, id_voyage, id_utilisateur],
      (error, results) => {
         if (error) {
            throw error;
         }
         res.status(201).send(`Depense added with ID: ${results.insertId}`);
      }
   );
};

//modifierDepense
const updateDepense = (req, res) => {
   const id = parseInt(req.params.id);
   const { titre, description, montant, date_crea, id_voyage, id_utilisateur } = req.body;
   db.pool.query(
      'UPDATE depense SET titre=$1,description=$2,montant=$3,date_crea=$4,id_voyage=$5,id_utilisateur=$6 WHERE id_depense=$7',
      [titre, description, montant, date_crea, id_voyage, id_utilisateur, id],
      (error, results) => {
         if (error) {
            throw error;
         }
         res.status(200).send(`Depense modified with ID: ${id}`);
      }
   );
};

//supprimerDepense
const deleteDepense = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('DELETE FROM depense WHERE id_depense=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).send(`Depense deleted with ID: ${id}`);
   });
};

//recupererDepense
const getAllDepenses = (req, res) => {
   db.pool.query('SELECT * FROM depense ORDER BY id_depense ASC', (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

//recupererDepenseParId
const getDepenseById = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('SELECT * FROM depense WHERE id_depense=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

//recupererDepenseParVoyage
const getDepenseByVoyage = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('SELECT * FROM depense WHERE id_voyage=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

//recupererDepenseParUtilisateur
const getDepenseByUtilisateur = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('SELECT * FROM depense WHERE id_utilisateur=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

//ajouterUtilisateurVoyage
const addUtilisateurVoyage = (req, res) => {
   const { id_utilisateur, id_voyage } = req.body;
   db.pool.query('INSERT INTO participe (id_utilisateur, id_voyage) VALUES ($1,$2) RETURNING *;', [id_utilisateur, id_voyage], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(201).send(`UtilisateurVoyage added with ID: ${results.insertId}`);
   });
};

//supprimerUtilisateurVoyage
const deleteUtilisateurVoyage = (req, res) => {
   const id = parseInt(req.params.id);
   db.pool.query('DELETE FROM participe WHERE id_participe=$1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).send(`UtilisateurVoyage deleted with ID: ${id}`);
   });
};

//recupererUtilisateurVoyage
const getAllUtilisateurVoyages = (req, res) => {
   db.pool.query('SELECT * FROM participe ORDER BY id_participe ASC', (error, results) => {
      if (error) {
         throw error;
      }
      res.status(200).json(results.rows);
   });
};

module.exports = {
   createUser,
   getAllUsers,
   getUserById,
   updateUser,
   deleteUser,
   createVoyage,
   updateVoyage,
   deleteVoyage,
   getAllVoyages,
   getVoyageById,
   getVoyageByUtilisateur,
   createDepense,
   updateDepense,
   deleteDepense,
   getAllDepenses,
   getDepenseById,
   getDepenseByVoyage,
   getDepenseByUtilisateur,
   addUtilisateurVoyage,
   deleteUtilisateurVoyage,
   getAllUtilisateurVoyages,
};
