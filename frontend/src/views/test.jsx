import React from "react";
import { useState, useEffect } from "react";

export default function Test() {
  //setting the useState hook
  const [data, setData] = useState({});

  const formInfo = {
    username: "harcana",
    age: 69,
  };

  useEffect(() => {
    fetch("/retrieve")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    fetch("/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formInfo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log("done");
  }, []);

  return (
    <div>
      <h1>The Name: {data.name}</h1>
      <h1>The Age: {data.age}</h1>
    </div>
  );
}
