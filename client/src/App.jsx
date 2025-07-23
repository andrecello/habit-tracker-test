import { useState, useEffect } from 'react'
import './App.css'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'

function App() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch habits when component loads
  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/habits')
      
      if (!response.ok) {
        throw new Error('Failed to fetch habits')
      }
      
      const data = await response.json()
      setHabits(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching habits:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleHabitCreated = (newHabit) => {
    setHabits([...habits, newHabit])
  }

  // ADD THESE FUNCTIONS:
  const handleToggleComplete = async (habitId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}/toggle`, {
        method: 'PUT'
      })
      
      if (!response.ok) {
        throw new Error('Failed to toggle habit')
      }
      
      const updatedHabit = await response.json()
      setHabits(habits.map(habit => 
        habit.id === habitId ? updatedHabit : habit
      ))
    } catch (err) {
      console.error('Error toggling habit:', err)
    }
  }

  const handleDeleteHabit = async (habitId) => {
    if (!confirm('Are you sure you want to delete this habit?')) return
    
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete habit')
      }
      
      setHabits(habits.filter(habit => habit.id !== habitId))
    } catch (err) {
      console.error('Error deleting habit:', err)
    }
  }

  const handleUpdateHabit = async (habitId, newTitle) => {
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update habit')
      }
      
      const updatedHabit = await response.json()
      setHabits(habits.map(habit => 
        habit.id === habitId ? updatedHabit : habit
      ))
    } catch (err) {
      console.error('Error updating habit:', err)
    }
  }

  if (loading) return <div>Loading habits...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="App">
      <h1>🎯 Habit Tracker</h1>
      
      <HabitForm onHabitCreated={handleHabitCreated} />
      
      {/* MAKE SURE YOU PASS ALL THE FUNCTIONS: */}
      <HabitList 
        habits={habits} 
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteHabit}
        onUpdate={handleUpdateHabit}
      />
    </div>
  )
}

export default App