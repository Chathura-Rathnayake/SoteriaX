import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Admin() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <p>wazzap I'm the admin yo yo</p>
      <Button variant="text" color="default" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}
