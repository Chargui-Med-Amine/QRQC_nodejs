const express = require('express');
const {
    addmembre,
    getAllmembres,
    getmembre,
    updatemembre,
    getAllmembresbyNiveau,
    getAllmembresbyFonction,
    deletemembre
} = require('../controllers/membresControllers');

const router = express.Router();

router.post('/membre',addmembre);
router.get('/membres', getAllmembres);
router.get('/membresniv/:niv', getAllmembresbyNiveau);
router.get('/membresfonc/:fonc', getAllmembresbyFonction);
router.get('/membre/:id', getmembre);
router.put('/membre/:id', updatemembre);
router.delete('/membre/:id', deletemembre);

module.exports = {
    routes : router
}



