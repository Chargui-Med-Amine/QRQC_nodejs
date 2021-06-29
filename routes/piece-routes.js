const express = require('express');
const {
    addpiece,   
    getAllpieces,
    getpiece,
    updatepiece,
    deletepiece,
    adddefaut,
    getAlldefauts,
    getdefaut,
    updatedefaut,
    deletedefaut
} = require('../controllers/PieceController');

const router = express.Router();

router.post('/piece',addpiece);
router.get('/pieces', getAllpieces);
router.get('/piece/:ref', getpiece);
router.put('/piece/:ref', updatepiece);
router.delete('/piece/:ref', deletepiece);
router.post('/defaut/:ref',adddefaut);
router.get('/defauts/:ref', getAlldefauts);
router.get('/defaut/:ref/:nom_defaut', getdefaut);
router.put('/defaut/:ref/:nom_defaut', updatedefaut);
router.delete('/defaut/:ref/:nom_defaut', deletedefaut);


module.exports = {
    routes : router
}



