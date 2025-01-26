// Add endpoints here to make sure user can retrieve their saved locations from database


import React from "react";

const Storage = () => {
  return (
    <div
      style={{
        position: "fixed", // Fixed position to keep it on the right side of the screen
        top: "30%", // Center it vertically
        right: "100px", // Space from the right edge
        transform: "translateY(-50%)", // Center it based on its height
        backgroundColor: "#E0E0E0",
        padding: "50px",
        borderRadius: "12px",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "16px",
          color: "black",
        }}
      >
        Saved Locations
      </h2>
      {/* loop through all the data here, display in the table */}
    </div>
  );
};

export default Storage;
