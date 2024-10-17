import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserEditForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { habit } = location.state || {};

  const [habitName, setHabitName] = useState(habit ? habit.habitName : "");
  const [goal, setGoal] = useState(habit ? habit.goal : "");
  const [startDate, setStartDate] = useState(habit ? habit.startDate : "");
  const [frequency, setFrequency] = useState(habit ? habit.frequency : "");
  const [status, setStatus] = useState(habit ? habit.status : "");
  const [progress, setProgress] = useState(habit ? habit.progress : "");
  const [streak, setStreak] = useState(habit ? habit.streak : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHabit = {
      habitName,
      goal,
      startDate,
      frequency,
      status,
      progress,
      streak,
    };

    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const habitIndex = storedHabits.findIndex(
      (h) => h.habitName === habit.habitName
    );

    if (habitIndex !== -1) {
      storedHabits[habitIndex] = updatedHabit;
      localStorage.setItem("habits", JSON.stringify(storedHabits));
      toast.success("Habit updated successfully!");
      navigate("/userdashboard");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Edit Habit</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Habit Name</label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Goal</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Frequency:
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          >
            <option value="">Select Frequency</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Progress (%)</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Streak</label>
          <input
            type="number"
            value={streak}
            onChange={(e) => setStreak(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
