import React from "react";
import "../App.css";

export default function Filters({
  filters,
  setFilters,
  search,
  setSearch,
  locations,
  industries,
  sortKey,
  setSortKey,
  sortDir,
  setSortDir,
  view,
  setView,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder=" Search company name"
      />

      <select
        value={filters.location}
        onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))}
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc}>{loc}</option>
        ))}
      </select>

      <select
        value={filters.industry}
        onChange={(e) => setFilters((p) => ({ ...p, industry: e.target.value }))}
      >
        <option value="">All Industries</option>
        {industries.map((ind) => (
          <option key={ind}>{ind}</option>
        ))}
      </select>

      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="location">Location</option>
        <option value="industry">Industry</option>
      </select>

      <button onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}>
        {sortDir === "asc" ? "⬆ Asc" : "⬇ Desc"}
      </button>

      <div className="view-toggle">
        <button
          onClick={() => setView("cards")}
          className={view === "cards" ? "active" : ""}
        >
          Cards
        </button>
        <button
          onClick={() => setView("table")}
          className={view === "table" ? "active" : ""}
        >
          Table
        </button>
      </div><br></br>
    </div>
  );
}
