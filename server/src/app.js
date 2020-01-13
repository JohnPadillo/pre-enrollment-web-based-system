const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const PORT = 8081

app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

app.get('/status', (req, res) => {
  res.send({
    message: 'hello world'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
