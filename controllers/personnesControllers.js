'use strict';
const firebase = require('../db');
const Personne = require('../models/personne');
const firestore = firebase.firestore();
const addpersonne = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('personnes').doc('/'+req.body.id + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllpersonnes = async (req, res, next) => {
    try {
        const personnes = await firestore.collection('personnes');
        const data = await personnes.get();
        const personnesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const personne = new Personne(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().password,
                    doc.data().fonction,
                    doc.data().imgurl,
                    doc.data().niveau
                );
                personnesArray.push(personne);
               
                
                
        });
        res.status(200).send(personnesArray);
    }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllpersonnesbyNiveau = async (req, res, next) => {
    try {
        const personnes = await firestore.collection('personnes');
        const niv = req.params.niv;
        const data = await personnes.where('niveau','==',niv).get();
        const personnesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const personne = new Personne(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().password,
                    doc.data().fonction,
                    doc.data().imgurl,
                    doc.data().niveau
                );
                personnesArray.push(personne);
               
                
                
        });
        res.status(200).send(personnesArray);
    }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllpersonnesbyFonction = async (req, res, next) => {
    try {
        const personnes = await firestore.collection('personnes');
        const fonc = req.params.fonc;
        const data = await personnes.where('fonction','==',fonc).get();
        const personnesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const personne = new Personne(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().password,
                    doc.data().fonction,
                    doc.data().imgurl,
                    doc.data().niveau
                );
                personnesArray.push(personne);
               
                
                
        });
        res.status(200).send(personnesArray);
    }
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getpersonne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const personne = await firestore.collection('personnes').doc(id);
        const data = await personne.get();
        if(!data.exists) {
            res.status(404).send('personne with the given ID not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatepersonne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const personne =  await firestore.collection('personnes').doc(id);
        await personne.update(data);
        res.status(200).send('Membrs record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletepersonne = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('personnes').doc(id).delete();
        res.status(200).send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


   
module.exports = {
    addpersonne,
    getAllpersonnes,
    getpersonne,
    updatepersonne,
    getAllpersonnesbyNiveau,
    getAllpersonnesbyFonction,
    deletepersonne
}








