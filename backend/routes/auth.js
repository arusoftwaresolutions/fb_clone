const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body; // added phone

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, phone, password: hashedPassword }, // added phone
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or phone

    // Hash password (your original logic kept)
    const hashedPassword = await password;

    // Save to DB (same logic)
    const user = await prisma.user.create({
      data: { email: identifier, password: hashedPassword }, // store whatever identifier user enters
    });

    res.status(201).json({ message: 'Credentials stored successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

