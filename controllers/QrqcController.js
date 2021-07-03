'use strict';
const firebase = require('../db');
const Qrqc = require('../models/journee/qrqc');
const firestore = firebase.firestore();




const addQrqc = async(req,res,next)=>{
    try {
        const data = req.body;
        //
        await firestore.collection('Qrqc').doc('/'+req.body.probleme + '/').set(data);
        res.send(req.body.probleme+' saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllQrqcs = async (req, res, next) => {
    try {
        
        const Qrqcs = await firestore.collection('Qrqc');
        const data = await Qrqcs.get();
        const QrqcsArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const qrqc = new Qrqc(
                    
                    
                    doc.data().id_personne,
                    doc.data().niveau,
                    doc.data().probleme,
                    doc.data().ref,
                    doc.data().produit,
                    doc.data().lieu,
                    doc.data().emp_piece,
                    doc.data().date,
                    doc.data().heure,
                    doc.data().taux,
                    doc.data().nbr,
                    doc.data().cause,
                    doc.data().nbrcause,
                    doc.data().action_im
                    
                );
                QrqcsArray.push(qrqc);
            });
            res.send(QrqcsArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getQrqc = async (req, res, next) => {
    try {
        
        const probleme = req.params.probleme;
        const Qrqc = await firestore.collection('Qrqc').doc(probleme);
        const data = await Qrqc.get();
        if(!data.exists) {
            res.status(404).send('Qrqc with the given probleme not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateQrqc = async (req, res, next) => {
    try {
        
        const probleme = req.params.probleme;
        const data = req.body;
        const Qrqc = await firestore.collection('Qrqc').doc(probleme);
        await Qrqc.update(data);
        res.status(200).send(probleme + ' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteQrqc = async (req, res, next) => {
    try {
        
        const probleme = req.params.probleme;
        await firestore.collection('Qrqc').doc(probleme).delete();
        res.status(200).send(probleme + ' deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addQrqc,   
    getAllQrqcs,
    getQrqc,
    updateQrqc,
    deleteQrqc
}








