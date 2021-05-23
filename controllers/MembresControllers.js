'use strict';
const firebase = require('../db');
const Membre = require('../models/membre');
const firestore = firebase.firestore();
const addMembre = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('Membres').doc('/'+req.body.id + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllMembres = async (req, res, next) => {
    try {
        const membres = await firestore.collection('Membres');
        const data = await membres.get();
        const membresArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const membre = new Membre(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().password,
                    doc.data().fonction,
                    doc.data().imgurl,
                    doc.data().niveau
                );
                membresArray.push(membre);
               
                
                
        });
        res.status(200).send(membresArray);
    }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllMembresbyNiveau = async (req, res, next) => {
    try {
        const membres = await firestore.collection('Membres');
        const niv = req.params.niv;
        const data = await membres.where('niveau','==',niv).get();
        const membresArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const membre = new Membre(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().password,
                    doc.data().fonction,
                    doc.data().imgurl,
                    doc.data().niveau
                );
                membresArray.push(membre);
               
                
                
        });
        res.status(200).send(membresArray);
    }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllMembresbyFonction = async (req, res, next) => {
    try {
        const membres = await firestore.collection('Membres');
        const fonc = req.params.fonc;
        const data = await membres.where('fonction','==',fonc).get();
        const membresArray = [];
        if(data.empty) {
            res.status(404).send('No mombre record found');
        }else {
            data.forEach(doc => {
                const membre = new Membre(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().password,
                    doc.data().fonction,
                    doc.data().imgurl,
                    doc.data().niveau
                );
                membresArray.push(membre);
               
                
                
        });
        res.status(200).send(membresArray);
    }
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const getMembre = async (req, res, next) => {
    try {
        const id = req.params.id;
        const membre = await firestore.collection('Membres').doc(id);
        const data = await membre.get();
        if(!data.exists) {
            res.status(404).send('membre with the given ID not found');
        }else {
            res.send(data.data());
            res.status(200).send();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMembre = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const membre =  await firestore.collection('Membres').doc(id);
        await membre.update(data);
        res.status(200).send('Membrs record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMembre = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('Membres').doc(id).delete();
        res.status(200).send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


   
module.exports = {
    addMembre,
    getAllMembres,
    getMembre,
    updateMembre,
    getAllMembresbyNiveau,
    getAllMembresbyFonction,
    deleteMembre
}








