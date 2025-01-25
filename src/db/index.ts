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

app.get("/", async (req, res) => {
  try {
    const result = await dpool.query("SELECT ");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching initial data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.post("/create", async (req, res) => {
    // NOTE: this function assumes validation has been done on the frontend!
    const {userName, fName, lName, email, pass} = req.body;
    try{
        await dpool.query("INSERT INTO login_info \
             (username, firstname, lastname, email, password) VALUES ($1, $2, $3, $4, $5)",
            [userName, fName, lName, email, pass]
        );
        res.status(200).send("Successfully created new user.")
    }
    catch(error:any){
        res.status(500).send(error.message);
    }
});


app.post("/login", async (req, res) => {
    const {name, password} = req.body;
    try{
        const result = await dpool.query("SELECT (username, password) FROM login_info WHERE username = $1",
            [name]
        );
        if (result.rowCount! < 1){
            throw new Error("User does not exist!");
        }
        if (result.rows[0].password !== password){
            throw new Error("Incorrect login info!");
        }
        res.sendStatus(200);
    }
    catch(error:any){
        res.status(500).send(error.message);
    }
});

app.get("/get-location", async (req, res) => {

});

app.post("/add-location", async (req, res) => {

});

app.post("/add-to-saved-loc", async (req, res) => {

});


app.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}`);
});