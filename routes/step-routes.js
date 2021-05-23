const express = require('express');
const {
    addStep,
    getAllSteps,
    getStep,
    updateStep,
    deleteStep,
    getStepbyordre
} = require('../controllers/StepControllers');

const router = express.Router();

router.post('/step/:nom_machine/:nom_panne',addStep);
router.get('/steps/:nom_machine/:nom_panne', getAllSteps);
router.get('/stepbyordre/:nom_machine/:nom_panne/:ord', getStepbyordre);
router.get('/step/:nom_machine/:nom_panne/:nom_step', getStep);
router.put('/step/:nom_machine/:nom_panne/:nom_step', updateStep);
router.delete('/step/:nom_machine/:nom_panne/:nom_step', deleteStep);

module.exports = {
    routes : router
}



