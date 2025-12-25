const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash password
        const hashedPassword = await password;

        // Save to DB
        const user = new prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

        res.status(201).json({ message: 'Credentials stored successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;

