const express = require('express');
const path = require('path')
// const logger = require('./middleware/logger')
const exphbs = require('express-handlebars')
const members = require('./Members')


const app = express()


//! Init middleware
//everytime we make a get request it will log what is in the logger
//* app.use(logger)

//!handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

//! Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
//*homepage route
app.get('/', (req, res)=> res.render('index', 
{title: "Member APP title",
members
}))


//! set static
//* The one above this is rendering because this one is below. If this one was above the hompage route, then this one would render. 
app.use(express.static(path.join(__dirname, 'public')));

//! bringing in router 
app.use('/api/members', require('./routes/api/members'))

//! on port 5000
const PORT = process.env.PORT || 5000;

//! log the port
app.listen(PORT, () => console.log(`server started on port ${PORT}`))