import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "../services/githubApi";
import Loader from "../components/Loader";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(username).then(setUser);
  }, [username]);

  if (!user) return <Loader />;

  return (
    <div className="max-w-md mx-auto text-center">

      <div className="bg-white p-6 rounded-xl shadow-sm border">

        <img
          src={user.avatar_url}
          className="w-24 rounded-full mx-auto"
        />

        <h2 className="mt-3 text-xl font-bold text-gray-900">
          {user.login}
        </h2>

        <p className="text-gray-500">
          {user.bio || "No bio available"}
        </p>

        <div className="mt-4 text-sm text-gray-700">
          <p>Followers: {user.followers}</p>
          <p>Repos: {user.public_repos}</p>
        </div>

      </div>

    </div>
  );
}