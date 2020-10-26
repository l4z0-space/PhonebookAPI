const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
var cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Create the new token to log
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :status :url :body'))

persons= [
    {
    "name": "Arto Hellas",
    "number": "031-313412-12",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    },
    {
    "name": "Lazaron Shyta",
    "number": "00355-696703885",
    "id": 5
    }
]

const generateID = () => {
    return Math.floor(Math.random() * 15000)
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
  
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(!person){
        response.status(404).end()
    }
    else {
        response.json(person)
    }
})

app.get('/info', (request, response) => {
    const numOfPeople = persons.length
    const message = `Phonebook has info for ${numOfPeople} people`
    const date = new Date()
    
    const toSend = {
        message, date
    }
    response.json(toSend)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        response.status(400).json({
            error: "Name or number are missing"
        })
    }

    // Check if name entered has a duplicate
    if ( persons.includes( persons.find(person => person.name == body.name))){
        response.status(400).json({
            error: "Cannot contain duplicate names."
            }
        )
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID()
    }
    response.json(person)
})


// app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})