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
router.get('/machine/:id', getMachine);
router.put('/machine/:id', updateMachine);
router.delete('/machine/:id', deleteMachine);

module.exports = {
    routes : router
}



