'use strict';
const firebase = require('../db');
const Piece = require('../models/piece');
const Defaut_piece = require('../models/defaut_piece');
const firestore = firebase.firestore();




const addpiece = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('pieces').doc('/'+req.body.ref + '/').set(data);
        res.send(req.body.ref+' saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllpieces = async (req, res, next) => {
    try {
        const pieces = await firestore.collection('pieces');
        const data = await pieces.get();
        const piecesArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const piece = new Piece(
                    doc.data().ref,
                    doc.data().description,
                    doc.data().imgurl
                );
                piecesArray.push(piece);
            });
            res.send(piecesArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getpiece = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const piece = await firestore.collection('pieces').doc(ref);
        const data = await piece.get();
        if(!data.exists) {
            res.status(404).send('piece with the given ref not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatepiece = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const data = req.body;
        const piece =  await firestore.collection('pieces').doc(ref);
        await piece.update(data);
        res.status(200).send(ref + ' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletepiece = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        await firestore.collection('pieces').doc(ref).delete();
        res.status(200).send(ref + ' deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//Defaut Piece
const adddefaut = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('pieces').doc('/'+req.body.ref+'/').collection('defaut').doc('/'+req.body.nom_defaut + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAlldefauts = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const defauts = await firestore.collection('pieces').doc(ref).collection('defaut');
        const data = await defauts.get();
        const defautsArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const defaut = new Defaut_piece(
                    doc.data().ref,
                    doc.data().nom_defaut,
                    doc.data().description,
                    doc.data().imgurl
                );
                defautsArray.push(defaut);
            });
            res.send(defautsArray);
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getdefaut = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const nom_defaut = req.params.nom_defaut;
        const defaut = await firestore.collection('pieces').doc(ref).collection('defaut').doc(nom_defaut );
        const data = await defaut.get();
        if(!data.exists) {
            res.status(404).send('defaut with the given ID not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatedefaut = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const nom_defaut = req.params.nom_defaut;
        const data = req.body;
        const defaut =  await firestore.collection('pieces').doc(ref).collection('defaut').doc(nom_defaut );
        await defaut.update(data);
        res.status(200).send(nom_defaut+' updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletedefaut = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const nom_defaut = req.params.nom_defaut;
        await firestore.collection('pieces').doc(ref).collection('defaut').doc(nom_defaut ).delete();
        res.status(200).send(nom_defaut+' deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addpiece,   
    getAllpieces,
    getpiece,
    updatepiece,
    deletepiece,
    adddefaut,
    getAlldefauts,
    getdefaut,
    updatedefaut,
    deletedefaut
}








