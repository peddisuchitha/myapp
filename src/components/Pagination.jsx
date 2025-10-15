import React from "react";
import "../App.css";

export default function Pagination({ total, page, setPage, perPage }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={page === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
        Next
      </button>
    </div>
  );
}
