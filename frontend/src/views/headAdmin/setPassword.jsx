import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SetPassword() {
  //fetching URL parameters to retrieve user token and uid
  const search = useLocation().search;
  const uid = new URLSearchParams(search).get("uid");
  const token = new URLSearchParams(search).get("token");

  const toSend = {
    uid: uid,
    token: token,
  };

  //asking from the backend, whether this information is valid
  useEffect(() => {
    fetch("/isResetTokenValid", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(toSend), //send the information to the backend
    })
      .then((res) => res.json()) //get the response
      .then((data) => console.log(data));
    console.log("Done");
  }, []);

  return (
    <div>
      <h1>Set Your Password</h1>
      <p>UID :{uid}</p> <p>TOKEN: {token}</p>{" "}
    </div>
  );
}
