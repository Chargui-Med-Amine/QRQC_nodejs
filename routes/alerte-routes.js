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
router.get('/alertes/:date', getAllAlertes);
router.get('/alerte/:date/:nom_alerte', getAlerte);
router.put('/alerte/:date/:nom_alerte', updateAlerte);
router.delete('/alerte/:date/:nom_alerte', deleteAlerte);



module.exports = {
    routes : router
}
