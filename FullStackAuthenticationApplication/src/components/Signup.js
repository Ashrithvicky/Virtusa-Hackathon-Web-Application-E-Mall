import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // Import the CSS file

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%])[A-Za-z\d@*%]{8,}$/;

const validDepartments = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Biotechnology",
  "Chemical",
  "Aerospace",
  "Artificial Intelligence"
];


export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    age: "",
    department: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!passwordRegex.test(form.password)) {
    alert(
      "Password must include 1 uppercase, 1 lowercase, 1 number, one of @ * %, and at least 8 characters."
    );
    return;
  }

  if (!validDepartments.includes(form.department)) {
    alert("Department does not match the allowed list.");
    return;
  }

  try {
    await axios.post("http://localhost:8080/api/auth/signup", form);
    alert("Signup successful");
    navigate("/");
  } catch (error) {
    if (error.response?.status === 409) {
      alert(error.response.data);
    } else {
      alert("Signup failed. Please try again.");
    }
  }
};


  return (
    <div className="signup-bg">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Signup</h2>
        {Object.keys(form).map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="signup-input"
            required={true}
            type={
              field === "password"
                ? "password"
                : field === "age"
                ? "number"
                : "text"
            }
            min={field === "age" ? 0 : undefined}
          />
        ))}
        <button type="submit" className="signup-btn">
          Signup
        </button>
      </form>
    </div>
  );
}
