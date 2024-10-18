# Habit-Tracker-Application

## overview
A Habit Tracker Application that allows users to set weekly and monthly habits, track their progress, and receive reminders for habits. Admin users can manage content, create habit templates, and view user habits analytics.

## User Registration and Login
- Users can register a new account through the registration page, providing the necessary details.
- Users can log in to their accounts to manage their habits.
- admin  can access a separate dashboard and log in to their accounts to manage their habits

## For Admins:
- Log in to the admin dashboard.
- Create habit templates and manage user habits.
- View user analytics to monitor progress and trends.

## Features
-**User Features**
- Adding Habits: Users can create new habits, which are saved in local storage for persistence.
- Editing Habits: Users can modify existing habits. The changes are updated in both the UI and local storage.
- Deleting Habits: Users can remove habits. Upon deletion, the habit is removed from the UI and local storage..

## Tech Stack

- **Frontend:** 
  - React
  - Tailwind CSS / Chakra UI (or any chosen styling library)
  - React Router for routing
  - React Toastify for notifications

- **Data Storage:** 
  - Local Storage for storing user habits and data.

## Prerequisites
- Node.js (v14 or above)
- npm (Node Package Manager)

## Installation
npm install
npm run start
