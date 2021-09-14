import React from "react";
import { firestore } from "../../firebase";
import TestChild from "./testChild";

export default function TestParent() {
  return (
    <div>
      Test Parent
      <TestChild data={firestore}> </TestChild>
    </div>
  );
}
