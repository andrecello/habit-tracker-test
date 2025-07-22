const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/habits - create a habit
router.post('/', async (req, res) => {
  const { title, userId } = req.body;

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

// GET /api/habits - list all habits
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