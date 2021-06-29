'use strict';
const firebase = require('../db');
const Journee = require('../models/journee/journee');
const firestore = firebase.firestore();



const addJournee = async(req,res,next)=>{
    try {
        const data = req.body;
        let date= new Date();
        await firestore.collection('Journee').doc('/'+toString(date)+ '/').set(data);
        res.send(req.body.nom_Journee+' saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllJournees = async (req, res, next) => {
    try {
        const Journees = await firestore.collection('Journees');
        const data = await Journees.get();
        const JourneesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const Journee = new Journee(
                    doc.data().nom_Journee,
                    doc.data().imgurl,
                    doc.data().nombre_de_panne
                );
                JourneesArray.push(Journee);
            });
            res.send(JourneesArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getJournee = async (req, res, next) => {
    try {
        const nom_Journee = req.params.nom_Journee;
        const Journee = await firestore.collection('Journees').doc(nom_Journee);
        const data = await Journee.get();
        if(!data.exists) {
            res.status(404).send('Journee with the given nom_Journee not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateJournee = async (req, res, next) => {
    try {
        const nom_Journee = req.params.nom_Journee;
        const data = req.body;
        const Journee =  await firestore.collection('Journees').doc(nom_Journee);
        await Journee.update(data);
        res.status(200).send(nom_Journee + ' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteJournee = async (req, res, next) => {
    try {
        const nom_Journee = req.params.nom_Journee;
        await firestore.collection('Journees').doc(nom_Journee).delete();
        res.status(200).send(nom_Journee + ' deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addJournee,   
    getAllJournees,
    getJournee,
    updateJournee,
    deleteJournee
}








