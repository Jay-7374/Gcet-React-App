import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({ name: "", email: "", pass: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {

      const apiUrl = import.meta.env.VITE_API_URL + "/users/register";
      const res = await axios.post(apiUrl, user);

      setUsers([...users, user]);
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Register</h3>
      <p>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Email address"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="New Password"
          value={user.pass}
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <hr />
      {users && users.map((value, idx) => (
        <li key={idx}>{value.name} - {value.email}</li>
      ))}
    </div>
  );
}