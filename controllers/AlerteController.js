'use strict';
const firebase = require('../db');
const Alerte = require('../models/journee/alerte');
const firestore = firebase.firestore();




const addAlerte = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('Alerte').doc('/'+req.body.nom_alerte + '/').set(data);
        res.send(req.body.nom_alerte+' saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllAlertes = async (req, res, next) => {
    try {
        
        const Alertes = await firestore.collection('Alerte');
        const data = await Alertes.get();
        const AlertesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const alerte = new Alerte(
                    
                    doc.data().id_personne,
                    doc.data().date,
                    doc.data().nom_alerte,
                    doc.data().nom_machine,
                    doc.data().description,
                    doc.data().etat,
                    doc.data().niveau
                );
                AlertesArray.push(alerte);
            });
            res.send(AlertesArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAlerte = async (req, res, next) => {
    try {
        
        const nom_alerte = req.params.nom_alerte;
        const Alerte = await firestore.collection('Alerte').doc(nom_alerte);
        const data = await Alerte.get();
        if(!data.exists) {
            res.status(404).send('Alerte with the given nom_alerte not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateAlerte = async (req, res, next) => {
    try {
        
        const nom_alerte = req.params.nom_alerte;
        const data = req.body;
        const Alerte = await firestore.collection('Alerte').doc(nom_alerte);
        await Alerte.update(data);
        res.status(200).send(nom_alerte + ' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAlerte = async (req, res, next) => {
    try {
        
        const nom_alerte = req.params.nom_alerte;
        await firestore.collection('Alerte').doc(nom_alerte).delete();
        res.status(200).send(nom_alerte + ' deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addAlerte,   
    getAllAlertes,
    getAlerte,
    updateAlerte,
    deleteAlerte
}








