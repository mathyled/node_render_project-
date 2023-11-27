import express from "express";
import pg from "pg";
import { config } from "dotenv";
config()
const { DB_URL } = process.env;

const pool = new pg.Pool({
    connectionString: DB_URL,
    // ssl:true
})

const app = express()
const PORT = 3000


app.get("/", (req,res) => {
  res.send("holaaa")
})

app.get("/ping", async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()')
       return res.json(result.rows[0])        
    } catch (error) {
        console.error('error #%d', error)
    }

})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT );
})