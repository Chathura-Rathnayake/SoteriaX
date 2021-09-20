import React from "react";
import { useState, useEffect } from "react";
import { storage, firestore } from "../../firebase";

export default function Test() {
  
  const [link, setLink] = useState();

  // Create a reference to the file we want to download
  var storageRef = storage.ref();
  var starsRef = storageRef.child("vids/hu1.webm");

  // Get the download URL

  useEffect(() => {
    async function getVideoLink() {
      try {
        const response = await starsRef.getDownloadURL();
        console.log(response);
        setLink(response);
      } catch (err) {
        console.log(err);
      }
    }
    getVideoLink();
  }, []);

  // starsRef
  //   .getDownloadURL()
  //   .then((url) => {
  //     console.log(url);
  //   })
  //   .catch((error) => {
  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     switch (error.code) {
  //       case "storage/object-not-found":
  //         // File doesn't exist
  //         break;
  //       case "storage/unauthorized":
  //         // User doesn't have permission to access the object
  //         break;
  //       case "storage/canceled":
  //         // User canceled the upload
  //         break;

  //       // ...

  //       case "storage/unknown":
  //         // Unknown error occurred, inspect the server response
  //         break;
  //     }
  //   });

  //setting the useState hook
  // const [data, setData] = useState([]);

  // const formInfo = {
  //   username: "harcana",
  //   age: 69,
  // };

  // useEffect(() => {
  //   fetch("/retrieve")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  // useEffect(() => {
  //   fetch("/send", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(formInfo),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  //   console.log("done");
  // }, []);

  // useEffect(() => {
  //   fetch("/multipledocs")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  return (
    <div>
      {/* <h1>The Name: {data.name}</h1>
      <h1>The Age: {data.age}</h1> */}
      {typeof link !== "undefined" && ( //loading the component when the status is defined
        <a href={link}> see the video</a>
      )}
      <h1>Complaints</h1>
      {/* <table cellspacing="1" bgcolor="#000000">

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
        
      </table> */}
    </div>
  );
}
