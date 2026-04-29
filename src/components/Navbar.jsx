import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-md text-sm ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto flex gap-3 p-3">
        <Link to="/" className={linkStyle("/")}>Dashboard</Link>
        <Link to="/search" className={linkStyle("/search")}>Search</Link>
        <Link to="/history" className={linkStyle("/history")}>History</Link>
      </div>
    </div>
  );
}