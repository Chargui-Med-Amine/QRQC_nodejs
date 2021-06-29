'use strict';
const firebase = require('../db');
const Journee = require('../models/journee/journee');
const firestore = firebase.firestore();



const addJournee = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('Journee').doc('/'+req.body.date+ '/').set(data);
        res.send(req.body.date+' saved successfuly')
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
                const journee = new Journee(
                    doc.data().date
                    
                );
                JourneesArray.push(journee);
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
        const date = req.params.date;
        const Journee = await firestore.collection('Journees').doc(date);
        const data = await Journee.get();
        if(!data.exists) {
            res.status(404).send('Journee with the given date not found');
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
        const date = req.params.date;
        const data = req.body;
        const Journee =  await firestore.collection('Journees').doc(date);
        await Journee.update(data);
        res.status(200).send(date + ' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteJournee = async (req, res, next) => {
    try {
        const date = req.params.date;
        await firestore.collection('Journees').doc(date).delete();
        res.status(200).send(date + ' deleted successfuly');
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








