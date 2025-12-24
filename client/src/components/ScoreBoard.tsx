import { useScores } from "@/hooks/use-scores";
import { Trophy, Medal, Star } from "lucide-react";

export function ScoreBoard() {
  const { data: scores, isLoading } = useScores();

  // Sort scores just in case the API doesn't return them sorted
  // assuming higher score is better
  const sortedScores = scores?.sort((a, b) => b.score - a.score).slice(0, 10);

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center font-mono text-primary animate-pulse">
        LOADING DATABASE...
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/40 border border-primary/20 rounded-xl p-6 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6 border-b border-primary/20 pb-4">
        <Trophy className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
        <h2 className="text-xl font-display text-white">Hall of Fame</h2>
      </div>

      <div className="space-y-3">
        {sortedScores?.map((entry, index) => (
          <div 
            key={entry.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              index === 0 ? "bg-yellow-500/10 border-yellow-500/50" :
              index === 1 ? "bg-gray-400/10 border-gray-400/50" :
              index === 2 ? "bg-orange-700/10 border-orange-700/50" :
              "bg-muted/30 border-transparent hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`font-mono font-bold w-8 text-center ${
                index < 3 ? "text-white text-lg" : "text-muted-foreground"
              }`}>
                {index + 1}
              </span>
              <span className="font-mono text-foreground tracking-wider uppercase">
                {entry.username}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-display text-primary drop-shadow-[0_0_5px_rgba(219,39,119,0.5)]">
                {entry.score.toLocaleString()}
              </span>
              {index === 0 && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-spin-slow" />}
            </div>
          </div>
        ))}

        {(!sortedScores || sortedScores.length === 0) && (
          <div className="text-center py-8 text-muted-foreground font-mono">
            NO RECORDS FOUND. BE THE FIRST LEGEND.
          </div>
        )}
      </div>
    </div>
  );
}
