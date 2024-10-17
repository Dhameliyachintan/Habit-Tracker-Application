import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashboard() {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
  }, []);

  const handleDelete = (index) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    toast.success("Habit deleted successfully!");
  };

  const handleEdit = (habit) => {
    navigate("/usereditform", { state: { habit } });
  };

  const toggleStatus = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index
        ? {
            ...habit,
            status: habit.status === "Completed" ? "In Progress" : "Completed",
          }
        : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    toast.success(
      updatedHabits[index].status === "Completed"
        ? "Habit marked as completed!"
        : "Habit marked as in progress!"
    );
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Habit Tracker Dashboard</h1>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {habits.length === 0 ? (
        <p>No habits found. Please add some habits.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Habit Name</th>
              <th className="border px-4 py-2">Goal</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">Frequency</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Progress (%)</th>
              <th className="border px-4 py-2">Streak</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{habit.habitName}</td>
                <td className="border px-4 py-2">{habit.goals}</td>
                <td className="border px-4 py-2">{habit.startDate}</td>
                <td className="border px-4 py-2">{habit.frequency}</td>
                <td>
                  <button
                    className={`px-2 py-1 rounded ${
                      habit.status === "Completed"
                        ? "bg-green-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                    onClick={() => toggleStatus(index)}
                  >
                    {habit.status === "Completed" ? "Completed" : "In Progress"}
                  </button>
                </td>
                <td className="border px-4 py-2">{habit.progress}</td>
                <td className="border px-4 py-2">{habit.streak}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700 ml-2"
                    onClick={() => handleEdit(habit)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 ml-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
