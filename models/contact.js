const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to db');
    })
    .catch(error => {
        console.log('error connecting to db');
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
contactSchema.set('toJSON', {
transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
}
})

module.exports = mongoose.model('Contact', contactSchema)

