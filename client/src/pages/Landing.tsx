import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, Zap, Trophy, Gamepad2 } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Visual Overlays */}
      <div className="scanlines" />
      <div className="crt-flicker pointer-events-none fixed inset-0 bg-gradient-to-b from-white/5 to-transparent h-1 opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10 max-w-6xl">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary animate-pulse drop-shadow-[0_0_30px_rgba(219,39,119,0.6)]">
              CHRONO SHIFT
            </h1>
            <p className="text-xl md:text-2xl font-mono text-secondary drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              ⏱️ Master Time. Survive the Fall. ⏱️
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              An interactive arcade game exploring "The Changing of Time" — slow down reality itself to navigate impossible patterns and climb the global leaderboard.
            </p>
          </div>

          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/play">
              <button className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-display text-lg rounded-sm shadow-[0_0_20px_rgba(219,39,119,0.6)] hover:shadow-[0_0_40px_rgba(219,39,119,0.8)] transition-all flex items-center gap-3">
                <Play className="w-5 h-5 fill-current" />
                START GAME
              </button>
            </Link>
            <Link href="/about">
              <button className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-secondary/50 text-secondary font-display text-lg rounded-sm transition-all flex items-center gap-3">
                <Gamepad2 className="w-5 h-5" />
                LEARN MORE
              </button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          <div className="p-6 border border-primary/30 bg-primary/5 rounded-xl hover-elevate">
            <Zap className="w-8 h-8 text-primary mb-4 drop-shadow-[0_0_8px_rgba(219,39,119,0.6)]" />
            <h3 className="font-display text-lg text-primary mb-2">TIME MANIPULATION</h3>
            <p className="text-muted-foreground font-mono text-sm">
              Hold SPACE to slow down time and dodge impossible obstacles. Strategic use of your limited battery is key.
            </p>
          </div>

          <div className="p-6 border border-secondary/30 bg-secondary/5 rounded-xl hover-elevate">
            <Trophy className="w-8 h-8 text-secondary mb-4 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            <h3 className="font-display text-lg text-secondary mb-2">GLOBAL LEADERBOARD</h3>
            <p className="text-muted-foreground font-mono text-sm">
              Compete with players worldwide. Submit your score and claim your place in the Hall of Fame.
            </p>
          </div>

          <div className="p-6 border border-accent/30 bg-accent/5 rounded-xl hover-elevate">
            <Gamepad2 className="w-8 h-8 text-accent mb-4 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            <h3 className="font-display text-lg text-accent mb-2">ARCADE VIBES</h3>
            <p className="text-muted-foreground font-mono text-sm">
              Retro cyberpunk aesthetic with dynamic difficulty. Each obstacle survived pushes the tempo faster.
            </p>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center py-12 px-6 border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl"
        >
          <h2 className="text-3xl font-display text-primary mb-4 drop-shadow-[0_0_10px_rgba(219,39,119,0.6)]">
            READY TO PLAY?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Master the mechanics, conquer the leaderboard, and become a legend in the Chrono Shift Hall of Fame.
          </p>
          <Link href="/play">
            <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-display rounded-sm shadow-[0_0_20px_rgba(219,39,119,0.6)] transition-all">
              INSERT COIN
            </button>
          </Link>
        </motion.section>
      </div>

      {/* Footer decoration */}
      <footer className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
    </div>
  );
}
