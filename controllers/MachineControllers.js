'use strict';
const firebase = require('../db');
const machine = require('../models/machine');
const firestore = firebase.firestore();




const addMachine = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('machines').doc('/'+req.body.nom_machine + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllMachines = async (req, res, next) => {
    try {
        const machine = await firestore.collection('machines');
        const data = await machine.get();
        const machinesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const machine = new machine(
                    doc.nom_machine,
                    doc.data().ImgUrl,
                    doc.data().nombre_de_panne
                );
                machinesArray.push(machine);
            });
            res.send(machinesArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getMachine = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const machine = await firestore.collection('machines').doc(nom_machine);
        const data = await machine.get();
        if(!data.exists) {
            res.status(404).send('machine with the given nom_machine not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMachine = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        const data = req.body;
        const machine =  await firestore.collection('machines').doc(nom_machine);
        await machine.update(data);
        res.status(200).send('Membrs record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMachine = async (req, res, next) => {
    try {
        const nom_machine = req.params.nom_machine;
        await firestore.collection('machines').doc(nom_machine).delete();
        res.status(200).send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addMachine,
    getAllMachines,
    getMachine,
    updateMachine,
    deleteMachine
}








