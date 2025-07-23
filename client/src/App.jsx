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

  if (loading) return <div>Loading habits...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="App">
      <h1>🎯 Habit Tracker</h1>
      
      <HabitForm onHabitCreated={handleHabitCreated} />
      <HabitList habits={habits} />
    </div>
  )
}

export default App