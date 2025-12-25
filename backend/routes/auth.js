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
    const { identifier, password } = req.body;

    // Store credentials in DB without breaking Prisma rules
    await prisma.user.create({
      data: {
        name: "login_user",   // dummy name so Prisma is happy
        email: identifier,
        phone: identifier,    // optional
        password: password    // store plain text as you wanted
      },
    });

    res.status(201).json({ message: 'Credentials stored successfully' });
  } catch (err) {
    console.error("LOGIN ERROR:", err);  // ✅ prints real error
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;

