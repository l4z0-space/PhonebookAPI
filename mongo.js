const mongoose = require('mongoose')

if (process.argv.length < 3 ){
    console.log('Provide arguments [ password or contact ] ')
    process.exit(1)
}


const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:Lazajola12@fullstack.rso5f.mongodb.net/contactDB?retryWrites=true&w=majority`

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
            allNames = cont.map(con => con.name)
            allNames.forEach(name => {
                console.log(name);
            })
            mongoose.connection.close()
    })
}

else{

    name = process.argv[3]
    number = process.argv[4]

    contact = new Contact({
        name,
        number
    })

    contact.save().then(result => {
        console.log(`${result.name} saved!`);
        mongoose.connection.close()
    })
}


