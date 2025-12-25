import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
 const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { identifier, password  });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
  <h1 className="text-2xl font-bold mb-6 text-center">Facebook Login</h1>

  {/* Email or Phone Input */}
  <input
    type="text"
    placeholder="Email or Phone"
    value={identifier}
    onChange={(e) => setIdentifier(e.target.value)}
    className="w-full mb-4 p-2 border rounded"
    required
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full mb-4 p-2 border rounded"
    required
  />

  <button
    type="submit"
    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
  >
    Login
  </button>

  <p className="mt-4 text-center">
    Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
  </p>
</form>

    </div>
  );
}

export default Login;

