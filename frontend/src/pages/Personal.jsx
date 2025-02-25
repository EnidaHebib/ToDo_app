import { useState } from "react";

const Personal = () => {
  const [quote, setQuote] = useState("");
  const [goal, setGoal] = useState(""); // For personal goal input
  const [habits, setHabits] = useState(""); // For habit tracker input
  const [inspiration, setInspiration] = useState("Stay positive and keep going!");

  // Static list of motivational quotes
  const quotes = [
    "Believe in yourself and all that you are.",
    "You are stronger than you think.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream it. Wish it. Do it.",
    "Stay positive, work hard, and make it happen.",
    "The only way to do great work is to love what you do."
  ];

  // Pick a random quote from the list
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // Set the quote when the component is mounted
  useState(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Personal Dashboard</h1>

      {/* Daily Motivational Quote */}
      <div className="mb-6 bg-yellow-200 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Daily Motivational Quote</h2>
        <p>{quote ? quote : "Loading quote..."}</p>
      </div>

      {/* Personal Goal */}
      <div className="mb-6 bg-green-200 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Personal Goal</h2>
        <textarea
          className="w-full p-3 border rounded-md text-sm resize-none"
          placeholder="Enter your personal goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows="3"
        />
      </div>

      {/* Habit Tracker */}
      <div className="mb-6 bg-blue-200 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Habit Tracker</h2>
        <textarea
          className="w-full p-3 border rounded-md text-sm resize-none"
          placeholder="Enter your habit to track"
          value={habits}
          onChange={(e) => setHabits(e.target.value)}
          rows="3"
        />
      </div>

      {/* Inspiration Feed */}
      <div className="mb-6 bg-purple-200 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Inspiration Feed</h2>
        <p>{inspiration}</p>
      </div>
    </div>
  );
};

export default Personal;
