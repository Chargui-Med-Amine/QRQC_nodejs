'use strict';
const firebase = require('../db');
const Alerte = require('../models/journee/alerte');
const firestore = firebase.firestore();




const addAlerte = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('Journee').doc('/'+req.body.nom_Alerte + '/').set(data);
        res.send(req.body.nom_Alerte+' saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllAlertes = async (req, res, next) => {
    try {
        const Alertes = await firestore.collection('Alertes');
        const data = await Alertes.get();
        const AlertesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const Alerte = new Alerte(
                    doc.data().nom_Alerte,
                    doc.data().imgurl,
                    doc.data().nombre_de_panne
                );
                AlertesArray.push(Alerte);
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
        const nom_Alerte = req.params.nom_Alerte;
        const Alerte = await firestore.collection('Alertes').doc(nom_Alerte);
        const data = await Alerte.get();
        if(!data.exists) {
            res.status(404).send('Alerte with the given nom_Alerte not found');
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
        const nom_Alerte = req.params.nom_Alerte;
        const data = req.body;
        const Alerte =  await firestore.collection('Alertes').doc(nom_Alerte);
        await Alerte.update(data);
        res.status(200).send(nom_Alerte + ' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAlerte = async (req, res, next) => {
    try {
        const nom_Alerte = req.params.nom_Alerte;
        await firestore.collection('Alertes').doc(nom_Alerte).delete();
        res.status(200).send(nom_Alerte + ' deleted successfuly');
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








