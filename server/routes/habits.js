const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/habits/create-test-user - create test user
router.post('/create-test-user', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: `test${Date.now()}@example.com`,
        password: 'test123'
      }
    });
    res.json({ message: 'Test user created', user });
  } catch (err) {
    console.error("Error creating test user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/habits - CREATE A HABIT (this was missing!)
router.post('/', async (req, res) => {
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ error: "Title and userId are required" });
  }

  try {
    const newHabit = await prisma.habit.create({
      data: {
        title,
        userId: parseInt(userId)
      }
    });
    res.json(newHabit);
  } catch (err) {
    console.error("Error creating habit:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/habits - get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await prisma.habit.findMany();
    res.json(habits);
  } catch (err) {
    console.error("Error fetching habits:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;