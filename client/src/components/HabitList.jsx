import HabitItem from './HabitItem'

function HabitList({ habits, onToggleComplete, onDelete, onUpdate }) {
  return (
    <div>
      <h2>Your Habits ({habits.length})</h2>
      {habits.length === 0 ? (
        <p>No habits yet. Create your first one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {habits.map(habit => (
            <HabitItem 
              key={habit.id} 
              habit={habit} 
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default HabitList