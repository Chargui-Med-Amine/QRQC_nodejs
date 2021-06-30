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
router.get('/qrqcs/:date', getAllQrqcs);
router.get('/qrqc/:date/:probleme', getQrqc);
router.put('/qrqc/:date/:probleme', updateQrqc);
router.delete('/qrqc/:date/:probleme', deleteQrqc);



module.exports = {
    routes : router
}
