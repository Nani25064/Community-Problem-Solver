import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Issue {
  id: string;
  title: string;
  category: string;
  severity: string;
  description: string;
  createdAt: string;
  status: string;
  reporter?: string;
}

export default function BrowseIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchIssues() {
      setLoading(true);
      try {
        // 🔹 Replace this with your real API call
        const stored = localStorage.getItem("community_issues");
        const fakeIssues: Issue[] = stored ? JSON.parse(stored) : [
          {
            id: "1",
            title: "Can't upload images",
            category: "bug",
            severity: "high",
            description: "Image upload in post editor fails with error 500.",
            createdAt: new Date().toISOString(),
            status: "open",
            reporter: "User123",
          },
          {
            id: "2",
            title: "Add dark mode option",
            category: "feature",
            severity: "low",
            description: "Please add a dark mode toggle for better night reading.",
            createdAt: new Date().toISOString(),
            status: "under review",
            reporter: "Anonymous",
          },
        ];
        await new Promise((r) => setTimeout(r, 400));
        setIssues(fakeIssues);
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, []);

  const filtered = issues.filter((issue) => {
    const matchesFilter = filter === "all" || issue.category === filter;
    const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-6"
      >
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Browse Community Issues</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Explore reported problems and suggestions from the community.
            </p>
          </div>
          <Link
            to="/report"
            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            + Report an Issue
          </Link>
        </header>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Search issues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border px-3 py-2 placeholder:text-sm dark:bg-slate-800 dark:border-slate-700"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border px-3 py-2 dark:bg-slate-800 dark:border-slate-700"
          >
            <option value="all">All Categories</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature Request</option>
            <option value="abuse">Abuse / Harassment</option>
            <option value="help">Help</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Issue list */}
        {loading ? (
          <div className="flex justify-center py-10 text-gray-500">Loading issues...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No issues found. Try adjusting filters or search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((issue) => (
              <motion.div
                key={issue.id}
                whileHover={{ scale: 1.02 }}
                className="rounded-xl border p-4 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300 line-clamp-1">
                    {issue.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      issue.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : issue.severity === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {issue.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                  {issue.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="capitalize">#{issue.category}</span>
                  <span>{new Date(issue.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <Link
                    to={`/issues/${issue.id}`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View details →
                  </Link>
                  <span
                    className={`text-xs font-medium ${
                      issue.status === "open"
                        ? "text-green-600"
                        : issue.status === "under review"
                        ? "text-amber-600"
                        : "text-gray-500"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
