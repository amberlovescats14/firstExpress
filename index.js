const express = require('express');
const path = require('path')
// const logger = require('./middleware/logger')

const app = express()


//! Init middleware
//everytime we make a get request it will log what is in the logger
//* app.use(logger)

//! Body parser middleware
app.use(express.json());

app.use(express.urlencoded({extended: false}))


//! set static
app.use(express.static(path.join(__dirname, 'public')));

//! bringing in router 
app.use('/api/members', require('./routes/api/members'))

//! on port 5000
const PORT = process.env.PORT || 5000;

//! log the port
app.listen(PORT, () => console.log(`server started on port ${PORT}`))