"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Profile = {
  name: string;
  salary: number;
  wealth: number;
  isCorrupt: boolean;
  image: string;
  time: number;
};

const profiles: Profile[] = [
  { name: "John Doe", salary: 50000, wealth: 200000, isCorrupt: false, image: "/john.png", time: 10 },
  { name: "Jane Smith", salary: 75000, wealth: 500000, isCorrupt: true, image: "/jane.png", time: 10 },
  { name: "Alex Johnson", salary: 60000, wealth: 300000, isCorrupt: false, image: "/alex.png", time: 10 },
  { name: "Maria Garcia", salary: 85000, wealth: 700000, isCorrupt: true, image: "/maria.png", time: 10 },
];

export default function Game() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [started, setStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const current = profiles[index];

  const handleGuess = (guess: boolean) => {
    const correct = guess === current.isCorrupt;
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      setFeedback(null);
      if (index + 1 >= profiles.length) {
        setGameOver(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, 1000);
  };

  const resetGame = () => {
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setGameOver(false);
    setTimeLeft(10);
  };

  useEffect(() => {
    if (!started || gameOver || showInstructions) return;
    if (timeLeft === 0) {
      handleGuess(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [started, gameOver, showInstructions, timeLeft, handleGuess]);

  useEffect(() => {
    if (!started || gameOver || showInstructions) return;
    setTimeLeft(current.time);
  }, [index, started, gameOver, showInstructions]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-200">
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
      ) : gameOver ? (
        <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Game Over</h2>
          <img src="/final-score.png" alt="Final score graphic" className="w-32 h-32 mb-4" />
          <p className="text-xl">Your final score: {score} / {profiles.length}</p>
          <Button onClick={resetGame}>Play Again</Button>
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
          <p className="text-lg">Time: {current.time}s</p>
          <p className="text-lg">Time left: {timeLeft}s</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(timeLeft / current.time) * 100}%` }}
            />
          </div>
          {feedback && (
            <div
              className={`text-lg font-medium ${
                feedback === "correct" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback === "correct" ? "Correct!" : "Incorrect!"}
              {feedback === "correct" && <span className="text-4xl ml-2">🎉</span>}
            </div>
          )}
          <p className="mt-4">Score: {score}</p>
        </div>
      )}
    </div>
  );
}
