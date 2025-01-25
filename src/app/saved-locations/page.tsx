import "./page.css"
import React from "react";
const page = () => {
  return (
    <div>
      <table id="savedLocationsTable">
        <thead>
          <tr>
            <th>Shelter Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody id="savedLocationsBody"></tbody>
      </table>
    </div>
  );
};

export default page;
