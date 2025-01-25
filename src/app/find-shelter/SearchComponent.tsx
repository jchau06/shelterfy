"use client";

import React, { useState } from "react";


// Seearch results are all type Shelter
type Shelter =
{
  id: number;
  name: string;
  address: string;
  zip: number
}
const SearchComponent = () => {
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [results, setResults] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSearch = () => {
    if (!address && !zipCode) {
      return;
    }
    setLoading(true);

    if (address) {
      console.log(address);
    } else if (zipCode) {
      console.log(zipCode);
    }

    //  Tester DB just for functionality
    const mockData = [
      { id: 1, name: "Shelter One", address: "123 Shelter St", zip: 12345},
      { id: 2, name: "Shelter Two", address: "456 Safe Haven Ave" , zip: 23456},
      { id: 3, name: "Shelter Three", address: "789 Homeless St" , zip: 90012},
      { id: 4, name: "Shelter Four", address: "145 Zip Code Ave" , zip: 34567}, // Example with zip code
      { id: 5, name: "Shelter Five", address: "123 Shelter Rd" , zip: 13253},
      { id: 6, name: "Shelter Six", address: "7890 New St" , zip: 12743},
      {id: 7, name: "Shelter Seven", address: "456 Shelter St", zip: 12345},
      {id: 8, name: "Shelter Eight", address: "1 Shelter St", zip: 12345},
      {id: 9, name: "Shelter Nine", address: "2 Shelter St", zip: 12345},
      {id: 10, name: "Shelter Ten", address: "3 Shelter St", zip: 12345},
      {id: 11, name: "Shelter E", address: "4 Shelter St", zip: 12345}
    ];
    

  // Use a conditional to filter results based on the input type
  let filteredResults: Shelter[] = [];

  if (address) {
    // Filter by address if an address is provided
    filteredResults = mockData.filter(item =>
      item.address.toLowerCase().includes(address.toLowerCase()) || item.name.toLowerCase().includes(address.toLowerCase()) // Can search by address or name of location
    );
  } else if (zipCode) {
    filteredResults = mockData.filter((item) => item.zip === parseInt(zipCode)); // Exact match for zip code
  }

    console.log(filteredResults);
    setResults(filteredResults); // Set the filtered results
    setLoading(false); // Set loading to false after fetching the results
  };

  return (
    <div
      style={{
        position: "relative", // Fixed position to keep it on the right side of the screen
        boxSizing: "border-box",
        // right: "20px", // Space from the right edge
        // transform: "translateY(-50%)", // Center it based on its height
        backgroundColor: "#E0E0E0",
        padding: "20px",
        borderRadius: "12px",
        width: "20rem",
        textAlign: "center",
        margin: "5rem 0 0 0",
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
        Search for Shelters Nearby
      </h2>
      <input
        type="text"
        placeholder="enter an address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #CCC",
          boxSizing: "border-box",
          color: "black",
        }}
      />
      <p style={{ margin: "8px 0", fontSize: "14px", color: "#888" }}>or</p>
      <input
        type="number"
        placeholder="enter a zip code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "6px",
          border: "1px solid #CCC",
          boxSizing: "border-box",
          color: "black",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          // box-sizing: "border-box",
        }}
      >
        Search
      </button>
      {loading && <p>Loading search results...</p>} {/* Display loading message */}

      {results.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            maxHeight: "300px", // Set a maximum height for the results container
            overflowY: "scroll", // Make the results scrollable
            paddingRight: "10px", // Add some padding to the right to avoid the scrollbar being cut off
            // box-sizing: "border-box"
          }}
          >
          <h3 className="text-black font-semibold"
          >Search Results</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {results.map((result, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h4 style={{ margin: "0", color: "#007BFF" }}>{result.name}</h4>
                <p style={{ margin: "5px 0", color: "#555" }}>{result.address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.length === 0 && !loading && (
        <p style={{ color: "#888" }}>No results found. Try a different search.</p>
      )}
    </div>
  );
};

export default SearchComponent;
