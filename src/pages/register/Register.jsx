import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className=" text-center">
      <h1>Register</h1>
      <div className=" flex gap-2">
        <Link to={"/auth/login"} className="text-secondary">
          Login
        </Link>
        <p>navigate to</p>
      </div>
    </div>
  );
}

export default Register;
