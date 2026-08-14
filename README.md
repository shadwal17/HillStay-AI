HillStay AI - Premium Eco-Homestay Booking Engine
A full-stack, responsive web application designed to connect travelers with premium, sustainable eco-resorts, featuring an AI-powered travel assistant.

🚀 Live Links
Live Frontend Application (Vercel): https://hill-stay-ai.vercel.app/

Live Backend API (Render): https://hillstay-ai-1.onrender.com

📸 Screenshots
(Note to recruiters: Screenshots of the dashboard, booking flow, and AI assistant can be viewed in the live application or the attached project documentation).

✨ Features
Authentication: Secure user registration and login using JWT and bcrypt.

Smart Booking: Full CRUD (Create, Read, Update, Delete) reservation management.

AI Concierge: Integrated Google Gemini AI to provide eco-travel itineraries and packing lists.

Responsive UI: Fully optimized for mobile, tablet, and desktop viewing.

💻 Tech Stack
Frontend: React.js (Vite), Tailwind CSS, Lucide React

Backend: Node.js, Express.js

Database: MongoDB Atlas, Mongoose

AI Integration: Google Generative AI SDK (Gemini 1.5)

Deployment: Vercel (Frontend), Render (Backend)

🛠️ Setup Instructions (Local Development)
Clone the repository: git clone https://github.com/shadwal17/HillStay-AI.git

Install Frontend: npm install and run with npm run dev

Install Backend: cd backend, run npm install, and start with npm run dev

Environment Variables Needed:

MONGO_URI (Your MongoDB connection string)

JWT_SECRET (Your secure token signing key)

GEMINI_API_KEY (Your Google AI Studio key)

📡 API Documentation (Core Endpoints)
POST /api/auth/register - Create a new user

POST /api/auth/login - Authenticate and receive JWT

GET /api/bookings/my-bookings - Fetch user-specific reservations (Requires JWT)

POST /api/bookings - Create a new reservation (Requires JWT)

POST /api/ai/travel-assistant - Send a prompt to the AI Concierge (Requires JWT)

📂 Architecture
The project follows a standard decoupled MERN stack architecture. The React frontend handles UI state and routing, communicating asynchronously via HTTP requests to the Express backend. The backend utilizes controller logic and middleware (for JWT validation) before interacting with the MongoDB database.

⚠️ Known Limitations
Render Cold Starts: The backend API is hosted on Render's free tier. If idle, the server spins down. The very first request (like logging in) may take 30–60 seconds to process while the server wakes up.

🤝 Credits & Acknowledgements
Built during the Full Stack Web Development Internship at Technology Business Incubator - Graphic Era University (TBI-GEU).