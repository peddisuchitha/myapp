import React from "react";
import "../App.css";

export default function CompaniesTable({ data }) {
  return (
    <div className="table-container">
      <table className="companies-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Industry</th>
            <th>Employees</th>
            <th>Founded</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.location}</td>
              <td>{c.industry}</td>
              <td>{c.employees}</td>
              <td>{c.founded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
