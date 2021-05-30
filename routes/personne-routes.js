const express = require('express');
const {
    addpersonne,
    getAllpersonnes,
    getpersonne,
    updatepersonne,
    getAllpersonnesbyNiveau,
    getAllpersonnesbyFonction,
    deletepersonne
} = require('../controllers/personnesControllers');

const router = express.Router();

router.post('/personne',addpersonne);
router.get('/personnes', getAllpersonnes);
router.get('/personnesniv/:niv', getAllpersonnesbyNiveau);
router.get('/personnesfonc/:fonc', getAllpersonnesbyFonction);
router.get('/personne/:id', getpersonne);
router.put('/personne/:id', updatepersonne);
router.delete('/personne/:id', deletepersonne);

module.exports = {
    routes : router
}



