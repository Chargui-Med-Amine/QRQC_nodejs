'use strict';
const firebase = require('../db');
const Qrqc = require('../models/journee/qrqc');
const firestore = firebase.firestore();




const addQrqc = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('Journee').doc('/'+req.body.date + '/').collection('Qrqc').doc('/'+req.body.nom_Qrqc + '/').set(data);
        res.send(req.body.nom_Qrqc+' saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllQrqcs = async (req, res, next) => {
    try {
        const date = req.params.date;
        const Qrqcs = await firestore.collection('Journee').doc(date).collection('Qrqc');
        const data = await Qrqcs.get();
        const QrqcsArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const Qrqc = new Qrqc(
                    
                    doc.data().id_personne,
                    doc.data().date,
                    doc.data().nom_Qrqc,
                    doc.data().nom_machine,
                    doc.data().description,
                    doc.data().etat
                );
                QrqcsArray.push(Qrqc);
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
        const date = req.params.date;
        const nom_Qrqc = req.params.nom_Qrqc;
        const Qrqc = await firestore.collection('Journee').doc(date).collection('Qrqc').doc(nom_Qrqc);
        const data = await Qrqc.get();
        if(!data.exists) {
            res.status(404).send('Qrqc with the given nom_Qrqc not found');
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
        const date = req.params.date;
        const nom_Qrqc = req.params.nom_Qrqc;
        const data = req.body;
        const Qrqc = await firestore.collection('Journee').doc(date).collection('Qrqc').doc(nom_Qrqc);
        await Qrqc.update(data);
        res.status(200).send(nom_Qrqc + ' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteQrqc = async (req, res, next) => {
    try {
        const date = req.params.date;
        const nom_Qrqc = req.params.nom_Qrqc;
        await firestore.collection('Journee').doc(date).collection('Qrqc').doc(nom_Qrqc).delete();
        res.status(200).send(nom_Qrqc + ' deleted successfuly');
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








