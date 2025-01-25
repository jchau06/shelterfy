import express from "express";
import pool from "./connect"; 
import path from "path";
import * as fs from "fs";
import bodyParser from 'body-parser';
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
    try {
      const result = await dpool.query("");
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  } 
};

initializeDatabase().catch((error) => {
  console.error("Database initialization failed. Exiting application.", error);
  process.exit(1); 
});

app.get("/", async (req, res) => {
  try {
    const result = await dpool.query("");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching initial data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}`);
});