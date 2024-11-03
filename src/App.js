import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
function App() {
    return (
        <Router basename='/Register-App'>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path='' element={<Dashboard/>}/>
                {/* Add more routes for Home, Login, etc. */}
            </Routes>
        </Router>
    );
}

export default App;
