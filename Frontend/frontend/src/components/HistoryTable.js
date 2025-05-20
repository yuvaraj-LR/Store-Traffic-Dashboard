// src/components/HistoryTable.js
import React from "react";

export default function HistoryTable({ data }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Hour</th>
          <th>Customers In</th>
          <th>Customers Out</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, idx) => (
          <tr key={idx}>
            <td>{entry.hour}</td>
            <td>{entry.customers_in}</td>
            <td>{entry.customers_out}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
