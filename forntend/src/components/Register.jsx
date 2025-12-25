import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {  name, email, phone, password});
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-96">
  <h1 className="text-2xl font-bold mb-6 text-center">Facebook Register</h1>
  
  <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full mb-4 p-2 border rounded"
    required
  />

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full mb-4 p-2 border rounded"
    required
  />

  {/* New Phone Input */}
  <input
    type="text"
    placeholder="Phone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
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
    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
  >
    Register
  </button>

  <p className="mt-4 text-center">
    Already have an account? <Link to="/" className="text-blue-600">Login</Link>
  </p>
</form>

    </div>
  );
}

export default Register;

