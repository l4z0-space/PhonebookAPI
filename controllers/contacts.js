const contactRouter = require('express').Router()
const Contact = require('../models/contact')



contactRouter.get('/', (request, response) => {
  Contact.find({})
    .then(allContacts => {
      response.json(allContacts)
    })
})


contactRouter.get('/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      response.json(contact)
    })
    .catch(error => next(error))
})


contactRouter.get('/info', (request, response) => {
  const numOfPeople = 3
  const message = `Phonebook has info for ${numOfPeople} people`
  const date = new Date()

  const toSend = {
    message, date
  }
  response.json(toSend)
})

contactRouter.delete('/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


contactRouter.post('/', (request, response, next) => {
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
      response.json(savedContact.toJSON())
    })
    .catch(error => next(error))
})


contactRouter.put('/:id', (request, response) => {
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
    .catch( error => next(error))
})

module.exports = contactRouter
