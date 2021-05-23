const express = require('express');
const {
    addMembre,
    getAllMembres,
    getMembre,
    updateMembre,
    getAllMembresbyNiveau,
    getAllMembresbyFonction,
    deleteMembre
} = require('../controllers/MembresControllers');

const router = express.Router();

router.post('/membre',addMembre);
router.get('/membres', getAllMembres);
router.get('/membresniv/:niv', getAllMembresbyNiveau);
router.get('/membresfonc/:fonc', getAllMembresbyFonction);
router.get('/membre/:id', getMembre);
router.put('/membre/:id', updateMembre);
router.delete('/membre/:id', deleteMembre);

module.exports = {
    routes : router
}



