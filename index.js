const express = require('express');
const path = require('path')

const app = express()

// app.get('/', (req, res)=> {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })
//! set static
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`))