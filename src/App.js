// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CheckIn from './components/CheckIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';

// function ProtectedRoute({ children }) {
//   const [user, loading] = useAuthState(auth);
//   if (loading) return <p>Loading...</p>;
//   return user?.email === 'admin@example.com' ? children : <Navigate to="/" />;
// }
function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/" />;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/checkin" element={<CheckIn />} />
      </Routes>
    </Router>
  );
}

export default App;