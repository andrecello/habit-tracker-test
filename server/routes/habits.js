const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth'); // Add this
const prisma = new PrismaClient();

// Remove the test user route - we don't need it anymore!

// POST /api/habits - CREATE A HABIT (now requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  const { title } = req.body;
  const userId = req.user.userId; // Get from authenticated user

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const newHabit = await prisma.habit.create({
      data: {
        title,
        userId: userId // Use authenticated user's ID
      }
    });
    res.json(newHabit);
  } catch (err) {
    console.error("Error creating habit:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/habits - get habits for authenticated user only
router.get('/', authenticateToken, async (req, res) => {
  try {
    const habits = await prisma.habit.findMany({
      where: {
        userId: req.user.userId // Only get this user's habits
      }
    });
    res.json(habits);
  } catch (err) {
    console.error("Error fetching habits:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/habits/:id/toggle - toggle habit completion (with auth)
router.put('/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const habit = await prisma.habit.findFirst({
      where: { 
        id: parseInt(req.params.id),
        userId: req.user.userId // Make sure user owns this habit
      }
    });
    
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    
    const updatedHabit = await prisma.habit.update({
      where: { id: parseInt(req.params.id) },
      data: { completed: !habit.completed }
    });
    
    res.json(updatedHabit);
  } catch (err) {
    console.error("Error updating habit:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/habits/:id - delete habit (with auth)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const habit = await prisma.habit.findFirst({
      where: { 
        id: parseInt(req.params.id),
        userId: req.user.userId // Make sure user owns this habit
      }
    });
    
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    
    await prisma.habit.delete({
      where: { id: parseInt(req.params.id) }
    });
    
    res.json({ message: "Habit deleted successfully" });
  } catch (err) {
    console.error("Error deleting habit:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/habits/:id - update habit title (with auth)
router.put('/:id', authenticateToken, async (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  
  try {
    const habit = await prisma.habit.findFirst({
      where: { 
        id: parseInt(req.params.id),
        userId: req.user.userId // Make sure user owns this habit
      }
    });
    
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    
    const updatedHabit = await prisma.habit.update({
      where: { id: parseInt(req.params.id) },
      data: { title }
    });
    
    res.json(updatedHabit);
  } catch (err) {
    console.error("Error updating habit:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;