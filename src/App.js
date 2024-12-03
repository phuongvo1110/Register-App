import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Callback from "./components/Callback/Callback";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/callback" element={<Callback />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
