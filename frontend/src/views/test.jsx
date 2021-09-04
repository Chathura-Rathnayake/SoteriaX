import React from "react";
import { useState, useEffect } from "react";

export default function Test() {
  //setting the useState hook
  const [data, setData] = useState([]);

  const formInfo = {
    username: "harcana",
    age: 69,
  };

  // useEffect(() => {
  //   fetch("/retrieve")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

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

  useEffect(() => {
    fetch("/multipledocs")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      {/* <h1>The Name: {data.name}</h1>
      <h1>The Age: {data.age}</h1> */}

      <h1>Complaints</h1>
      <table cellspacing="1" bgcolor="#000000">

        <tr bgcolor="#ffffff">
          <th>Message</th>
          <th>Status</th>
          <th>Viewed</th>
        </tr>

        {data.map((item) => (
          <tr bgcolor="#ffffff">
            <td> {item.msg}</td>
            <td> {item.status}</td>
            <td> {item.viewed}</td>
          </tr>
        ))}
        
      </table>
    </div>
  );
}
