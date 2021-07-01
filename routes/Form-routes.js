const express = require('express');
const {
    addForm,
    getAllForms,
    getForm,
    updateForm,
    getAllFormsbyref,
    deleteForm
    
   
} = require('../controllers/formController');

const router = express.Router();

router.post('/form',addForm);
router.get('/forms', getAllForms);
router.get('/formsbyref/:ref', getAllFormsbyref);
router.get('/form/:heure', getForm);
router.put('/form/:heure', updateForm);
router.delete('/form/:heure', deleteForm);



module.exports = {
    routes : router
}
