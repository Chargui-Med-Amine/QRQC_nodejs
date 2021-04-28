'use strict';
const firebase = require('../db');
const membre = require('../models/membre');
const firestore = firebase.firestore();




const addmembre = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('Membres').doc('/'+req.body.id + '/').set(data);
        res.send('Record saved successfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addmembre
}