import { motion } from "framer-motion";
import { Code2, Zap, Clock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden py-12">
      {/* Visual Overlays */}
      <div className="scanlines" />
      <div className="crt-flicker pointer-events-none fixed inset-0 bg-gradient-to-b from-white/5 to-transparent h-1 opacity-20" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(219,39,119,0.5)]">
            ABOUT CHRONO SHIFT
          </h1>
          <p className="font-mono text-secondary tracking-widest">Codédex Game Jam 2025</p>
        </motion.div>

        {/* Game Concept */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-display text-primary drop-shadow-[0_0_10px_rgba(219,39,119,0.6)]">
            GAME CONCEPT
          </h2>
          <div className="p-6 border border-primary/30 bg-primary/5 rounded-xl space-y-4 text-base leading-relaxed">
            <p>
              Chrono Shift is an interactive arcade game built for the Codédex Game Jam with the theme <span className="text-secondary font-bold">"The Changing of Time"</span>. The game directly explores this theme by giving players the ability to manipulate time itself as a core mechanic.
            </p>
            <p>
              Players control a spacecraft at the bottom of the screen, avoiding colorful obstacles that fall from above. The unique mechanic is the "Chrono Battery" — by holding SPACE, players can slow down time to navigate impossible patterns. However, this ability is limited by the battery charge, forcing strategic decision-making about when to use this power.
            </p>
            <p>
              As time progresses (and your score increases), the difficulty accelerates. Obstacles spawn faster, and the falling speed increases, creating an ever-changing challenge that embodies the theme of "changing time."
            </p>
          </div>
        </motion.section>

        {/* Gameplay Mechanics */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-display text-secondary drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            GAMEPLAY MECHANICS
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 border border-secondary/30 bg-secondary/5 rounded-xl">
              <Zap className="w-6 h-6 text-secondary mb-3 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              <h3 className="font-display text-lg text-secondary mb-2">TIME SLOW</h3>
              <p className="text-muted-foreground text-sm font-mono">
                Hold SPACE to activate time-slow mode. Obstacles move at 30% speed. Battery drains while active and recharges when released.
              </p>
            </div>
            <div className="p-6 border border-secondary/30 bg-secondary/5 rounded-xl">
              <Clock className="w-6 h-6 text-secondary mb-3 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              <h3 className="font-display text-lg text-secondary mb-2">ACCELERATING DIFFICULTY</h3>
              <p className="text-muted-foreground text-sm font-mono">
                Every 500 points, the game speeds up. Obstacle spawn rate increases, forcing faster reflexes and strategic battery use.
              </p>
            </div>
            <div className="p-6 border border-accent/30 bg-accent/5 rounded-xl">
              <Code2 className="w-6 h-6 text-accent mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              <h3 className="font-display text-lg text-accent mb-2">COLLISION DETECTION</h3>
              <p className="text-muted-foreground text-sm font-mono">
                Precise pixel-perfect collision detection. One touch ends the game. Score is based on obstacles survived.
              </p>
            </div>
            <div className="p-6 border border-accent/30 bg-accent/5 rounded-xl">
              <Code2 className="w-6 h-6 text-accent mb-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              <h3 className="font-display text-lg text-accent mb-2">PERSISTENT LEADERBOARD</h3>
              <p className="text-muted-foreground text-sm font-mono">
                Submit your score to a global database. Compete with other players and claim your place in the Hall of Fame.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Technical Details */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-display text-accent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            BUILT WITH
          </h2>
          <div className="p-6 border border-accent/30 bg-accent/5 rounded-xl">
            <div className="grid md:grid-cols-2 gap-6 font-mono text-sm">
              <div>
                <p className="text-accent font-bold mb-2">Frontend</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• React + TypeScript</li>
                  <li>• Canvas API for game rendering</li>
                  <li>• Framer Motion for animations</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• TanStack Query for data fetching</li>
                </ul>
              </div>
              <div>
                <p className="text-accent font-bold mb-2">Backend</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Express.js API server</li>
                  <li>• PostgreSQL database</li>
                  <li>• Drizzle ORM</li>
                  <li>• Zod for validation</li>
                  <li>• RESTful API design</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* How to Play */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-display text-primary drop-shadow-[0_0_10px_rgba(219,39,119,0.6)]">
            HOW TO PLAY
          </h2>
          <ol className="space-y-3 font-mono text-sm">
            <li className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
              <span className="text-primary font-bold">1.</span> Click "INSERT COIN" or use arrow keys/A-D to move left and right
            </li>
            <li className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
              <span className="text-primary font-bold">2.</span> Avoid falling obstacles by moving your ship
            </li>
            <li className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
              <span className="text-primary font-bold">3.</span> Hold SPACE to activate time-slow and navigate tight spots
            </li>
            <li className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
              <span className="text-primary font-bold">4.</span> Watch your Chrono Battery — it drains while slowing time and recharges when you release
            </li>
            <li className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
              <span className="text-primary font-bold">5.</span> Survive as long as possible. Each obstacle avoided = 10 points
            </li>
            <li className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
              <span className="text-primary font-bold">6.</span> When you crash, submit your score with a pilot name to the leaderboard
            </li>
          </ol>
        </motion.section>

        {/* Theme Exploration */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-display text-secondary drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            THEME EXPLORATION
          </h2>
          <div className="p-6 border border-secondary/30 bg-secondary/5 rounded-xl space-y-3 text-base leading-relaxed">
            <p>
              <span className="text-secondary font-bold">"The Changing of Time"</span> is explored in multiple ways throughout Chrono Shift:
            </p>
            <ul className="space-y-2 font-mono text-sm">
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><span className="text-secondary font-bold">Literal Time Manipulation:</span> Players directly control the flow of time, slowing it down to navigate challenges</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><span className="text-secondary font-bold">Accelerating Time:</span> As the game progresses, time accelerates, obstacles spawn faster, and the difficulty "changes"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><span className="text-secondary font-bold">Resource Management:</span> The Chrono Battery is a finite time resource, forcing strategic decisions about when time is precious</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><span className="text-secondary font-bold">Temporal Progression:</span> Score reflects time survived, creating a metaphor of "making time count"</span>
              </li>
            </ul>
          </div>
        </motion.section>
      </div>

      {/* Footer decoration */}
      <footer className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
    </div>
  );
}
