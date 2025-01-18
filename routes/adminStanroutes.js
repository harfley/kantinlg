const express = require('express');
const app = express();
const adminStanController = require('../controllers/adminStanController');

// Admin Stan Routes
app.post('/register', adminStanController.registerStan);
// router.post('/login', adminStanController.loginStan);
// router.put('/profile/:id', adminStanController.updateProfilStan);

// // CRUD Diskon
// router.post('/diskon', adminStanController.createDiskon);
// router.put('/diskon/:id', adminStanController.updateDiskon);
// router.delete('/diskon/:id', adminStanController.deleteDiskon);
// router.post('/diskon/menu', adminStanController.addMenuToDiskon);
// router.get('/diskon/:id_stan', adminStanController.getDiskonByStan);

module.exports = app;
