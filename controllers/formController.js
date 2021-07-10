'use strict';
const firebase = require('../db');
const Form = require('../models/journee/form');
const firestore = firebase.firestore();




const addForm = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('Form').doc().set(data);
        res.send(req.body.heure+' saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllForms = async (req, res, next) => {
    try {
         
        const Forms = await firestore.collection('Form');
        const data = await Forms.get();
        const FormsArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const form = new Form(
                    
                    doc.data().id_personne,
                    doc.data().ref,
                    doc.data().date,
                    doc.data().heure,
                    doc.data().nbr_totale,
                    doc.data().nbr_nok
                );
                FormsArray.push(form);
            });
            res.send(FormsArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllFormsbyref = async (req, res, next) => {
    try {
         
        const ref = req.params.ref;
        const Forms = await firestore.collection('Form');
        const data = await Forms.where('ref','==',ref).get();
        const FormsArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const form = new Form(
                    
                    doc.data().id_personne,
                    doc.data().ref,
                    doc.data().date,
                    doc.data().heure,
                    doc.data().nbr_totale,
                    doc.data().nbr_nok
                );
                FormsArray.push(form);
            });
            res.send(FormsArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getForm = async (req, res, next) => {
    try {
         
        const heure = req.params.heure;
        const Form = await firestore.collection('Form').doc(heure);
        const data = await Form.get();
        if(!data.exists) {
            res.status(404).send('Form with the given heure not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateForm = async (req, res, next) => {
    try {
         
        const heure = req.params.heure;
        const data = req.body;
        const Form = await firestore.collection('Form').doc(heure);
        await Form.update(data);
        res.status(200).send(heure + ' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteForm = async (req, res, next) => {
    try {
         
        const heure = req.params.heure;
        await firestore.collection('Form').doc(heure).delete();
        res.status(200).send(heure + ' deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addForm,   
    getAllForms,
    getForm,
    updateForm,
    getAllFormsbyref,
    deleteForm
}








