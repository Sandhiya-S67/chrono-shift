import { Link, useLocation } from "wouter";
import { Gamepad2 } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-40 border-b border-secondary/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Gamepad2 className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(219,39,119,0.8)] transition-all" />
            <span className="font-display text-lg text-primary drop-shadow-[0_0_8px_rgba(219,39,119,0.6)]">
              CHRONO SHIFT
            </span>
          </Link>

          <div className="flex gap-6 font-mono text-sm">
            <Link 
              href="/" 
              className={`transition-colors ${isActive("/") ? "text-primary font-bold drop-shadow-[0_0_8px_rgba(219,39,119,0.6)]" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="link-home"
            >
              HOME
            </Link>
            <Link 
              href="/play" 
              className={`transition-colors ${isActive("/play") ? "text-primary font-bold drop-shadow-[0_0_8px_rgba(219,39,119,0.6)]" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="link-play"
            >
              PLAY
            </Link>
            <Link 
              href="/leaderboard" 
              className={`transition-colors ${isActive("/leaderboard") ? "text-primary font-bold drop-shadow-[0_0_8px_rgba(219,39,119,0.6)]" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="link-leaderboard"
            >
              SCORES
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors ${isActive("/about") ? "text-primary font-bold drop-shadow-[0_0_8px_rgba(219,39,119,0.6)]" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="link-about"
            >
              ABOUT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
