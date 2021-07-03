const express = require('express');
const {
    addtache,
    getAlltaches,
    gettachenotdone,
    gettachedone,
    addtachebyid,
    updatetache
    
} = require('../controllers/tacheControllers');

const router = express.Router();

router.post('/tache/:fonction',addtache);
router.post('/tachebyid/:id',addtachebyid);
router.get('/taches/:id', getAlltaches);
router.get('/tachenotdone/:id', gettachenotdone);
router.get('/tachedone/:id', gettachedone);
router.put('/tache/:id/:des',updatetache)
module.exports = {
    routes : router
}



