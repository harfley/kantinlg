const express = require('express');
const app = express();
const siswaController = require('../controllers/siswaController');

// Siswa Routes
app.post('/register', siswaController.registerSiswa);
app.post('/login', siswaController.loginSiswa);
// router.get('/menu', siswaController.getMenu);
// router.post('/order', siswaController.orderMenu);
// router.get('/status/:id_siswa', siswaController.getStatusPesanan);

// // History and Nota
// router.get('/history/:id_siswa/:month/:year', siswaController.getHistoryByMonth);
// router.get('/nota/:id_transaksi', siswaController.printNota);

module.exports = app;
