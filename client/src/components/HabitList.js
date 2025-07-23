import HabitItem from './HabitItem'

function HabitList({ habits }) {
  return (
    <div>
      <h2>Your Habits ({habits.length})</h2>
      {habits.length === 0 ? (
        <p>No habits yet. Create your first one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {habits.map(habit => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default HabitList