const express = require('express');
const { getAllroses, getrose} = require('../controllers/roseController')
const router = express.Router();

router.get('/roses', getAllroses);
router.get('/rose/:uid', getrose);

module.exports = {
    routes: router
}
