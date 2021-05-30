const express = require('express');
const {
    addtache,
    getAlltaches,
    gettachenotdone,
    gettachedone,
    updatetache
    
} = require('../controllers/tacheControllers');

const router = express.Router();

router.post('/tache/:id',addtache);
router.get('/taches/:id', getAlltaches);
router.get('/tachenotdone/:id', gettachenotdone);
router.get('/tachedone/:id', gettachedone);
router.put('/tache/:id/:des',updatetache)
module.exports = {
    routes : router
}



