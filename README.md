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