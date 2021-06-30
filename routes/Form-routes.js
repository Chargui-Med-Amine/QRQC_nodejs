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
router.get('/forms/:date', getAllForms);
router.get('/formsbyref/:date/:ref', getAllFormsbyref);
router.get('/form/:date/:heure', getForm);
router.put('/form/:date/:heure', updateForm);
router.delete('/form/:date/:heure', deleteForm);



module.exports = {
    routes : router
}
