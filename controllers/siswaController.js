const { siswa, user, menu, transaksi, detail_transaksi, menu_diskon, diskon } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize')
const md5 = require ('md5');
// const moment = require('moment');

// register user as pelanggan
exports.registerSiswa = async (req, res) => {
    try {
        const { username, password, nama_siswa, alamat, telp, foto } = req.body;
        // pw
        const hashedPassword = await bcrypt.hash(password, 10);


        // create user
        const newUser = await user.create({
            username,
            password: hashedPassword,
            role: 'siswa',
        });

        // create siswa
        const newSiswa = await siswa.create({
            nama_siswa,
            alamat,
            telp,
            userID: newUser.userID,
            foto
        });

        res.status(201).json({ message: 'Siswa registered successfully', data: newSiswa });
        // res.status(201).json({ message: 'Siswa registered successfully', data: newUser.userID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
// login 
exports.loginSiswa = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cari user berdasarkan username dan role
        const foundUser = await user.findOne({ where: { username } });
        if (!foundUser || foundUser.role !== 'siswa') {
            return res.status(404).json({ message: 'User not found or not a siswa' });
        }

        // Validasi password
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate token dengan payload berisi siswaID dan role
        const token = jwt.sign(
            { siswaID: foundUser.userID, role: foundUser.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        // Kirim respons sukses dengan token
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update Siswa
exports.updateSiswa = async (req, res) => {
    try {
        const { siswaID } = req.params; // Ambil ID siswa dari parameter URL
        const { nama_siswa, alamat, telp, foto } = req.body;

        // Cari siswa berdasarkan ID
        const foundSiswa = await siswa.findOne({ where: { siswaID } });
        if (!foundSiswa) {
            return res.status(404).json({ message: 'Siswa not found' });
        }

        // Update data siswa
        await foundSiswa.update({
            nama_siswa: nama_siswa || foundSiswa.nama_siswa,
            alamat: alamat || foundSiswa.alamat,
            telp: telp || foundSiswa.telp,
            foto: foto || foundSiswa.foto,
        });

        res.status(200).json({ message: 'Siswa updated successfully', data: foundSiswa });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
