# SheCARE

Empowering teen girls through health education and wellness.

## About the Project

SheCARE is a health-tech web application designed to promote menstrual health awareness and provide accessible educational resources for adolescent girls. The platform aims to create a safe, informative, and user-friendly space where users can learn about menstrual wellness through engaging content and thoughtful design.

## What You Can Do

- Modern and responsive user interface
- Health and menstrual wellness information pages
- Educational blog and content modules
- Intuitive navigation and user experience
- Custom branding and design
- Animated welcome experience and responsive navigation
- Create an account and sign in securely with JWT authentication
- Personal cycle tracker with symptom check-ins and period estimates
- Save wellness reminders and cycle information to your account
- Personalised Care Space dashboard
- Gemini-powered wellness guide (optional server-side integration)
- Medical wording simplifier with a clear educational disclaimer

## Tech Stack

### Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript (ES6+)

## Project Status

Work in progress, with a functional frontend and an Express API foundation. The application can run without paid services: it uses temporary server storage by default, and can persist user data with MongoDB Atlas' free tier when configured.

### Completed

- React + Vite setup
- Landing page design
- Responsive navigation bar
- Menstrual health information section
- Educational blog/content module
- Custom branding and logo
- Responsive user interface

### In Progress

- Push/email reminder delivery
- Secure production deployment and password reset flow
- Expanded symptom trends and clinician-friendly export

## Installation

Clone the repository:

```bash
git clone https://github.com/codewithtrisha09/sheCARE.git
```

Navigate to the project folder:

```bash
cd sheCARE
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Run the API and Authentication

The frontend and API run in separate terminals during development.

1. Copy [`server/.env.example`](server/.env.example) to `server/.env`.
2. Set a long `JWT_SECRET`. Add your free MongoDB Atlas connection string to `MONGODB_URI` if you want data to persist after restarting the API.
3. Start the API:

```bash
npm run server
```

4. In a second terminal, start Vite:

```bash
npm run dev
```

To enable the AI guide, add `GEMINI_API_KEY` to `server/.env`. The key is used only by the Express server and is never sent to the browser.

## Author

Trisha Shetty

B.Tech CSE (AI & ML)

Building technology-driven solutions to improve health awareness and accessibility for young women.
