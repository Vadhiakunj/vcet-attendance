// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      const snapshot = await getDocs(collection(db, "attendance"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    Time: time,
  }));

  return (
    <div className="dashboard">
      <h1 className="">VCET Attendance</h1>
      <div className="innerDashboard">
        <h2 className="">Attendance Records</h2>

        <div className="grid-header">
          <div className="header cell">Name</div>
          <div className="header cell">Roll No</div>
          <div className="header cell">Division</div>
          <div className="header cell">Year</div>
          <div className="header cell">Date</div>
          <div className="header cell">Time</div>
        </div>

        {records.map((rec, index) => (
          <div key={rec.id} className="grid-row">
            <div className="cell">{rec.name}</div>
            <div className="cell">{rec.roll}</div>
            <div className="cell">{rec.division}</div>
            <div className="cell">{rec.year}</div>
            <div className="cell">{rec.date}</div>
            <div className="cell">{rec.time}</div>
          </div>
        ))}
      </div>
      <CSVLink
        data={csvData}
        filename={"attendance_records.csv"}
        className="link"
      >
        Export
        <img src="CSV.png" alt="CSV image" height="45" />
      </CSVLink>
      <button onClick={() => navigate("/checkin")} className="add">
        Add Students &rarr;
      </button>
    </div>
  );
}

export default Dashboard;
