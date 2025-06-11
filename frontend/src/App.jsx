import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import SubmitForm from './pages/SubmitForm';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Loading from './components/Loading';

export default function App() {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delay = setTimeout(() => setLoading(false), 1200); // Simulate loading delay
        return () => clearTimeout(delay);
    }, []);

    const handleLogin = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    if (loading) return <Loading />;

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
                <nav className="flex justify-between items-center bg-seedGreen text-seedGold px-6 py-4 shadow font-display">
                    <div className="flex gap-6">
                        <Link to="/" className="hover:underline">Submit</Link>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    </div>
                    {token ? (
                        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-1 rounded">Logout</button>
                    ) : (
                        <Link to="/login" className="bg-seedGold text-seedGreen px-4 py-1 rounded">Login</Link>
                    )}
                </nav>

                <main className="flex-grow p-6 max-w-4xl mx-auto">
                    <header className="text-center mb-8">
                        <img src="/theseed.gif" alt="The Seed Logo" className="w-40 mx-auto mb-2 drop-shadow-lg" />
                        <h1 className="text-3xl font-bold tracking-tight">The Seed: Dream Team Builder</h1>
                    </header>

                    <Routes>
                        <Route path="/" element={<SubmitForm />} />
                        <Route path="/login" element={<Login setToken={handleLogin} />} />
                        <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
                    </Routes>
                </main>

                <Footer />
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </Router>

    );
}
