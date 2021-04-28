const express = require('express');
const {addmembre} = require('../controllers/MembresControllers');

const router = express.Router();

router.post('/membre',addmembre);

module.exports = {
    routes : router
}