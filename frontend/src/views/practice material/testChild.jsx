import React from "react";
import { useState, useEffect } from "react";

export default function TestChild(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = props.data
      .collection("complaints")
      .doc("m9npqbam5jhh7R7LaUZt")
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        setData(doc.data());
      });

    return () => {
      unsubscribe();
    };
  }, [props.data]);

  return (
    <div>
      {data && (
        <div>
          <h1>Test Child</h1>
          {data.date}
        </div>
      )}
    </div>
  );
}
