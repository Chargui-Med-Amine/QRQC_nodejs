const express = require('express');
const {
    addQrqc,
    getAllQrqcs,
    getQrqc,
    updateQrqc,
    deleteQrqc
    
   
} = require('../controllers/QrqcController');

const router = express.Router();

router.post('/qrqc',addQrqc);
router.get('/qrqcs', getAllQrqcs);
router.get('/qrqc/:probleme', getQrqc);
router.put('/qrqc/:probleme', updateQrqc);
router.delete('/qrqc/:probleme', deleteQrqc);



module.exports = {
    routes : router
}
