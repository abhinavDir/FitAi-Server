# FitAI Server 🚀

Backend API for **FitAI**, an AI-powered fitness platform.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- OpenAI API
- Google Gemini API
- REST API

## 📁 Project Structure

```text
Backend/
│
├── Config/
│   ├── db.js
│   ├── gemini.js
│   └── openai.js
│
├── Controllers/
│   ├── authController.js
│   ├── coachController.js
│   ├── dietController.js
│   ├── exerciseController.js
│   └── userController.js
│
├── Middlewares/
│   └── isAuth.js
│
├── Models/
│   └── User.js
│
├── Routes/
│   ├── authRoutes.js
│   ├── coachRoutes.js
│   ├── dietRoutes.js
│   ├── exerciseRoutes.js
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

## ⚙️ Installation

### Clone Repository

```bash
git clone git@github.com:abhinavDir/FitAi-Server.git
```

### Go to Backend

```bash
cd FitAi-Server
```

### Install Dependencies

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_api_key

GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ Never upload your `.env` file or API keys to GitHub.

## ▶️ Run Project

### Development

```bash
npm run dev
```

### Normal

```bash
node index.js
```

Server:

```text
http://localhost:5000
```

## 🔑 Authentication

FitAI uses **JWT authentication**.

```text
Register / Login
       ↓
Validate User
       ↓
Generate JWT
       ↓
Client Stores Token
       ↓
Protected API Request
       ↓
Authentication Middleware
       ↓
Controller
       ↓
Response
```

## 🤖 AI Features

### AI Coach

Provides AI-powered fitness guidance based on user requirements.

### AI Diet

Generates personalized diet recommendations.

### Exercise

Provides exercise and workout-related functionality.

## 🔗 API Modules

| Module | Description |
|---|---|
| Authentication | Register and login |
| Users | User profile and information |
| Coach | AI fitness coaching |
| Diet | Diet recommendations |
| Exercise | Exercise and workout APIs |

## 🔒 Security

Sensitive information must never be committed to GitHub.

The `.env` file is ignored using:

```text
.env
```

API keys should always be stored in environment variables.

## 🚀 Future Improvements

- Personalized workout plans
- Advanced AI diet planner
- Workout tracking
- Progress analytics
- AI fitness assistant
- Notifications
- Subscription management
- Redis caching
- Rate limiting
- API validation
- Swagger API documentation
- Production deployment

## 👨‍💻 Author

**Abhinav Pandey**

GitHub:  
https://github.com/abhinavDir

## 📄 License

This project is currently intended for development and educational purposes.
