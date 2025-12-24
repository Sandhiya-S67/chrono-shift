import { useState } from "react";
import { useCreateScore } from "@/hooks/use-scores";
import { motion } from "framer-motion";
import { Send, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

export function GameOverModal({ score, onRestart }: GameOverModalProps) {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const createScore = useCreateScore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    createScore.mutate(
      { username: username.toUpperCase(), score },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast({
            title: "SCORE UPLOADED",
            description: "Your legacy has been recorded.",
            className: "bg-primary border-primary text-primary-foreground font-mono",
          });
        },
        onError: (err) => {
          toast({
            variant: "destructive",
            title: "UPLOAD FAILED",
            description: err.message,
          });
        }
      }
    );
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-background border-2 border-destructive p-8 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.4)] relative overflow-hidden"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-destructive" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-destructive" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-destructive" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-destructive" />

        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-display text-destructive animate-pulse drop-shadow-[0_0_10px_red]">
            GAME OVER
          </h2>
          
          <div className="py-4 border-y border-white/10">
            <p className="font-mono text-muted-foreground text-sm uppercase mb-2">Final Score</p>
            <p className="text-4xl font-display text-white">{score.toLocaleString()}</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-secondary uppercase tracking-widest">
                  Enter Pilot Name
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-primary/50 rounded-lg p-3 text-center font-mono text-lg text-primary placeholder:text-primary/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase"
                  placeholder="AAA"
                  autoFocus
                />
              </div>
              
              <button
                type="submit"
                disabled={createScore.isPending || !username}
                className="w-full group relative px-6 py-3 bg-primary/20 hover:bg-primary/40 border border-primary text-primary font-bold font-mono uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(219,39,119,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {createScore.isPending ? "Transmitting..." : "Submit Score"}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>
          ) : (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded text-green-400 font-mono text-sm">
              SCORE SUBMITTED TO MAINFRAME
            </div>
          )}

          <button
            onClick={onRestart}
            className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}
