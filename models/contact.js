const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to db')
  })
  .catch(error => {
    console.log('error connecting to db')
  })

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

