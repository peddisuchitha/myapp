import React from "react";
import "../App.css";

export default function Spinner() {
  return (
    <div className="spinner">
      <div className="loader"></div>
      <p>Loading data...</p>
    </div>
  );
}
