const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const contactSchema = new mongoose.Schema({
  name:{
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  number:{
    type: String,
    required: true,
    minlength:8
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

contactSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Contact', contactSchema)

