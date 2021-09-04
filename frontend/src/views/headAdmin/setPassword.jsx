import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

//importing components to be loaded
import EnterPassword from "../../components/headAdmin/enterPassword";
import SetPasswordError from "../../components/headAdmin/setPasswordError";

function ResetPassComponent(props) {
  const status = props.status;
  if (status == 0) {
    //token validation successfull
    return <EnterPassword status={status} uid={props.uid} />;
  } else if (status == 1 || status == 2)
    //token validation failed
    return <SetPasswordError status={status} />;
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
    <div>
      {typeof status !== "undefined" && ( //loading the component when the status is defined
        <ResetPassComponent status={status} uid={uid} />
      )}
    </div>
  );
}
