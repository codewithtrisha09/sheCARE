# SheCARE

**A menstrual health and wellness platform designed to make reliable health education more accessible to adolescent girls.**

SheCARE is a full-stack health-tech web application that combines educational resources with personalized wellness tools. It provides a safe, user-friendly space where users can learn about menstrual health, track their cycles and symptoms, save wellness information, and access AI-assisted educational support.

## Features

* Menstrual health education and wellness resources
* Educational articles and blog content
* Personal cycle tracker
* Symptom check-ins and period estimates
* Personalized Care Space dashboard
* Wellness reminders and saved cycle information
* Secure account creation and login with JWT authentication
* Gemini-powered AI wellness guide
* Medical wording simplifier with an educational disclaimer
* Responsive and modern user interface
* Custom branding and animated user experience

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB Atlas

### AI Integration

* Google Gemini API

## Architecture

```text
                         ┌──────────────────────┐
                         │       SheCARE        │
                         │    React + Vite      │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                              HTTP / REST API
                                    │
                         ┌──────────▼───────────┐
                         │    Express Server     │
                         │       Node.js         │
                         │                       │
                         │  JWT Authentication   │
                         │  API Routes           │
                         │  AI Integration       │
                         └──────┬─────────┬──────┘
                                │         │
                    ┌───────────▼───┐   ┌─▼──────────────┐
                    │ MongoDB Atlas │   │  Gemini API    │
                    │               │   │                │
                    │ User & Cycle  │   │ AI Wellness    │
                    │ Data          │   │ Guide          │
                    └───────────────┘   └────────────────┘
```

## Project Status

SheCARE is currently **a work in progress**.

The application has a functional React frontend and an Express API foundation. It can run without paid services using temporary server-side storage by default, while MongoDB Atlas can be configured for persistent data storage.

### Completed

* React + Vite project setup
* Landing page and custom branding
* Responsive navigation
* Menstrual health information section
* Educational blog/content module
* Responsive user interface
* User registration and login
* JWT-based authentication
* Personal cycle tracking
* Symptom check-ins
* Personalized Care Space dashboard
* Wellness reminders
* Server-side Gemini integration
* Medical wording simplifier

### In Progress

* Push and email reminder delivery
* Password reset flow
* Production deployment
* Expanded symptom and cycle analytics
* Clinician-friendly data export

## Getting Started

### Prerequisites

* Node.js
* npm
* MongoDB Atlas account (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/codewithtrisha09/sheCARE.git
```

### 2. Navigate to the Project

```bash
cd sheCARE
```

### 3. Install Dependencies

```bash
npm install
```

## Running the Application

The frontend and backend run in separate terminals during development.

### 1. Configure the Server

Create your environment file from the provided example.

**Windows PowerShell:**

```powershell
Copy-Item server/.env.example server/.env
```

Configure the environment variables in `server/.env`:

```env
JWT_SECRET=your_long_random_secret
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

`MONGODB_URI` and `GEMINI_API_KEY` are optional depending on the features you want to use.

### 2. Start the API

```bash
npm run server
```

### 3. Start the Frontend

Open a second terminal:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## Environment Variables

| Variable         | Required | Purpose                            |
| ---------------- | -------- | ---------------------------------- |
| `JWT_SECRET`     | Yes      | Signs authentication tokens        |
| `MONGODB_URI`    | Optional | Enables persistent MongoDB storage |
| `GEMINI_API_KEY` | Optional | Enables the AI wellness guide      |

The Gemini API key is used only by the Express server and is never exposed to the browser.

> **Security:** Never commit your `.env` file or API keys to GitHub. Keep sensitive values in environment variables and ensure `.env` is included in `.gitignore`.

## Privacy & Security

* JWT-based authentication
* Server-side API key handling
* Environment variables for sensitive configuration
* No API keys committed to the repository
* MongoDB used for persistent user data when configured

SheCARE is an **educational wellness platform and is not a substitute for professional medical advice, diagnosis, or treatment.**

## Future Improvements

* Personalized cycle insights
* Detailed symptom analytics
* Push and email notifications
* Password recovery
* Improved accessibility
* Production deployment
* Clinician-friendly reports and exports
* Expanded educational content

## Author

**Trisha Shetty**
B.Tech CSE (AI & ML)

Building technology-driven solutions at the intersection of **AI, software engineering, and healthcare accessibility**.
