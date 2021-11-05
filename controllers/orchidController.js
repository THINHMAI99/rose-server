'use strict';

const firebase = require('../db');
const rose = require('../models/rose');
const firestore = firebase.firestore();

const getAllroses = async (req, res) => {
    try{
        const roses = await firestore.collection('roses');
        
        const data = await roses.get();
        const rosesArray = [];
        if (data.empty){
            res.status(404).send('No rose record found');
        }
        else{
            data.forEach(element => {
                console.log(element)
                const orchild = new rose(
                    element.id,
                    element.data().Appellation,
                    element.data().Bloom_size,
                    element.data().Habit,
                    element.data().Height,
                    element.data().Name,                   
                    element.data().Petal_count,
                    element.data().Position,
                    element.data().Uses,                   
                    element.data().url,
                   // element.data().note
                );
                rosesArray.push(orchild);
            });
            res.send(rosesArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getrose = async(req, res, next) => {
    try{
        const uid = req.params.uid;
        const rose = await firestore.collection('roses').doc(uid);
        const data = await rose.get();
        if (!data.exists){
            res.status(404).send('rose with the given ID not found');
        }else{
            res.send(data.data());
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllroses,
    getrose
}