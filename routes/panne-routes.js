const express = require('express');
const {
    addPanne,
    getAllPannes,
    getPanne,
    updatePanne,
    deletePanne
} = require('../controllers/PanneControllers');

const router = express.Router();

router.post('/panne/:nom_machine',addPanne);
router.get('/pannes/:nom_machine', getAllPannes);
router.get('/panne/:nom_machine/:nom_panne', getPanne);
router.put('/panne/:nom_machine/:nom_panne', updatePanne);
router.delete('/panne/:nom_machine/:nom_panne', deletePanne);

module.exports = {
    routes : router
}



