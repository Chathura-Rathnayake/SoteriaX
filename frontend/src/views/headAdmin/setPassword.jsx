import React from "react";
import { useLocation } from "react-router-dom";

export default function SetPassword() {
  const search = useLocation().search;
  const uid = new URLSearchParams(search).get("uid");
  const token = new URLSearchParams(search).get("token");

  return (
    <div>
      <h1>Set Your Password</h1>
      <p>UID :{uid}</p> <p>TOKEN: {token}</p>{" "}
    </div>
  );
}
