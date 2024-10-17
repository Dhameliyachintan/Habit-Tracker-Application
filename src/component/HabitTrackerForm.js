import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HabitTrackerForm() {
  const navigate = useNavigate();

  const [habitName, setHabitName] = useState("");
  const [goals, setGoals] = useState("");
  const [startDate, setStartDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);

  const [submittedHabit, setSubmittedHabit] = useState(null);

  const getMotivationalMessage = (progress) => {
    if (progress === 100) {
      return "You're crushing it! Keep up the great work!";
    } else if (progress >= 75) {
      return "Almost there, keep going!";
    } else if (progress >= 50) {
      return "You're halfway to your goals!";
    } else if (progress >= 25) {
      return "Good start! Keep building momentum!";
    } else {
      return "Getting started is the hardest part!";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!habitName || !goals || !startDate || !frequency) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newHabit = {
      habitName,
      goals,
      startDate,
      frequency,
      progress,
      streak,
      motivationalMessage: getMotivationalMessage(progress),
    };

    const existingHabits = JSON.parse(localStorage.getItem("habits")) || [];

    const isDuplicate = existingHabits.some(
      (habit) => habit.habitName === habitName && habit.startDate === startDate
    );
    if (isDuplicate) {
      toast.error("Habit already exists for the given start date.");
      return;
    }

    localStorage.setItem("habits", JSON.stringify([...existingHabits, newHabit]));

    toast.success("Habit added successfully!");
    setSubmittedHabit(newHabit); 
    resetForm();
    navigate("/userDashboard");
  };

  const resetForm = () => {
    setHabitName("");
    setGoals("");
    setStartDate("");
    setFrequency("");
    setProgress(0);
    setStreak(0);
  };

  return (
    <div className="max-w-xl mx-auto mt-[91px] p-6 bg-white rounded-lg shadow-md pt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Habit Name:</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Goals:</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="e.g., Run 5 miles, read 30 pages"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Frequency:</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="">Select Frequency</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Progress (%):</label>
          <input
            type="number"
            min="0"
            max="100"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Streak (Days/Weeks):</label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={streak}
            onChange={(e) => setStreak(Number(e.target.value))}
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}