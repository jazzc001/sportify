import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useEffect } from "react/cjs/react.production.min";

function FormLogin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log(user);
      await axios.post("http://localhost:3001/user/login", user);
    } catch (error) {
      console.log("User could not be logged in", error.message);
    }

    navigate("/dashboard");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input type="submit" value="Login" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default FormLogin;
