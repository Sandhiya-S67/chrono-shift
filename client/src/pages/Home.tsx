import { useState } from "react";
import { GameCanvas } from "@/components/GameCanvas";
import { ScoreBoard } from "@/components/ScoreBoard";
import { GameOverModal } from "@/components/GameOverModal";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setFinalScore(0);
  };

  const handleGameOver = (score: number) => {
    setIsPlaying(false);
    setFinalScore(score);
    setIsGameOver(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Visual Overlays */}
      <div className="scanlines" />
      <div className="crt-flicker pointer-events-none fixed inset-0 bg-gradient-to-b from-white/5 to-transparent h-1 opacity-20" />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center space-y-2">
          <h1 className="text-5xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary animate-pulse drop-shadow-[0_0_15px_rgba(219,39,119,0.5)]">
            CHRONO SHIFT
          </h1>
          <p className="font-mono text-muted-foreground tracking-[0.2em] text-sm md:text-base">
            MASTER TIME. SURVIVE THE FALL.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8 items-start">
          {/* Main Game Area */}
          <main className="relative aspect-[4/3] md:aspect-[16/9] w-full max-h-[70vh]">
            <GameCanvas 
              onGameOver={handleGameOver} 
              isPlaying={isPlaying} 
            />
            
            {/* Start Screen Overlay */}
            {!isPlaying && !isGameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl border border-white/10">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <button
                    onClick={handleStartGame}
                    className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-display text-xl md:text-2xl rounded-sm shadow-[0_0_20px_rgba(219,39,119,0.6)] hover:shadow-[0_0_40px_rgba(219,39,119,0.8)] transition-all flex items-center gap-3 mx-auto"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    INSERT COIN
                  </button>
                  <p className="mt-4 font-mono text-sm text-white/50 animate-pulse">
                    PRESS START TO BEGIN
                  </p>
                </motion.div>
              </div>
            )}

            {/* Game Over Overlay */}
            {isGameOver && (
              <GameOverModal 
                score={finalScore} 
                onRestart={handleStartGame} 
              />
            )}
          </main>

          {/* Sidebar / Leaderboard */}
          <aside className="w-full">
            <ScoreBoard />
            
            <div className="mt-6 p-4 border border-secondary/20 bg-secondary/5 rounded-xl">
              <h3 className="text-secondary font-display text-sm mb-2">HOW TO PLAY</h3>
              <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>Use Arrow Keys or A/D to move left and right.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>Hold SPACE to slow down time and dodge impossible patterns.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>Watch your Chrono Battery! It drains while time is slowed.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>Survive as long as possible for a high score.</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Footer decoration */}
      <footer className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
    </div>
  );
}
