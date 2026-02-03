# MongoTodo - Full Stack Todo Application

A modern, full-stack todo application built with React, Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication (Register/Login)
- ✅ Create, Read, Update, Delete todos
- ✓ Toggle todo completion status
- 🎨 Beautiful, modern UI with glassmorphism effects
- 📱 Responsive design
- 🔒 Protected routes with JWT authentication
- ⚡ Real-time updates

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios
- Ant Design (for notifications)
- CSS Modules

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Project Structure

```
MongoTodo/
├── app/                    # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── toDoPage/      # Todo page component
│   │   └── services/      # API services
│   └── package.json
├── controller/            # Backend controllers
│   ├── authcontroller.js
│   └── todoController.js
├── models/               # Mongoose models
│   ├── User.js
│   └── todoSchema.js
├── routes/               # API routes
│   ├── authRoute.js
│   └── todoRoute.js
├── middleware/           # Custom middleware
│   └── authMiddleware.js
├── server.js            # Express server
└── package.json
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
```

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd MongoTodo
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd app
npm install
cd ..
```

### 4. Set up environment variables
Create a `.env` file in the root directory with your MongoDB URL and JWT secret.

### 5. Run the application

**Development Mode:**

Terminal 1 (Backend):
```bash
npm run dev
```

Terminal 2 (Frontend):
```bash
cd app
npm start
```

The backend will run on `http://localhost:8000`
The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user

### Todos (Protected Routes)
- `GET /todos` - Get all todos for authenticated user
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo
- `PATCH /todos/:id/toggle` - Toggle todo completion status

## Deployment to Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas account (for production database)

### Steps

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Build the frontend**
```bash
cd app
npm run build
cd ..
```

3. **Set up environment variables in Vercel**
   - Go to your Vercel project settings
   - Add the following environment variables:
     - `DB_URL` - Your MongoDB Atlas connection string
     - `JWT_SECRET` - Your JWT secret key

4. **Deploy**
```bash
vercel
```

5. **Update API URL in frontend**
   - Update the `API_URL` in `app/src/toDoPage/ToDoPage.jsx` to your Vercel backend URL

### Important Notes for Deployment

- The `vercel.json` file is already configured for both frontend and backend deployment
- Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel's IP addresses
- Environment variables must be set in Vercel dashboard before deployment
- The frontend build folder should be `app/build`

## Features in Detail

### Authentication
- Secure password hashing with bcrypt
- JWT token-based authentication
- Token stored in localStorage
- Protected routes on both frontend and backend

### Todo Management
- **Add Todo**: Create new tasks with title and optional description
- **Edit Todo**: Modify existing tasks inline
- **Delete Todo**: Remove tasks permanently
- **Toggle Complete**: Mark tasks as complete/incomplete
- **Real-time Updates**: UI updates immediately after operations

### UI/UX Features
- Gradient background with glassmorphism effects
- Smooth animations and transitions
- Loading states for async operations
- Empty state when no todos exist
- Custom checkbox styling
- Responsive design for mobile devices
- Error handling with user-friendly messages

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

MIT License
