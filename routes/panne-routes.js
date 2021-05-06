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
router.get('/panne/:id', getPanne);
router.put('/panne/:id', updatePanne);
router.delete('/panne/:id', deletePanne);

module.exports = {
    routes : router
}



