'use strict';
const firebase = require('../db');
const Panne = require('../models/panne');
const firestore = firebase.firestore();




const addPanne = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('machines').doc('/'+req.body.nom_machine+'/').collection('panne').doc('/'+req.body.nom_panne + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllPannes = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const pannes = await firestore.collection('machines').doc(nom_machine).collection('panne');
        const data = await pannes.get();
        const pannesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const panne = new Panne(
                    doc.data().nom_machine,
                    doc.data().nom_panne,
                    doc.data().description_panne,
                    doc.data().temps_estime
                );
                pannesArray.push(panne);
            });
            res.send(pannesArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getPanne = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const nom_panne = req.params.nom_panne;
        const panne = await firestore.collection('machines').doc(nom_machine).collection('panne').doc(nom_panne );
        const data = await panne.get();
        if(!data.exists) {
            res.status(404).send('panne with the given ID not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePanne = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const nom_panne = req.params.nom_panne;
        const data = req.body;
        const panne =  await firestore.collection('machines').doc(nom_machine).collection('panne').doc(nom_panne );
        await panne.update(data);
        res.status(200).send(nom_panne+' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePanne = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const nom_panne = req.params.nom_panne;
        await firestore.collection('machines').doc(nom_machine).collection('panne').doc(nom_panne ).delete();
        res.status(200).send(nom_panne+' deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addPanne,
    getAllPannes,
    getPanne,
    updatePanne,
    deletePanne
}








