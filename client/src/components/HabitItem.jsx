import { useState } from 'react'

function HabitItem({ habit, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(habit.title)

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== habit.title) {
      onUpdate(habit.id, editTitle.trim())
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(habit.title)
    setIsEditing(false)
  }

  return (
    <li 
      style={{ 
        padding: '12px', 
        margin: '8px 0', 
        border: '1px solid #ddd', 
        borderRadius: '4px',
        backgroundColor: habit.completed ? '#e8f5e8' : '#f9f9f9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              style={{ padding: '4px', marginRight: '8px', width: '200px' }}
              autoFocus
            />
            <button onClick={handleSaveEdit} style={{ marginRight: '4px', padding: '4px 8px' }}>
              Save
            </button>
            <button onClick={handleCancelEdit} style={{ padding: '4px 8px' }}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <strong style={{ textDecoration: habit.completed ? 'line-through' : 'none' }}>
              {habit.title}
            </strong>
            <br />
            <small>
              Created: {new Date(habit.createdAt).toLocaleDateString()} | 
              Status: {habit.completed ? '✅ Complete' : '⏳ Pending'}
            </small>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => onToggleComplete(habit.id)}
          style={{ 
            padding: '4px 8px', 
            backgroundColor: habit.completed ? '#ff9800' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {habit.completed ? 'Undo' : 'Complete'}
        </button>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            style={{ 
              padding: '4px 8px', 
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Edit
          </button>
        )}
        
        <button 
          onClick={() => onDelete(habit.id)}
          style={{ 
            padding: '4px 8px', 
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default HabitItem