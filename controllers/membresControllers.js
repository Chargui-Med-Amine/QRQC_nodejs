'use strict';
const firebase = require('../db');
const Membre = require('../models/membre');
const firestore = firebase.firestore();
const addmembre = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('membres').doc('/'+req.body.id + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getAllmembres = async (req, res, next) => {
    try {
        const membres = await firestore.collection('membres');
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
const getAllmembresbyNiveau = async (req, res, next) => {
    try {
        const membres = await firestore.collection('membres');
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
const getAllmembresbyFonction = async (req, res, next) => {
    try {
        const membres = await firestore.collection('membres');
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



const getmembre = async (req, res, next) => {
    try {
        const id = req.params.id;
        const membre = await firestore.collection('membres').doc(id);
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

const updatemembre = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const membre =  await firestore.collection('membres').doc(id);
        await membre.update(data);
        res.status(200).send('Membrs record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletemembre = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('membres').doc(id).collection('TO_DO_LIST')
        .get()
  
  .then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
  
});
await firestore.collection('membres').doc(id).delete();

        res.status(200).send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


   
module.exports = {
    addmembre,
    getAllmembres,
    getmembre,
    updatemembre,
    getAllmembresbyNiveau,
    getAllmembresbyFonction,
    deletemembre
}








