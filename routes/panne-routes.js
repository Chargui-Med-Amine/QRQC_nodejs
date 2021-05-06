const express = require('express');
const {
    addPanne,
    getAllPannes,
    getPanne,
    updatePanne,
    deletePanne
} = require('../controllers/PanneControllers');

const router = express.Router();

router.post('/panne',addPanne);
router.get('/pannes', getAllPannes);
router.get('/panne/:nom_machine', getPanne);
router.put('/panne/:nom_machine', updatePanne);
router.delete('/panne/:nom_machine', deletePanne);

module.exports = {
    routes : router
}



