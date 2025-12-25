const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Secret-protected debug route
router.get('/users', async (req, res) => {
  try {
    // Check query param ?secret=YOUR_SECRET
    const secret = req.query.secret;
    if (secret !== process.env.DEBUG_SECRET) {
      return res.status(403).json({ message: 'Forbidden: Invalid secret' });
    }

    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error("DEBUG ERROR:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

