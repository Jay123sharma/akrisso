import { useEffect, useState } from "react";
import { getHistory, saveHistory } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const deleteItem = (i) => {
    const updated = history.filter((_, index) => index !== i);
    saveHistory(updated);
    setHistory(updated);
  };

  const toggleFav = (i) => {
    const updated = [...history];
    updated[i].isFav = !updated[i].isFav;
    saveHistory(updated);
    setHistory(updated);
  };

  const sortByName = () => {
    setHistory([...history].sort((a, b) =>
      a.username.localeCompare(b.username)
    ));
  };

  const sortByFav = () => {
    setHistory([...history].sort((a, b) => b.isFav - a.isFav));
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Search History
      </h2>

      {/* Buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={sortByName} className="btn btn-light">
          Sort by Name
        </button>
        <button onClick={sortByFav} className="btn btn-light">
          Sort by Favourite
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {history.map((item, i) => (
          <div
            key={i}
            className="card p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-900">
                {item.username}
              </p>
              <p className="text-sm text-gray-500">
                {item.success ? "Success" : "Failed"}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <button onClick={() => toggleFav(i)}>
                {item.isFav ? "⭐" : "☆"}
              </button>

              <button
                onClick={() => navigate(`/profile/${item.username}`)}
                className="btn btn-primary"
              >
                View
              </button>

              <button
                onClick={() => deleteItem(i)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}