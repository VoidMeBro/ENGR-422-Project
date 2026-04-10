import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

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
  db.query('SELECT * FROM users', (err: Error | null, results: any) => {
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

/* Chicken stuff =================================================================================================== */

/* Chicken queries */

function detectMimeType(buffer: Buffer) {
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) return 'image/jpeg';
    if (buffer[0] === 0x89 && buffer[1] === 0x50) return 'image/png';
    if (buffer[0] === 0x52 && buffer[1] === 0x49) return 'image/webp';
    return 'image/jpeg';
}

app.get('/api/chickenSelect', (req, res) => {
    const query = 'SELECT * FROM chickens';

    db.query(query, (err: Error | null, results: any) => {
        if(err) {
            console.log("Query error:", err);
            return res.status(500).json({ error: 'Database query error' });
        }
        const formatted = results.map((chicken: any) =>({
            ...chicken,
            imageData: chicken.imageData
            ? `data:${detectMimeType(chicken.imageData)};base64,${chicken.imageData.toString('base64')}`
            : null
        }))
        res.json(formatted);
    });
});

app.put('/api/updateChicken', (req, res) => {
    const {rfid,chickenName,gender,dob,species,weightKg,imageData,notes} = req.body;

    let imageBuffer = null;
    if (imageData) {
        const base64String = imageData.replace(/^data:image\/\w+;base64,/, '');
        imageBuffer = Buffer.from(base64String, 'base64');
    }

    const query = 'UPDATE chickens SET chickenName = ?, gender = ?, dateOfBirth = ?, species = ?, weightKg = ?, imageData = ?, notes = ? WHERE rfid = ?';
    db.query(query, [chickenName, gender, dob, species, weightKg, imageBuffer, notes, rfid], (err: Error | null, _results: any) => {
        if(err){
            console.log("Query error:", err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json({ message: 'Chicken updated successfully' });
    })
});

app.delete('/api/deleteChicken', (req, res) => {
    const { rfid } = req.body;
    const query = 'DELETE FROM chickens WHERE rfid = ?';
    db.query(query, [rfid], (err: Error | null, _results: any) => {
        if(err){
            console.log("Query error:", err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json({ message: 'Chicken deleted successfully' });
    });
});

app.get('/api/getChickenNames', (req, res) => {
    const query = 'SELECT rfid, chickenName FROM chickens';
    db.query(query, (err: Error | null, results: any) => {
        if(err){
            console.log("Query error:", err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});
app.post('/api/addChickenEgg', (req, res) => {
    const {rfid, recordedAt, eggCount} = req.body;
    const formattedDate = recordedAt.replace("T", " ") + ":00";
    const query = 'INSERT INTO chickeneggs (rfid, recordedAt, eggCount) VALUES (?, ?, ?)';
    db.query(query, [rfid, formattedDate, eggCount], (err: Error | null, _results: any) => {
        if(err){
            console.log("Query error:", err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json({ message: 'Egg log added successfully' });
    })
});
app.post('/api/addChicken', (req, res) => {
    const {rfid,coopId,chickenName,gender,dob,species,weightKg,imageData,regDate,notes} = req.body;

    let imageBuffer = null;
    if (imageData) {
        const base64String = imageData.replace(/^data:image\/\w+;base64,/, '');
        imageBuffer = Buffer.from(base64String, 'base64');
    }

    const query = 'INSERT INTO chickens (rfid, coopId, chickenName, gender, dateOfBirth, species, weightKg, imageData, registerDate, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [rfid, coopId, chickenName, gender, dob, species, weightKg, imageBuffer, regDate, notes], (err: Error | null, _results: any) => {
        if(err){
            console.log("Query error:", err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json({ message: 'Chicken added successfully' });
    })
}); 
app.get('/api/getCoopIDs', (req, res) => {
    const query = 'SELECT coopId FROM coops ORDER BY coopId ASC';
    db.query(query, (err: Error | null, results: any) => {
        if(err){
            console.log("Query error:", err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

/* Dashboard queries */

app.get("/api/dashboard", (req, res) => {

    const queries = {
        chickens: "SELECT COUNT(*) AS total FROM chickens",
        eggs: "SELECT SUM(eggCount) AS total FROM chickenEggs",
        predators: "SELECT COUNT(*) AS total FROM predatorLog",
        movement: "SELECT COUNT(*) AS total FROM coopActivityLogs WHERE eventType='movement'"
    };

    Promise.all([
        new Promise((resolve, reject) => {
            db.query(queries.chickens, (err: Error | null, result: any) => {
                if (err) reject(err);
                else resolve(result[0].total);
            });
        }),
        new Promise((resolve, reject) => {
            db.query(queries.eggs, (err: Error | null, result: any) => {
                if (err) reject(err);
                else resolve(Number(result[0].total) || 0);
            });
        }),
        new Promise((resolve, reject) => {
            db.query(queries.predators, (err: Error | null, result: any) => {
                if (err) reject(err);
                else resolve(result[0].total);
            });
        }),
        new Promise((resolve, reject) => {
            db.query(queries.movement, (err: Error | null, result: any) => {
                if (err) reject(err);
                else resolve(result[0].total);
            });
        })
    ])
    .then(([chickens, eggs, predators, movement]) => {
        res.json({
            chickens,
            weeklyEggs: eggs,
            predatorIncidents: predators,
            movement
        });
    })
    .catch(err => res.status(500).json(err));
});



app.get("/api/eggs", (req, res) => {
    const query = `
        SELECT DATE(recordedAt) AS date, SUM(eggCount) AS eggs
        FROM chickenEggs
        GROUP BY DATE(recordedAt)
        ORDER BY date ASC
    `;

    db.query(query, (err: Error | null, results: any) => {
        if (err) return res.status(500).json(err);
        res.json(results);


        });
});

app.get("/api/predators", (req, res) => {
    const query = `
        SELECT DATE(timeOfDetection) as date, COUNT(*) as count
        FROM predatorLog
        GROUP BY DATE(timeOfDetection)
        ORDER BY date ASC
    `;

    db.query(query, (err: Error | null, result: any) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


app.get("/api/movement", (req, res) => {
    const query = `
        SELECT DATE(takenAt) as date, COUNT(*) as count
        FROM coopActivityLogs
        WHERE eventType='movement'
        GROUP BY DATE(takenAt)
        ORDER BY date ASC
    `;

    db.query(query, (err: Error | null, result: any) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

/* Coop queries */

app.get('/api/coopSelect', (req, res) => {
    const query = 'SELECT * FROM coops';

    db.query(query, (err: Error | null, results: any) => {
        if(err) {
            console.log("Query error;", err);
            return res.status(500).json({ error: 'Database query error' });
        }

        res.json(results);
    });
});

app.put('/api/updateDoorTimes', (req, res) => {
    const { openTime, closeTime, coopId } = req.body;
    const query = 'UPDATE coops SET doorOpen = ?, doorClose = ? WHERE coopId = ?';

    db.query(query, [openTime, closeTime, coopId], (err: Error | null, _results: any) => {
        if (err) {
            console.error('Error updating door times:', err);
            return res.status(500).json({ error: 'Database update error' });
        }
        res.json({ message: 'Door times updated successfully' });
    });
});

app.delete("/api/clear", (req, res) => {
    db.query("DELETE FROM eggs");
    db.query("DELETE FROM predators");
    db.query("DELETE FROM movement");
        res.json({ message: "All data cleared" });
});

app.put('/api/updateCleaningTimes', (req, res) => {
    const { reminderDate, reminderPeriod, coopId } = req.body;
    const query = 'UPDATE coops SET reminderDate = ?, reminderPeriod = ? WHERE coopId = ?';

    db.query(query, [reminderDate, reminderPeriod, coopId], (err: Error | null, _results: any) => {
        if (err) {
            console.error('Error updating cleaning times:', err);
            return res.status(500).json({ error: 'Database update error' });
        }
        res.json({ message: 'Cleaning times updated successfully' });
    });
});


app.post('/api/addCoop', (req, res) => {
    const { name, doorOpen, doorClose, reminderDate, reminderPeriod } = req.body;
    const query = 'INSERT INTO coops (name, doorOpen, doorClose, reminderDate, reminderPeriod) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, doorOpen, doorClose, reminderDate, reminderPeriod], (err: Error | null, results: any) => {
        if (err) {
            console.error('Error adding coop:', err);
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.json({ message: 'Coop added successfully', coopId: results.insertId });
    });
});

app.post('/api/addCleaningLog', (req, res) => {
    const { coopId, lastCleaned, NextCleanDue, weightKg, notes } = req.body;
    const query = 'INSERT INTO coopCleaningLogs (coopId, lastCleaned, NextCleanDue, weightKg, notes) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [coopId, lastCleaned, NextCleanDue, weightKg, notes], (err: Error | null, _results: any) => {
        if (err) {
            console.error('Error adding cleaning log:', err);
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.json({ message: 'Cleaning log added successfully' });
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));

