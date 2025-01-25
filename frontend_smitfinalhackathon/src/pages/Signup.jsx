import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      if (res.data.success) {
        alert("Signup Successful!");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Signup Failed");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
