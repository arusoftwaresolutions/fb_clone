import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to Facebook Clone</h1>
      <button onClick={logout} className="bg-red-600 text-white p-2 rounded hover:bg-red-700">Logout</button>
    </div>
  );
}

export default Home;

