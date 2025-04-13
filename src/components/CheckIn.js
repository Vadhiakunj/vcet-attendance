// src/components/CheckIn.js
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CheckIn() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [division, setDivision] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleCheckIn = async () => {
    const now = new Date();
    await addDoc(collection(db, "attendance"), {
      name,
      roll,
      division,
      year,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      timestamp: Timestamp.fromDate(now),
    });
    alert("Check-in successful!");
    setName("");
    setRoll("");
    setDivision("");
    setYear("");
  };

  return (
    <div className="checkInPage">
      <h1 className="">VCET Attendance</h1>
      <div className="checkIn">
        <h2 className="">Student Check-In</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Roll No"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <input
          type="text"
          placeholder="Division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        />
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>
        <button onClick={handleCheckIn} className="add enter">
          Check In
        </button>
        <button onClick={() => navigate("/dashboard")} className="link back">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default CheckIn;
