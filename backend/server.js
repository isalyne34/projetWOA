const express = require('express');
const app = express();
const userController = require('./queries')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/users", userController.createUser);
app.post("/voyages", userController.createVoyage);
app.post("/depenses", userController.createDepense);


app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);
app.get("/users/:id/voyages", userController.getVoyageByUser);
app.get("/users/:id/depenses", userController.getDepenseByUser);
app.get("/voyages", userController.getAllVoyages);
app.get("/voyages/:id", userController.getVoyageById);
app.put("/voyages/:id", userController.updateVoyage);
app.delete("/voyages/:id", userController.deleteVoyage);
app.get("/voyages/:id/depenses", userController.getDepenseByVoyage);
app.get("/depenses", userController.getAllDepenses);
app.get("/depenses/:id", userController.getDepenseById);
app.put("/depenses/:id", userController.updateDepense);
app.delete("/depenses/:id", userController.deleteDepense);
app.get("/depenses/:id/voyages", userController.getVoyageByDepense);
app.get("/depenses/:id/users", userController.getUserByDepense);
app.get("/voyages/:id/users", userController.getUserByVoyage);
app.post("/users/:id/voyages", userController.addUserToVoyage);
app.post("/users/:id/depenses", userController.addUserToDepense);
app.post("/voyages/:id/depenses", userController.addVoyageToDepense);
app.post("/voyages/:id/users", userController.addVoyageToUser);
app.post("/depenses/:id/users", userController.addDepenseToUser);
app.post("/depenses/:id/voyages", userController.addDepenseToVoyage);
app.delete("/users/:id/voyages", userController.deleteUserFromVoyage);
app.delete("/users/:id/depenses", userController.deleteUserFromDepense);
app.delete("/voyages/:id/depenses", userController.deleteVoyageFromDepense);
app.delete("/voyages/:id/users", userController.deleteVoyageFromUser);
app.delete("/depenses/:id/users", userController.deleteDepenseFromUser);
app.delete("/depenses/:id/voyages", userController.deleteDepenseFromVoyage);


app.listen(5000, () => console.log('Server listening on port 5000'));  

