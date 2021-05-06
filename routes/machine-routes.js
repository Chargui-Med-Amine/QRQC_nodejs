const express = require('express');
const {
    addMachine,
    getAllMachines,
    getMachine,
    updateMachine,
    deleteMachine
} = require('../controllers/MachineControllers');

const router = express.Router();

router.post('/machine',addMachine);
router.get('/machines', getAllMachines);
router.get('/machine/:nom_machine', getMachine);
router.put('/machine/:nom_machine', updateMachine);
router.delete('/machine/:nom_machine', deleteMachine);

module.exports = {
    routes : router
}



