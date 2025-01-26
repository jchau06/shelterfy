// Add endpoints here to make sure user can retrieve their saved locations from database


import React from "react";

const Storage = () => {
  
  const mockData = [
    { id: 1, name: "Shelter One", address: "123 Shelter St", zip: 12345, city: 'Anaheim'},
    { id: 2, name: "Shelter Two", address: "456 Safe Haven Ave" , zip: 23456, city: 'Anaheim'},
    { id: 3, name: "Shelter Three", address: "789 Homeless St" , zip: 90012, city: 'Anaheim'},
    { id: 4, name: "Shelter One", address: "123 Shelter St", zip: 12345, city: 'Anaheim'},
    { id: 5, name: "Shelter Two", address: "456 Safe Haven Ave" , zip: 23456, city: 'Anaheim'},
    { id: 6, name: "Shelter Three", address: "789 Homeless St" , zip: 90012, city: 'Anaheim'}
  ];

  if (mockData){
    console.log()
  }
    

  
  return (
    <div
      style={{
        position: "fixed", // Keeps it on the right side of the screen
        top: "50%", // Centers it vertically
        right: "70px", // Space from the right edge
        transform: "translateY(-50%)", // Adjust based on its height
        backgroundColor: "#E0E0E0",
        padding: "1rem",
        borderRadius: "12px",
        width: "350px",
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
        Saved Locations:
      </h2>
      <ul
        style={{
          maxHeight: "400px", // Limits the height of the list
          overflowY: "scroll", // Makes the list scrollable when content exceeds height
          padding: "0 4px",
          scrollbarWidth: "thin", // Optional for better scrollbar appearance
        }}
      >
        {mockData.map((item, index) => (
          <li key={index} className="m-4">
            <div className="flex flex-col items-start bg-white rounded-2xl shadow-md p-6 w-full">
              <h4 className="text-black">Name: {item.name}</h4>
              <h4 className="text-black">Address: {item.address}</h4>
              <h4 className="text-black">Zip Code: {item.zip}</h4>
              <h4 className="text-black">City: {item.city}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Storage;
