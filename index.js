require('dotenv').config()
const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
var cors = require('cors')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const Contact = require('./models/contact')

// Create the new token to log
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :status :url :body'))

app.get('/api/persons', (request, response, next) => {
  Contact.find({})
    .then(allContacts => {
      response.json(allContacts)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      response.json(contact)
    })
    .catch(error => next(error))
})


app.get('/info', (request, response) => {
  const numOfPeople = 3
  const message = `Phonebook has info for ${numOfPeople} people`
  const date = new Date()

  const toSend = {
    message, date
  }
  response.json(toSend)
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const name = body.name
  if(!name || !body.number){
    response.status(400).json({
      error: 'Name or number are missing'
    })
  }
  const contact = Contact({
    name: body.name,
    number: body.number,
  })
  contact.save()
    .then(savedContact => {
      console.log(savedContact.name, 'saved')
      response.json(savedContact)
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.log('Calling error handler')
  if (error.name === 'CastError'){
    return response.status(500).send({ error:'malformated id' })
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  else {
    response.status(500).end()
  }
  next(error)
}
app.use(errorHandler)


app.put('/api/persons/:id', (request, response) => {
  const name = request.body.name
  const number = request.body.number

  const contact = {
    name: name,
    number: number
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      console.log(updatedContact)
      response.json(updatedContact)
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})