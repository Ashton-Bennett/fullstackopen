const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.r4kb6w3.mongodb.net/phonebookAppNew?retryWrites=true&w=majority`



const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
  mongoose
    .connect(url)
    .then((result) => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      // id: 45,
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

if(process.argv.length === 3){
  mongoose
    .connect(url)
    .then(() => {
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name,person.number)
        })
        return mongoose.connection.close()
      })
    }
    )}






// if ( false ) {
//   person.save().then(result => {
//     console.log('person saved!')
//     mongoose.connnection.close()
//   })
// }

//   Person.find({}).then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
//   })