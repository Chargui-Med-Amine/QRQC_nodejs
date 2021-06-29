const express = require('express');
const {
    addJournee,
    
   
} = require('../controllers/JourneeController');

const router = express.Router();

router.post('/journee',addJournee);


module.exports = {
    routes : router
}
