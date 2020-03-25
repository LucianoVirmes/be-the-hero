const express = require("express");
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post("/ongs", OngController.criar);
routes.get("/ongs", OngController.index);
routes.post("/incidents", IncidentController.criar);
routes.get("/incidents", IncidentController.index);
routes.delete("/incidents/:id",IncidentController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/sessions", SessionController.criar);
module.exports = routes;
