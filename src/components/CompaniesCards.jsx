import React from "react";
import "../App.css";

export default function CompaniesCards({ data }) {
  return (
    <div className="card-grid">
      {data.map((c) => (
        <div key={c.id} className="company-card">
          <h3>{c.name}</h3>
          <p className="small-text">
            {c.industry} • {c.location}
          </p>
          <div className="details">
            <p>Employees: <strong>{c.employees}</strong></p>
            <p>Founded: <strong>{c.founded}</strong></p>
          </div>
        </div>
      ))}
    </div>
  );
}
