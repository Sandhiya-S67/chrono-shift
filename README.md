# Chrono Shift

**Chrono Shift** is an interactive arcade-style game developed for **Codédex Game Jam 2025**, based on the theme **“The Changing of Time.”**  
The game places time manipulation at the center of gameplay, challenging players to balance reflexes, strategy, and resource management.

---

## About the Game

Chrono Shift allows players to directly control the flow of time using a limited power source called the **Chrono Battery**.  
Players pilot a spacecraft positioned at the bottom of the screen, dodging colorful obstacles that fall from above. While the game starts simple, the passage of time steadily increases difficulty, forcing players to adapt to faster speeds and denser obstacle patterns.

The core idea is simple:
- **Time can be slowed**
- **Time cannot be controlled forever**
- **Every second matters**

---

## Game Concept

- The player controls a spacecraft and must avoid falling obstacles.
- Holding the **SPACE** key slows time, making obstacles fall at reduced speed.
- Time-slow is powered by a finite **Chrono Battery**, which drains while active and recharges when released.
- As the score increases, the game accelerates, increasing both obstacle speed and spawn rate.
- The game ends instantly upon collision, emphasizing precision and timing.

---

## Gameplay Mechanics

### Time Slow Mechanic
- Hold **SPACE** to activate slow-motion mode.
- Obstacles move at approximately **30% of normal speed**.
- Chrono Battery drains while active and automatically recharges when released.
- Encourages strategic decision-making rather than constant usage.

### Accelerating Difficulty
- Every **500 points**, the game difficulty increases.
- Obstacle spawn rate and falling speed scale dynamically.
- Ensures continuous challenge and evolving gameplay.

### Collision Detection
- Pixel-perfect collision detection using the Canvas API.
- A single collision immediately ends the game.
- Score is based on the number of obstacles successfully avoided.

### Persistent Leaderboard
- Players can submit their final score using a pilot name.
- Scores are stored in a global database.
- A public leaderboard allows players to compete for high rankings.

---

## How to Play

1. Click **“INSERT COIN”** to start the game.
2. Use **Arrow Keys** or **A / D** to move the spacecraft left and right.
3. Avoid falling obstacles by positioning carefully.
4. Hold **SPACE** to slow time during difficult moments.
5. Monitor the **Chrono Battery** to avoid running out of slow-time power.
6. Each obstacle avoided awards **10 points**.
7. On collision, submit your score to the leaderboard.

---

## Theme Exploration: *The Changing of Time*

Chrono Shift explores the game jam theme in multiple layers:

- **Literal Time Manipulation**  
  Players actively slow time to survive complex obstacle patterns.

- **Accelerating Time**  
  As the game progresses, time effectively speeds up, increasing difficulty and pressure.

- **Resource-Based Time Management**  
  The Chrono Battery represents time as a limited resource that must be spent wisely.

- **Temporal Progression**  
  Score reflects survival over time, reinforcing the idea that every moment counts.

---

## Tech Stack

### Frontend
- **React + TypeScript** – Strong typing and component-driven UI
- **Canvas API** – Real-time game rendering and collision detection
- **Framer Motion** – Smooth UI and transition animations
- **Tailwind CSS** – Utility-first styling for rapid UI development
- **TanStack Query** – Efficient server-state management and data fetching

### Backend
- **Express.js** – RESTful API server
- **PostgreSQL** – Persistent storage for leaderboard data
- **Drizzle ORM** – Type-safe database queries
- **Zod** – Schema validation for reliable API inputs
- **REST Architecture** – Clean separation between client and server

---


### Clone the Repository
```bash
git clone https://github.com/Sandhiya-S67/chrono-shift.git
cd chrono-shift
````


## Project Highlights

- Unique time-slow mechanic tied to resource management
- Dynamic difficulty scaling based on player performance
- Global leaderboard with persistent storage
- Clean arcade-inspired visuals with modern web technologies
- Designed and built specifically for a competitive game jam environment

