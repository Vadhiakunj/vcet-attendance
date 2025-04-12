// src/components/CheckIn.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CheckIn() {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [division, setDivision] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const handleCheckIn = async () => {
    const now = new Date();
    await addDoc(collection(db, 'attendance'), {
      name,
      roll,
      division,
      year,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      timestamp: Timestamp.fromDate(now)
    });
    alert('Check-in successful!');
    setName('');
    setRoll('');
    setDivision('');
    setYear('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-green-300 p-4">
      <h1 className="text-3xl font-bold mb-6">VCET Attendance</h1>
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Student Check-In</h2>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="block mb-3 w-full p-2 border rounded" />
        <input type="text" placeholder="Roll No" value={roll} onChange={(e) => setRoll(e.target.value)} className="block mb-3 w-full p-2 border rounded" />
        <input type="text" placeholder="Division" value={division} onChange={(e) => setDivision(e.target.value)} className="block mb-3 w-full p-2 border rounded" />
        <select value={year} onChange={(e) => setYear(e.target.value)} className="block mb-4 w-full p-2 border rounded">
          <option value="">Select Year</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>
        <button onClick={handleCheckIn} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full rounded mb-4">Check In</button>
        <button onClick={() => navigate('/dashboard')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full rounded">Back to Dashboard</button>
      </div>
    </div>
  );
}

export default CheckIn;