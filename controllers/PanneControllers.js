'use strict';
const firebase = require('../db');
const panne = require('../models/panne');
const firestore = firebase.firestore();




const addPanne = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('pannes').doc('/'+req.body.id + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllPannes = async (req, res, next) => {
    try {
        const panne = await firestore.collection('pannes');
        const data = await panne.get();
        const pannesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const panne = new panne(
                    doc.id,
                    doc.data().FirstName,
                    doc.data().LastName,
                    doc.data().Fonction
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
        const id = req.params.id;
        const panne = await firestore.collection('pannes').doc(id);
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
        const id = req.params.id;
        const data = req.body;
        const panne =  await firestore.collection('pannes').doc(id);
        await panne.update(data);
        res.status(200).send('Membrs record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePanne = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('pannes').doc(id).delete();
        res.status(200).send('Record deleted successfuly');
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








