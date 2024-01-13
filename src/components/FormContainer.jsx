import React from "react";

export const FormContainer = ({ children }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flex: 1,
    }}
  >
    {children}
  </div>
);
