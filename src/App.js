import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import { useState } from "react";
import { AuthProvider } from "./component/form/Authprovider";
import AdminDashboard from "./Dashboard/AdminDashboard.js";
import Home from "./pages/Home/Home.js";
import Navbar from "./component/Navbar.js";
import HabitTrackerForm from "./component/HabitTrackerForm.js";
import UserDashboard from "./Dashboard/UserDashboard.js";
import UserEditForm from "./component/UserEditForm.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthProvider>
        <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
    </AuthProvider>
  );
}

function AppRoutes({ isAuthenticated, onLogin }) {
  const location = useLocation();

  const shouldShowHeader = !["/login", "/registration"].includes(
    location.pathname
  );

  return (
    <div className="App">
      {shouldShowHeader && <Navbar />}
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<Login onLogin={onLogin} />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              <Route path="/userDashboard" element={<UserDashboard />} />
              <Route path="/habitTrackerForm" element={<HabitTrackerForm />} />
              <Route path="/usereditform" element={<UserEditForm />} />
            </Routes>
    </div>
  );
}

export default App;
