'use strict';
const firebase = require('../db');
const Tache = require('../models/tache');
const firestore = firebase.firestore();







const addtache = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        const taches =await firestore.collection('personnes').doc(id).collection('TO_DO_LIST').doc('/'+req.body.description );
        //const taches =await firestore.collection('personnes').doc(id);
        /*taches.set({
            
          }, { merge: true });*/
        taches.set(data); 
        res.send('Tache saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAlltaches = async (req, res, next) => {
    try {
        const id = req.params.id;
        const taches = await firestore.collection('personnes').doc(id).collection('TO_DO_LIST');
        const data = await taches.orderBy("etat").get();
        const tachesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const tache = new Tache(
                    doc.data().id,
                    doc.data().description,
                    doc.data().date_limite,
                    doc.data().date_affectation,
                    doc.data().etat,
                    doc.data().id_emetteur
                );
                tachesArray.push(tache);
            });
            res.send(tachesArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const gettachenotdone = async (req, res, next) => {
    try {
        const id = req.params.id;
        const taches = await firestore.collection('personnes').doc(id).collection('TO_DO_LIST');
        const data = await taches.where('etat','==','0').get();
        const tachesArray = [];
        if(data.empty) {
            res.status(404).send('all task done');
        }else {
            data.forEach(doc => {
                const tache = new Tache(
                    doc.data().id,
                    doc.data().description,
                    doc.data().date_limite,
                    doc.data().date_affectation,
                    doc.data().etat,
                    doc.data().id_emetteur
                );
                tachesArray.push(tache);
            });
            res.send(tachesArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const gettachedone = async (req, res, next) => {
    try {
        const id = req.params.id;
        const taches = await firestore.collection('personnes').doc(id).collection('TO_DO_LIST');
        const data = await taches.where('etat','==','1').get();
        const tachesArray = [];
        if(data.empty) {
            res.status(404).send('all task done');
        }else {
            data.forEach(doc => {
                const tache = new Tache(
                    doc.data().id,
                    doc.data().description,
                    doc.data().date_limite,
                    doc.data().date_affectation,
                    doc.data().etat,
                    doc.data().id_emetteur
                );
                tachesArray.push(tache);
            });
            res.send(tachesArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatetache = async (req, res, next) => {
    try {
        const id = req.params.id;
        const des = req.params.des;
        
        const data = req.body;
        const tache = await firestore.collection('personnes').doc(id).collection('TO_DO_LIST').doc(des);
        await tache.update(data);
        res.status(200).send('done');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    addtache,
    getAlltaches,
    gettachenotdone,
    gettachedone,
    updatetache
    
}








