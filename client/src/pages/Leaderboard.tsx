import { motion } from "framer-motion";
import { ScoreBoard } from "@/components/ScoreBoard";

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden py-12">
      {/* Visual Overlays */}
      <div className="scanlines" />
      <div className="crt-flicker pointer-events-none fixed inset-0 bg-gradient-to-b from-white/5 to-transparent h-1 opacity-20" />

      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary drop-shadow-[0_0_15px_rgba(219,39,119,0.5)]">
            HALL OF FAME
          </h1>
          <p className="font-mono text-secondary tracking-widest">GLOBAL LEADERBOARD</p>
        </motion.div>

        {/* Leaderboard */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ScoreBoard />
        </motion.div>

        {/* Info Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 border border-secondary/30 bg-secondary/5 rounded-xl space-y-4 text-center"
        >
          <h2 className="text-2xl font-display text-secondary">COMPETE GLOBALLY</h2>
          <p className="text-muted-foreground font-mono max-w-xl mx-auto">
            Every time you submit a score, you're added to the global leaderboard. Compete with players worldwide and earn your place among the greatest time masters.
          </p>
          <p className="text-sm font-mono text-accent">
            Play the game to submit your score and see how you rank against other pilots.
          </p>
        </motion.section>
      </div>

      {/* Footer decoration */}
      <footer className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
    </div>
  );
}
