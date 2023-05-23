const express = require('express');
const morgan = require('morgan');
const connectDB = require('./utils/db');
const courseRoute = require('./routes/courseRoute');
const studentRoute = require('./routes/studentRoute');
const assignmentRoute = require('./routes/assignmentRoute');

const app = express();

// using middlewares
app.use(express.json());
app.use(morgan('tiny')); // can use "combined"


// routes handler
app.use('/courses', courseRoute);
app.use('/students', studentRoute);
app.use('/assignments', assignmentRoute);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: "Something went wrong" });
});

connectDB();
// starting the server
app.listen(3000, () => console.log(`Server started on Port 3000`));
