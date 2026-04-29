import { useState } from "react";
import { fetchUser } from "../services/githubApi";
import { getHistory, saveHistory } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Search() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!input) return;

    setLoading(true);
    let history = getHistory();

    try {
      const data = await fetchUser(input);

      setUser(data);
      setError("");

      history.unshift({
        username: input,
        success: true,
        isFav: false,
      });

    } catch {
      setUser(null);
      setError("User not found");

      history.unshift({
        username: input,
        success: false,
        isFav: false,
      });
    }

    saveHistory(history);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">

      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Search GitHub User
      </h2>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Enter username..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <Loader />}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {user && (
        <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border text-center">

          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-20 rounded-full mx-auto"
          />

          <h3 className="mt-2 font-semibold text-gray-900">
            {user.login}
          </h3>

          <p className="text-gray-500 text-sm">
            {user.bio || "No bio available"}
          </p>

          <button
            onClick={() => navigate(`/profile/${user.login}`)}
            className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
          >
            View Profile
          </button>

        </div>
      )}
    </div>
  );
}