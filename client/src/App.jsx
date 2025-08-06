import { useState, useEffect } from 'react'
import './App.css'
import HabitForm from './components/HabitForm'
import HabitList from './components/HabitList'
import AuthForm from './components/AuthForm'

function App() {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Authentication state
  const [user, setUser] = useState(null)
  const [authToken, setAuthToken] = useState(null)
  const [showLogin, setShowLogin] = useState(true) // true = login, false = register

  // Check for existing authentication on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      setAuthToken(savedToken)
      setUser(JSON.parse(savedUser))
    } else {
      setLoading(false) // No auth, show login form
    }
  }, [])

  // Fetch habits when user is authenticated
  useEffect(() => {
    if (user && authToken) {
      fetchHabits()
    }
  }, [user, authToken])

  const fetchHabits = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/habits', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Token expired or invalid, logout user
          handleLogout()
          return
        }
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

  const handleAuthSuccess = (userData, token) => {
    setUser(userData)
    setAuthToken(token)
    setError(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    setAuthToken(null)
    setHabits([])
    setLoading(false)
  }

  const handleHabitCreated = (newHabit) => {
    setHabits([...habits, newHabit])
  }

  // Update all your habit handler functions to include the auth token
  const handleToggleComplete = async (habitId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}/toggle`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
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
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
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

  // Show authentication form if user is not logged in
  if (!user) {
    return (
      <div className="App">
        <AuthForm 
          isLogin={showLogin} 
          onAuthSuccess={handleAuthSuccess}
        />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => setShowLogin(!showLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#007bff', 
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            {showLogin ? 'Need an account? Register here' : 'Already have an account? Login here'}
          </button>
        </div>
      </div>
    )
  }

  if (loading) return <div>Loading habits...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>🎯 Habit Tracker</h1>
        <div>
          <span>Welcome, {user.email}! </span>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <HabitForm onHabitCreated={handleHabitCreated} authToken={authToken} />
      
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