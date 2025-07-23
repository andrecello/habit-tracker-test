function HabitItem({ habit }) {
  return (
    <li 
      style={{ 
        padding: '12px', 
        margin: '8px 0', 
        border: '1px solid #ddd', 
        borderRadius: '4px',
        backgroundColor: habit.completed ? '#e8f5e8' : '#f9f9f9'
      }}
    >
      <strong>{habit.title}</strong>
      <br />
      <small>
        Created: {new Date(habit.createdAt).toLocaleDateString()} | 
        Status: {habit.completed ? '✅ Complete' : '⏳ Pending'}
      </small>
    </li>
  )
}

export default HabitItem