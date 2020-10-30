const mongoose = require('mongoose')

if (process.argv.length < 3 ){
  console.log('Provide arguments [ password or contact ] ')
  process.exit(1)
}


const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}2@fullstack.rso5f.mongodb.net/contactDB?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)


if ( process.argv.length === 3 ){

  console.log('Phonebook: ')

  Contact
    .find({})
    .then(cont => {
      const allNames = cont.map(con => con.name)
      allNames.forEach(name => {
        console.log(name)
      })
      mongoose.connection.close()
    })
}

else{

  const name = process.argv[3]
  const number = process.argv[4]

  const contact = new Contact({
    name: name,
    number: number
  })

  contact.save().then(result => {
    console.log(`${result.name} saved!`)
    mongoose.connection.close()
  })
}


