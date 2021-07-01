const express = require('express');
const {
    addAlerte,
    getAllAlertes,
    getAlerte,
    updateAlerte,
    deleteAlerte
    
   
} = require('../controllers/AlerteController');

const router = express.Router();

router.post('/alerte',addAlerte);
router.get('/alertes', getAllAlertes);
router.get('/alerte/:nom_alerte', getAlerte);
router.put('/alerte/:nom_alerte', updateAlerte);
router.delete('/alerte/:nom_alerte', deleteAlerte);



module.exports = {
    routes : router
}
