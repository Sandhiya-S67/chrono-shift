import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.scores.list.path, async (req, res) => {
    const scores = await storage.getTopScores();
    res.json(scores);
  });

  app.post(api.scores.create.path, async (req, res) => {
    try {
      const input = api.scores.create.input.parse(req.body);
      const score = await storage.createScore(input);
      res.status(201).json(score);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}

// Simple seed function to populate leaderboard if empty
async function seedLeaderboard() {
  const existing = await storage.getTopScores();
  if (existing.length === 0) {
    await storage.createScore({ username: "ChronoMaster", score: 5000 });
    await storage.createScore({ username: "TimeTraveler", score: 3500 });
    await storage.createScore({ username: "Glitch", score: 2000 });
    await storage.createScore({ username: "Novice", score: 800 });
  }
}

// Run seed asynchronously
seedLeaderboard().catch(console.error);
