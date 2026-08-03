# HillStay AI

## Project Overview

HillStay AI is an AI-assisted smart tourism and homestay booking platform that enables travelers to discover, plan, and book homestay experiences through a single platform. The system combines direct booking functionality with intelligent travel assistance to provide a seamless tourism experience.

## Problem Statement

Many homestay businesses rely on third-party booking platforms that charge high commission fees and limit direct interaction with customers. Travelers also struggle to find personalized recommendations and efficient trip planning tools.

## Proposed Solution

The platform provides a direct booking system integrated with AI-powered travel assistance. Users can explore homestays, check availability, make booking inquiries, receive personalized recommendations, and generate customized travel itineraries.

## Core Features

* Homestay Listing & Search
* Direct Booking System
* Availability Calendar
* AI Travel Assistant
* Personalized Itinerary Generator
* User Reviews & Ratings

## Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### AI Integration

* Gemini API

## Status

Project Planning and Repository Setup


## Week 5: Database Integration

### Database Choice: MongoDB Atlas

I chose MongoDB (via MongoDB Atlas) because its document-based NoSQL structure provides excellent flexibility for storing varying room details and booking information without requiring rigid migrations. It pairs seamlessly with Node.js and Mongoose.

### Set up the database:

1. Create a free MongoDB Atlas cluster.
2. Under "Database Access", create a user with a password.
3. Under "Network Access", whitelist your IP address.
4. Click "Connect", choose "Connect your application", and copy the connection string.
5. Create a `.env` file in the `backend` folder and add: `MONGO_URI=your_connection_string_here`
6. Run `node seed.js` to populate initial rooms.
7. Run `npm run dev` to start the server.

### Schema Diagram

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
