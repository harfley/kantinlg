const { siswa, user, menu, stan, transaksi, detail_transaksi, menu_diskon, diskon } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
// const moment = require('moment');

// register user as pelanggan
exports.registerStan = async (req, res) => {
    try {
        const { username, password, nama_stan, nama_pemilik, telp } = req.body;
        // pw
        const hashedPassword = await bcrypt.hash(password, 10);


        // create user
        const newUser = await user.create({
            username,
            password: hashedPassword,
            role: 'admin_stan',
        });

        // create siswa
        const newStan = await stan.create({
            nama_stan,
            nama_pemilik,
            telp,
            userID: newUser.userID
        });

        res.status(200).json({ message: 'Stan registered successfully', data: newStan });
        // res.status(201).json({ message: 'Siswa registered successfully', data: newUser.userID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};