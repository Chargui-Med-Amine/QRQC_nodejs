const express = require('express');
const {
    addJournee,
    getAllJournees,
    getJournee,
    updateJournee,
    deleteJournee
    
   
} = require('../controllers/JourneeController');

const router = express.Router();

router.post('/journee',addJournee);
router.get('/journees', getAllJournees);
router.get('/journee/:date', getJournee);
router.put('/journee/:date', updateJournee);
router.delete('/journee/:date', deleteJournee);



module.exports = {
    routes : router
}
