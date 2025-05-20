// src/App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import LiveTable from "./components/LiveTable";
import HistoryTable from "./components/HistoryTable";

const socket = io("http://localhost:4000"); // Backend WebSocket

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});

function App() {
  const [liveData, setLiveData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  // WebSocket for live data
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("store-update", (data) => {
      console.log("Live update:", data);
      setLiveData((prev) => [data, ...prev].slice(0, 10));
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  // Fetch history on mount
  useEffect(() => {
    fetch("http://localhost:4000/api/history")
      .then((res) => res.json())
      .then((data) => setHistoryData(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏪 Store Dashboard</h2>
      <div className="mb-5">
        <h4>Live Store Activity</h4>
        <LiveTable data={liveData} />
      </div>
      <div>
        <h4>Last 24 Hours Summary</h4>
        <HistoryTable data={historyData} />
      </div>
    </div>
  );
}

export default App;
