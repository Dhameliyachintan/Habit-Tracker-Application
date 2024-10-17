import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);

    const notificationsShown = localStorage.getItem("notificationsShown");

    if (!notificationsShown) {
      storedHabits.forEach((habit) => {
        const message = getMotivationalMessage(habit.progress);
        toast.info(`${habit.habitName}: ${message}`);
      });

      localStorage.setItem("notificationsShown", "true"); 
    }
  }, []); 

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

  const toggleStatus = (index) => {
    const updatedHabits = [...habits];
    const currentHabit = updatedHabits[index];
    
    currentHabit.status = currentHabit.status === "Completed" ? "In Progress" : "Completed";
    
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    
    toast.success(
      currentHabit.status === "Completed"
        ? "Habit marked as completed!"
        : "Habit marked as in progress!"
    );
  };
  

  return (
    <div className="max-w-6xl mx-auto mt-[91px] p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Habit List</h1>

      {habits.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Habit Name</th>
              <th className="border px-4 py-2">Goals</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">Frequency</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Progress (%)</th>
              <th className="border px-4 py-2">Streak</th>
              <th className="border px-4 py-2">Motivational Message</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, index) => (
              <tr key={index}>
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
                <td className="border px-4 py-2">{habit.progress}%</td>
                <td className="border px-4 py-2">{habit.streak}</td>
                <td className="border px-4 py-2">{getMotivationalMessage(habit.progress)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No habits found. Add some habits to display here.</p>
      )}
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
