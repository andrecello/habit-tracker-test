# 🎯 Habit Tracker

A full-stack habit tracking application built with React, Express, and Prisma. Track your daily habits, mark them as complete, and build better routines!

![Habit Tracker Demo](https://via.placeholder.com/800x400?text=Habit+Tracker+Screenshot)

## ✨ Features

- **📝 Create Habits** - Add new habits with custom titles
- **✅ Track Progress** - Mark habits as complete or incomplete
- **✏️ Edit Habits** - Update habit titles with inline editing
- **🗑️ Delete Habits** - Remove habits you no longer need
- **💾 Persistent Storage** - All data saved to SQLite database
- **🔄 Real-time Updates** - Instant UI updates without page refresh
- **📱 Clean Interface** - Simple, intuitive user experience

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Express.js** - RESTful API server
- **Prisma ORM** - Type-safe database client
- **SQLite** - Lightweight database for development
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting and formatting
- **Git** - Version control
- **npm** - Package management

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/andrecello/habit-tracker-test.git
   cd habit-tracker-test
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up the database**
   ```bash
   cd ../server
   
   # Create .env file
   echo 'DATABASE_URL="file:./prisma/dev.db"' > .env
   
   # Run database migration
   prisma migrate dev --name init
   
   # Generate Prisma client
   prisma generate
   ```

### Running the Application

1. **Start the backend server** (Terminal 1)
   ```bash
   cd server
   node server.js
   ```
   Server runs on `http://localhost:5000`

2. **Start the frontend** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/habits` | Get all habits |
| `POST` | `/api/habits` | Create a new habit |
| `PUT` | `/api/habits/:id` | Update habit title |
| `PUT` | `/api/habits/:id/toggle` | Toggle habit completion |
| `DELETE` | `/api/habits/:id` | Delete a habit |
| `POST` | `/api/habits/create-test-user` | Create test user (dev only) |

## 📁 Project Structure

```
habit-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── HabitForm.jsx
│   │   │   ├── HabitList.jsx
│   │   │   └── HabitItem.jsx
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── prisma/
│   │   ├── migrations/     # Database migrations
│   │   └── schema.prisma   # Database schema
│   ├── routes/
│   │   └── habits.js       # Habit API routes
│   ├── server.js           # Express server
│   ├── package.json
│   └── .env                # Environment variables
└── README.md
```

## 🎯 Usage

### Creating Habits
1. Enter a habit title in the input field
2. Click "Add Habit" to save it
3. Your habit appears in the list below

### Managing Habits
- **Complete/Undo**: Click the green "Complete" or orange "Undo" button
- **Edit**: Click "Edit" to modify the habit title
- **Delete**: Click "Delete" to remove the habit (with confirmation)

### Visual Feedback
- ✅ **Completed habits** have a green background and strikethrough text
- ⏳ **Pending habits** have a light gray background
- 📅 **Creation date** and status are displayed for each habit

## 🔮 Future Enhancements

- [ ] **User Authentication** - Login/register system
- [ ] **Multiple Users** - Each user sees only their habits
- [ ] **Habit Streaks** - Track consecutive completion days
- [ ] **Statistics Dashboard** - Completion rates and analytics
- [ ] **Categories/Tags** - Organize habits by type
- [ ] **Mobile App** - React Native version
- [ ] **Notifications** - Habit reminders
- [ ] **Dark Mode** - Theme switching
- [ ] **Data Export** - CSV/JSON export functionality

## 🐛 Known Issues

- Currently uses a single test user for all habits
- No data validation on the frontend
- Basic styling (improvements planned)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Andre Cello**
- GitHub: [@andrecello](https://github.com/andrecello)
- Project Link: [https://github.com/andrecello/habit-tracker-test](https://github.com/andrecello/habit-tracker-test)

## 🙏 Acknowledgments

- Built as a learning project to explore full-stack development
- Inspired by the need for simple, effective habit tracking
- Thanks to the React, Express, and Prisma communities

---

⭐ **Star this repo if you found it helpful!**