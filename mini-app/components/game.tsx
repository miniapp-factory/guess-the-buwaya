"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Profile = {
  name: string;
  salary: number;
  wealth: number;
  isCorrupt: boolean;
  image: string;
};

const profiles: Profile[] = [
  { name: "John Doe", salary: 50000, wealth: 200000, isCorrupt: false, image: "/john.png" },
  { name: "Jane Smith", salary: 75000, wealth: 500000, isCorrupt: true, image: "/jane.png" },
  { name: "Alex Johnson", salary: 60000, wealth: 300000, isCorrupt: false, image: "/alex.png" },
  { name: "Maria Garcia", salary: 85000, wealth: 700000, isCorrupt: true, image: "/maria.png" },
];

export default function Game() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [started, setStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const current = profiles[index];

  const handleGuess = (guess: boolean) => {
    const correct = guess === current.isCorrupt;
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      setFeedback(null);
      setIndex((i) => (i + 1) % profiles.length);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      {!started ? (
        <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Political Hearing Game</h2>
          <Button onClick={() => setStarted(true)}>Start Game</Button>
          <Button variant="outline" onClick={() => setShowInstructions(true)}>How to Play</Button>
        </div>
      ) : showInstructions ? (
        <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold">How to Play</h2>
          <p>Review each politician’s monthly salary and declared wealth. Decide quickly if they are <strong>CORRUPT</strong> or <strong>NOT CORRUPT</strong> by tapping the respective button.</p>
          <p>If your guess is correct, the screen briefly confirms it; if you’re wrong, the screen turns red for a moment. Then the game moves on to the next profile, keeping track of your score as you play.</p>
          <Button onClick={() => setShowInstructions(false)}>Back to Game</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold">{current.name}</h2>
          <img src={current.image} alt={`${current.name} portrait`} className="w-32 h-32 mb-4" />
          <p>Monthly Salary: ${current.salary}</p>
          <p>Declared Wealth: ${current.wealth}</p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => handleGuess(false)}>
              NOT CORRUPT
            </Button>
            <Button variant="outline" onClick={() => handleGuess(true)}>
              CORRUPT
            </Button>
          </div>
          {feedback && (
            <div
              className={`text-lg font-medium ${
                feedback === "correct" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback === "correct" ? "Correct!" : "Incorrect!"}
            </div>
          )}
          <p className="mt-4">Score: {score}</p>
        </div>
      )}
    </div>
  );
}
