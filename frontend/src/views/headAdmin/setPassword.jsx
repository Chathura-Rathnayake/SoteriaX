import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

//importing components to be loaded
import EnterPassword from "../../components/headAdmin/enterPassword";
import SetPasswordError from "../../components/headAdmin/setPasswordError";

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <EnterPassword status={props.status} />;
  }
  return <SetPasswordError />;
}

export default function SetPassword() {
  //fetching URL parameters to retrieve user token and uid
  const search = useLocation().search;
  const uid = new URLSearchParams(search).get("uid");
  const token = new URLSearchParams(search).get("token");

  const [status, setStatus] = useState();

  const toSend = {
    uid: uid,
    token: token,
  };

  //asking from the backend, whether this information is valid
  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch("/isResetTokenValid", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toSend), //send the information to the backend
        });
        const json = await response.json(); //get the response
        setStatus(json.status);
      } catch (err) {
        console.log(err);
      }
    }
    fetchStatus();
  }, []);

  console.log(status);

  return (
    // <div>
    //   <h1>Set Your Password</h1>
    //   <p>UID :{uid}</p> <p>TOKEN: {token}</p> <p> {status}</p>
    // </div>
    <div>
      <Greeting isLoggedIn={true} status={status} />
    </div>
  );
}
