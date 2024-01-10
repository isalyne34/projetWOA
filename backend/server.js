const express = require('express');
const app = express();
const cors = require('cors');
const userController = require('./queries');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/users', userController.createUser);
app.delete('/usersdel/:id',userController.deleteUser);
app.put('/usersud/:id',userController.updateUser);



app.post('/voyages', userController.createVoyage);
app.delete('/voyagesdel/:id',userController.deleteVoyage);
app.put('/voyagesud/:id',userController.updateVoyage);

app.post('/depenses', userController.createDepense);
app.delete('/depensesdel/:id',userController.deleteDepense);
app.put('/depensesud/:id',userController.updateDepense);

app.get('/users/:id', userController.getUserById);

app.get('/voyages', userController.getAllVoyages);
app.get('/allusers/:id', userController.getAllUsers);

app.get('/voyages/:id', userController.getVoyageById);

app.get('/voyages/:id/depenses', userController.getDepenseByVoyage);
app.get('/voyage/:id/totalDepenses', userController.getTotalDepenses);
app.get('/voyage/:id/Partage', userController.getPartageDepenses);
app.get('/voyage/:id/totalDepensesUtilisateur/:idUtilisateur', userController.getTotalDepensesUtilisateur);
app.get('/voyage/:id/SoldeUtilisateur/:idUtilisateur', userController.getSoldeUtilisateur);

app.get('/depenses/:id', userController.getDepenseById);

app.listen(3000, () => console.log('Server listening on port 3000'));
