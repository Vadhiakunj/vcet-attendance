// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      const snapshot = await getDocs(collection(db, 'attendance'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecords(data);
    };
    fetchRecords();
  }, []);

  const csvData = records.map(({ name, roll, division, year, date, time }) => ({
    Name: name,
    Roll: roll,
    Division: division,
    Year: year,
    Date: date,
    Time: time
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">VCET Attendance</h1>
      <div className="bg-white shadow-md rounded p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
          <button onClick={() => navigate('/checkin')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Go to Check-In</button>
        </div>
        <CSVLink
          data={csvData}
          filename={'attendance_records.csv'}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-purple-700"
        >
          Export to CSV
        </CSVLink>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Roll No</th>
              <th className="border p-2">Division</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{rec.name}</td>
                <td className="border p-2">{rec.roll}</td>
                <td className="border p-2">{rec.division}</td>
                <td className="border p-2">{rec.year}</td>
                <td className="border p-2">{rec.date}</td>
                <td className="border p-2">{rec.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;