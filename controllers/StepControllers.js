'use strict';
const firebase = require('../db');
const Step = require('../models/step');
const firestore = firebase.firestore();




const addStep = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('machines').doc('/'+req.body.nom_machine+'/').collection('panne').doc('/'+req.body.nom_panne + '/').collection('Step').doc('/'+req.body.nom_step + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllSteps = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const nom_panne = req.params.nom_panne;
        const steps = await firestore.collection('machines').doc(nom_machine).collection('panne').doc(nom_panne).collection('Step');
        const data = await steps.get();
        const stepsArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const step = new Step(
                    doc.data().nom_machine,
                    doc.data().nom_panne,
                    doc.data().nom_step,
                    doc.data().description_step,
                    doc.data().ordre
                );
                stepsArray.push(step);
            });
            res.send(stepsArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getStep = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const nom_panne = req.params.nom_panne;
        const nom_step = req.params.nom_step;
        const step = await firestore.collection('machines').doc(nom_machine).collection('panne').doc(nom_panne ).collection('Step').doc(nom_step);
        const data = await step.get();
        if(!data.exists) {
            res.status(404).send('step with the given ID not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStep = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const nom_panne = req.params.nom_panne;
        const nom_step = req.params.nom_step;
        const data = req.body;
        const step =  await firestore.collection('machines').doc(nom_machine).collection('panne').doc(nom_panne ).collection('Step').doc(nom_step);
        await step.update(data);
        res.status(200).send('The Step  '+nom_step+' of the '+nom_panne+' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStep = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const nom_panne = req.params.nom_panne;
        const nom_step = req.params.nom_step;
        await firestore.collection('machines').doc(nom_machine).collection('panne').doc(nom_panne ).collection('Step').doc(nom_step).delete();
        res.status(200).send('The Step  '+nom_step+' of the '+nom_panne+' deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStep,
    getAllSteps,
    getStep,
    updateStep,
    deleteStep
}








