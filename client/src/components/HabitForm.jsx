import { useState } from 'react'

function HabitForm({ onHabitCreated, authToken }) {
  const [newHabitTitle, setNewHabitTitle] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createHabit = async (e) => {
    e.preventDefault()
    
    if (!newHabitTitle.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` // Add auth token here
        },
        body: JSON.stringify({
          title: newHabitTitle
          // No need for userId - server gets it from token!
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create habit')
      }

      const newHabit = await response.json()
      onHabitCreated(newHabit)
      setNewHabitTitle('')
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error creating habit:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={createHabit} style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        value={newHabitTitle}
        onChange={(e) => setNewHabitTitle(e.target.value)}
        placeholder="Enter a new habit..."
        style={{ padding: '8px', marginRight: '8px', width: '200px' }}
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        style={{ padding: '8px 16px' }}
        disabled={isSubmitting || !newHabitTitle.trim()}
      >
        {isSubmitting ? 'Adding...' : 'Add Habit'}
      </button>
      {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
    </form>
  )
}

export default HabitForm