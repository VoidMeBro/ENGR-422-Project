import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});



//app.get -- sets the route on the express server, listening for GET requests
// /api/users --the URL path that the frontend will call to retrieve user data, can be changed to match your specific needs
// Req: request is the request that is being sent to the server
// res: response is the response that the server will send back to the client

// db.query('SELECT * FROM users' -- executes a SQL query against the database

// (err: Error | null, results: any) => { ... } -- callback function that handles the result of the query, 
//  -- err:error|null will contain any error that occurred, and results:any will contain the data retrieved from the database
// res.json(results) -- res.json sends the "results" back to the client in JSON format
// the "results" in res.json(results) is the results of the SQL query being sent


// '/api/users' seems to be generic, change tis to the correct route
// query is just generic

  db.connect((err: Error | null) => {
  if (err) {
    console.error('Database connection failed:', err.message); // ← will show in terminal
  } else {
    console.log('Connected to MySQL database');
  }
});


/*----- may be used to register new accounts ---------

app.post('/api/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10); // ← hash before saving

  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],                           // ← save the hash, not plain text
    (err: Error | null) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "User registered" });
    }
  );
});
-------------------------------*/

//----- login route/API, checks if the username exists and if the password matches------//
app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

    db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err: Error | null, results: any[]) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(401).json({ success: false, message: "Username does not exist" });
      }

      //console.logs are just for testing to see wherethe problem is, can be removed later
      console.log('Password entered:', JSON.stringify(password));
      console.log('Password in DB:',   JSON.stringify(results[0].password));
      console.log('Match:', password === results[0].password);

      // Plain text comparison since passwords aren't hashed yet
      if (password === results[0].password) {
        res.json({ success: true, user: results[0] });
      } else {
        res.status(401).json({ success: false, message: "Incorrect password" });
      }
    }
  );
});


app.get('/api/users', (req: Request, res: Response) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});



//--------API to register new users------------//
app.post('/api/register', (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password, role, institution } = req.body;
  const roleMap: Record<string, number> = {
  student: 1,
  faculty: 2,
  researcher: 3,
  administrator: 4,
  community: 5,
  observer: 6
};
const roleId = roleMap[role.toLowerCase()] || 0; // Default to 0 if role is not recognized

  console.log('Register payload:', { firstName, lastName, username, email, roleId, institution }); // logs the input from the form

  db.query(
    'INSERT INTO `users`(`firstName`, `lastName`, `username`, `email`, `password`, `roleID`, `institution`) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, username, email, password, roleId, institution],
    (err: Error | null) => {
      if (err) {
        console.error('MySQL error:', err.message); // This will display errors in the terminal for debugging
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, message: "User registered successfully" });
    }
  );
});




app.listen(5000, () => console.log('Server running on port 5000'));

