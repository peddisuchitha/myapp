import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { COMPANIES } from "./data/companiesData";
import Filters from "./components/Filters";
import CompaniesTable from "./components/CompaniesTable";
import CompaniesCards from "./components/CompaniesCards";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ location: "", industry: "" });
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [view, setView] = useState("cards");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Mock API fetch simulation
  useEffect(() => {
    setTimeout(() => {
      try {
        setCompanies(COMPANIES);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }, 700);
  }, []);

  const locations = useMemo(
    () => Array.from(new Set(companies.map((c) => c.location))).sort(),
    [companies]
  );
  const industries = useMemo(
    () => Array.from(new Set(companies.map((c) => c.industry))).sort(),
    [companies]
  );

  // Filter + Sort
  const filtered = useMemo(() => {
    let result = companies;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (filters.location)
      result = result.filter((c) => c.location === filters.location);
    if (filters.industry)
      result = result.filter((c) => c.industry === filters.industry);

    if (sortKey) {
      result = [...result].sort((a, b) => {
        const av = a[sortKey].toString().toLowerCase();
        const bv = b[sortKey].toString().toLowerCase();
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [companies, filters, search, sortKey, sortDir]);

  // Pagination
  const total = filtered.length;
  const paged = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  useEffect(() => setPage(1), [search, filters, sortKey, sortDir]);

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1>Companies Directory</h1>
          <p>Browse, filter, and sort company data with ease.</p>
        </header>

        <div className="filters-section">
          <Filters
            filters={filters}
            setFilters={setFilters}
            search={search}
            setSearch={setSearch}
            locations={locations}
            industries={industries}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortDir={sortDir}
            setSortDir={setSortDir}
            view={view}
            setView={setView}
          />
        </div>

        <main className="results-section">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="error">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="no-results">No companies found.</div>
          ) : (
            <>
              {view === "table" ? (
                <CompaniesTable data={paged} />
              ) : (
                <CompaniesCards data={paged} />
              )}
              <Pagination total={total} page={page} setPage={setPage} perPage={perPage} />
            </>
          )}
        </main>

        <footer className="app-footer">
          <p>© 2025 Companies Directory | Made with React</p>
        </footer>
      </div>
    </div>
  );
}
