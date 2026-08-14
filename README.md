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

<<<<<<< HEAD
🤝 Credits & Acknowledgements
Built during the Full Stack Web Development Internship at Technology Business Incubator - Graphic Era University (TBI-GEU).
=======
*(Deliverable 2: See the W5_SchemaDiagram_TBI-26100593.pdf submitted via the LMS form for the complete visual schema).*

HillStay AI - Premium Eco-Homestay Booking Engine
HillStay is a full-stack, responsive web application designed to connect travelers with premium, sustainable eco-resorts. It features a complete booking management system, JWT-based secure authentication, and a dynamic AI Concierge powered by Google Gemini to assist travelers with itineraries and eco-tourism tips.

🚀 Live Demo & Deployment
Live Frontend Application: https://hill-stay-ai.vercel.app/

Live Backend API: https://hillstay-ai-1.onrender.com

⚠️ Known Limitations (Free Tier Hosting)
Render Cold Starts: The backend API is hosted on Render's free tier. If the application has been idle for 15 minutes, the server spins down to save resources. The very first request (like logging in or fetching rooms) may take 30–60 seconds to process while the server wakes up. Subsequent requests will be lightning fast.

🛠️ Tech Stack
Frontend:

React.js (Vite)

Tailwind CSS for responsive UI design

Lucide React for iconography

Backend & Database:

Node.js with Express.js

MongoDB Atlas (NoSQL Cloud Database)

Mongoose ODM

Security & Integrations:

JSON Web Tokens (JWT) for route protection and authorization

Bcrypt for secure password hashing

Google Generative AI SDK (Gemini 1.5 Flash) for the AI Assistant module

CORS configured for cross-origin production requests

⚙️ Local Setup Instructions
Clone the repository: git clone https://github.com/shadwal17/HillStay-AI.git

Frontend Setup:

Navigate to the frontend directory: cd frontend (or root if not separated)

Install dependencies: npm install

Start the Vite dev server: npm run dev

Backend Setup:

Navigate to the backend directory: cd backend

Install dependencies: npm install

Create a .env file based on .env.example and add your MONGO_URI, JWT_SECRET, and GEMINI_API_KEY.

Start the backend server: npm run dev

🗄️ Database Schema
The application uses a relational-style document schema via Mongoose, utilizing ObjectIds to strictly scope Booking records to authenticated Users.


👨‍💻 Developer
Shadwal Chauhan Intern ID: TBI-26100593 Domain: Full Stack Web Development Graphic Era (Deemed to be University)
>>>>>>> 7f7c0414abba9fabdec0a9cc9b55c215090bdea3
