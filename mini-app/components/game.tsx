"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Profile = {
  name: string;
  salary: number;
  wealth: number;
  isCorrupt: boolean;
};

const profiles: Profile[] = [
  { name: "John Doe", salary: 50000, wealth: 200000, isCorrupt: false },
  { name: "Jane Smith", salary: 75000, wealth: 500000, isCorrupt: true },
  { name: "Alex Johnson", salary: 60000, wealth: 300000, isCorrupt: false },
  { name: "Maria Garcia", salary: 85000, wealth: 700000, isCorrupt: true },
];

export default function Game() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

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
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">{current.name}</h2>
      <img src="/graphic.png" alt="Game graphic" className="w-32 h-32 mb-4" />
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
  );
}
