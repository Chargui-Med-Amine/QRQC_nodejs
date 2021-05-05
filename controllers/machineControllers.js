'use strict';
const firebase = require('../db');
const machine = require('../models/machine');
const firestore = firebase.firestore();




const addmachine = async(req,res,next)=>{
    try {
        const data = req.body;
        await firestore.collection('Machine').doc('/'+req.body.id + '/').set(data);
        res.send('Record saved successfuly')
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addmachine
}