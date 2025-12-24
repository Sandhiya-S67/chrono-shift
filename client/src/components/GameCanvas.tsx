import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GameCanvasProps {
  onGameOver: (score: number) => void;
  isPlaying: boolean;
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

// Game Constants
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const OBSTACLE_WIDTH = 30;
const OBSTACLE_HEIGHT = 30;
const GAME_SPEED_BASE = 4;
const SPAWN_RATE_BASE = 60; // Frames
const BATTERY_MAX = 100;
const BATTERY_DRAIN = 1.5;
const BATTERY_RECHARGE = 0.5;
const TIME_SLOW_FACTOR = 0.3;

export function GameCanvas({ onGameOver, isPlaying }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [battery, setBattery] = useState(BATTERY_MAX);
  
  // Game State Refs (to avoid closures in loop)
  const gameState = useRef({
    player: { x: 0, y: 0 },
    obstacles: [] as GameObject[],
    frame: 0,
    score: 0,
    gameSpeed: GAME_SPEED_BASE,
    isSlowingTime: false,
    battery: BATTERY_MAX,
    keys: { left: false, right: false, space: false },
    active: false
  });

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") gameState.current.keys.left = true;
      if (e.code === "ArrowRight" || e.code === "KeyD") gameState.current.keys.right = true;
      if (e.code === "Space") gameState.current.keys.space = true;
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") gameState.current.keys.left = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") gameState.current.keys.right = false;
      if (e.code === "Space") gameState.current.keys.space = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Initialize Game
  useEffect(() => {
    if (isPlaying) {
      gameState.current = {
        player: { x: window.innerWidth < 600 ? 150 : 300, y: 0 },
        obstacles: [],
        frame: 0,
        score: 0,
        gameSpeed: GAME_SPEED_BASE,
        isSlowingTime: false,
        battery: BATTERY_MAX,
        keys: { left: false, right: false, space: false },
        active: true
      };
      setScore(0);
      setBattery(BATTERY_MAX);
    } else {
      gameState.current.active = false;
    }
  }, [isPlaying]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        // Position player at bottom center initially if not moved
        if (gameState.current.frame === 0) {
          gameState.current.player.x = canvas.width / 2 - PLAYER_WIDTH / 2;
          gameState.current.player.y = canvas.height - PLAYER_HEIGHT - 20;
        } else {
          gameState.current.player.y = canvas.height - PLAYER_HEIGHT - 20;
        }
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;

    const loop = () => {
      if (!gameState.current.active) return;

      const state = gameState.current;
      
      // 1. Time Mechanics
      const canSlowTime = state.keys.space && state.battery > 0;
      state.isSlowingTime = canSlowTime;
      
      if (canSlowTime) {
        state.battery = Math.max(0, state.battery - BATTERY_DRAIN);
      } else {
        state.battery = Math.min(BATTERY_MAX, state.battery + BATTERY_RECHARGE);
      }
      setBattery(state.battery); // Sync React state for UI

      const currentSpeed = state.isSlowingTime 
        ? state.gameSpeed * TIME_SLOW_FACTOR 
        : state.gameSpeed;

      // 2. Player Movement
      if (state.keys.left) state.player.x -= 7;
      if (state.keys.right) state.player.x += 7;
      
      // Bounds Checking
      if (state.player.x < 0) state.player.x = 0;
      if (state.player.x + PLAYER_WIDTH > canvas.width) state.player.x = canvas.width - PLAYER_WIDTH;

      // 3. Obstacle Spawning
      state.frame++;
      // Spawn rate increases as score increases (difficulty)
      const currentSpawnRate = Math.max(20, SPAWN_RATE_BASE - Math.floor(state.score / 500));
      
      if (state.frame % currentSpawnRate === 0) {
        state.obstacles.push({
          x: Math.random() * (canvas.width - OBSTACLE_WIDTH),
          y: -OBSTACLE_HEIGHT,
          width: OBSTACLE_WIDTH,
          height: OBSTACLE_HEIGHT,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`
        });
      }

      // 4. Update Obstacles
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        obs.y += currentSpeed;

        // Collision Detection
        if (
          state.player.x < obs.x + obs.width &&
          state.player.x + PLAYER_WIDTH > obs.x &&
          state.player.y < obs.y + obs.height &&
          state.player.y + PLAYER_HEIGHT > obs.y
        ) {
          state.active = false;
          onGameOver(Math.floor(state.score));
          return; // Stop loop
        }

        // Remove off-screen obstacles and add score
        if (obs.y > canvas.height) {
          state.obstacles.splice(i, 1);
          state.score += 10;
          setScore(state.score); // Sync React state
          
          // Increase base speed slightly every 500 points
          state.gameSpeed = GAME_SPEED_BASE + Math.floor(state.score / 500) * 0.5;
        }
      }

      // 5. Draw
      ctx.fillStyle = "#12101e"; // Clear with bg color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid (Retro effect)
      ctx.strokeStyle = "rgba(156, 146, 172, 0.1)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      // Moving vertical lines
      const offset = (state.frame * currentSpeed) % gridSize;
      
      // Horizontal lines (perspective-ish)
      for (let y = offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Player (Ship)
      ctx.save();
      ctx.translate(state.player.x + PLAYER_WIDTH/2, state.player.y + PLAYER_HEIGHT/2);
      ctx.fillStyle = state.isSlowingTime ? "#06b6d4" : "#db2777"; // Cyan (slow) or Pink (normal)
      ctx.shadowBlur = 20;
      ctx.shadowColor = state.isSlowingTime ? "#06b6d4" : "#db2777";
      
      // Triangle Ship
      ctx.beginPath();
      ctx.moveTo(0, -PLAYER_HEIGHT/2);
      ctx.lineTo(PLAYER_WIDTH/2, PLAYER_HEIGHT/2);
      ctx.lineTo(0, PLAYER_HEIGHT/3);
      ctx.lineTo(-PLAYER_WIDTH/2, PLAYER_HEIGHT/2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Draw Obstacles
      state.obstacles.forEach(obs => {
        ctx.fillStyle = obs.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      });

      // Time Warp Visual Effect (Vignette)
      if (state.isSlowingTime) {
        const gradient = ctx.createRadialGradient(
          canvas.width/2, canvas.height/2, canvas.height/3,
          canvas.width/2, canvas.height/2, canvas.height
        );
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "rgba(6, 182, 212, 0.3)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, onGameOver]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_rgba(219,39,119,0.2)] bg-black/50 backdrop-blur-sm">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <div className="font-display text-2xl text-primary drop-shadow-[0_0_8px_rgba(219,39,119,0.8)]">
          SCORE: {score.toString().padStart(6, '0')}
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-xs text-secondary/80">CHRONO BATTERY</span>
          <div className="w-48 h-6 bg-black/60 border border-secondary/50 rounded skew-x-[-12deg] overflow-hidden p-1">
            <div 
              className={`h-full transition-all duration-100 ease-linear ${battery < 20 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-secondary shadow-[0_0_10px_cyan]'}`}
              style={{ width: `${battery}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Controls Hint */}
      {isPlaying && score < 100 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-60 animate-pulse">
          <p className="font-mono text-sm text-white mb-1">HOLD <span className="text-secondary font-bold">[SPACE]</span> TO SLOW TIME</p>
          <p className="font-mono text-xs text-muted-foreground">ARROWS to Move</p>
        </div>
      )}
    </div>
  );
}
