import express from "express";
import pool from "./connect"; 
import path from "path";
import * as fs from "fs";
import bodyParser from 'body-parser';
import { error } from "console";
var cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());
const serverPort = 3001;
let dpool = pool;

const executeSqlFile = async (filePath: string): Promise<void> => {
  try {
    const sql = fs.readFileSync(filePath, "utf-8");
    await dpool.query(sql);
    console.log(`Successfully executed ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error executing ${path.basename(filePath)}:`, error);
    throw error;
  }
};



const initializeDatabase = async () => {
  try {
    const createTablesPath = path.join(__dirname, "tables.sql");
    await executeSqlFile(createTablesPath);
    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  } 
};

initializeDatabase().catch((error) => {
  console.error("Database initialization failed. Exiting application.", error);
  process.exit(1); 
});



app.post("/create", async (req, res) => {
    // NOTE: this function assumes validation has been done on the frontend!
    const {clerkId, userName, fName, lName, email} = req.body;
    try{
        await dpool.query("INSERT INTO login_info \
             (user_id, username, firstname, lastname, email) VALUES ($1, $2, $3, $4, $5)",
            [clerkId, userName, fName, lName, email]
        );
        res.status(200).send("Successfully created new user.")
    }
    catch(error:any){
        res.status(500).send(error.message);
    }
});


app.get("/get-location", async (req, res) => {
  let baseString = "SELECT * FROM locations";
  const locParams = req.body;
  let usedParams:Array<string>;
  if (locParams.zipCode != null){
    baseString += "WHERE zip_code = $1";
    usedParams = [locParams.zipCode];
  }
  else if (locParams.addrLineOne != null){
    baseString += `WHERE address_line_one = $1 ${locParams.addrLineTwo && " AND WHERE address_line_two = $2"}}`; 
    usedParams = [locParams.addrLineOne, locParams.addrLineTwo].filter((elem) => elem != null);
  }
  else {
    throw new Error("this shouldn't happen i guess");
  }
  try{
    const result = await dpool.query(baseString,
        [...usedParams]
    );
    
    res.json(result.rows);
}
catch(error:any){
    res.status(500).send(error.message);
}
});

app.post("/add-location", async (req, res) => {
  const locParams = req.body;
  let baseString = `INSERT INTO locations 
  (address_line_one, locality, state_abbr, zip_code, latitude, longitude 
  ${locParams.addrLineTwo && ",address_line_two "}
  ${locParams.isShelter && ",is_shelter"})
  VALUES ($1, $2, $3, $4, $5, $6 ${locParams.addrLineTwo && ",$7 "}
  ${(locParams.addrLineTwo != null && locParams.isShelter && ",$8") ||
    (locParams.isShelter && ",$7")
   })`;
  try{
    await dpool.query(baseString,
        [locParams.addrLineOne, locParams.stateAbbr,
          locParams.zipCode, locParams.lat, locParams.long, locParams.addrLineTwo?? null, locParams.isShelter?? null
        ].filter((elem) => elem != null)
    );
    
    res.sendStatus(200);
}
catch(error:any){
    res.status(500).send(error.message);
}
});


app.get("/get-saved-loc", async (req, res) => {
  const {clerkId}:{clerkId:string} = req.body;
  try{
    const result = await dpool.query(`SELECT (locations.loc_id,
      locations.address_line_one,
      locations.address_line_two,
      locations.locality,
      locations.state_abbr,
      locations.zip_code,
      locations.latitude,
      locations.longitudem
      locations.is_shelter) FROM locations NATURAL INNER JOIN user_to_location
      WHERE user_to_location.user_id = $1`, [clerkId]);
      res.json(result.rows);
  }
  catch(error:any){
    res.status(500).send(error.message);
  }
});

app.post("/add-to-saved-loc", async (req, res) => {
  const {clerkId, locId}:{clerkId:string, locId:number} = req.body;
  try{
    await dpool.query("INSERT INTO user_to_locations (user_id, loc_id) VALUES ($1, $2)",
        [clerkId, locId]
    );
    
    res.sendStatus(200);
}
catch(error:any){
    res.status(500).send(error.message);
}
});


app.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}`);
});