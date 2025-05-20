// src/components/LiveTable.js
import React from "react";

export default function LiveTable({ data }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Store ID</th>
          <th>Customers In</th>
          <th>Customers Out</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, idx) => (
          <tr key={idx}>
            <td>{entry.store_id}</td>
            <td>{entry.customers_in}</td>
            <td>{entry.customers_out}</td>
            <td>{new Date(entry.time_stamp).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
