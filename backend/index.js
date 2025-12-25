const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Enable CORS
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Automatically create User table if it doesn't exist
async function initDB() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(255) UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log("User table checked/created ✅");
  } catch (err) {
    console.error("Error creating User table:", err);
  }
}

// Run DB initialization
initDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/debug', require('./routes/debug'));

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

