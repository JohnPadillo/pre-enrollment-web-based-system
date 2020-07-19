const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const port = 8081
const app = express()
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

// parse application/json
app.use(bodyParser.json())
app.use(express.static('./uploads/'))
app.use(morgan('combined'))
app.use(cors())

require('./routes')(app)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
