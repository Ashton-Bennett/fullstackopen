require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')



app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('type',function (req, res) {return JSON.stringify(req.body) })


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type',{
  skip: function (req,res) {return req.method !== 'POST'}
}))


app.get('/', (request, response) => {
  response.send('<h1>Hello World! this is the root page...</h1>')
})

app.get('/info', async (request, response) => {

  const numberOfContacts = await Person.countDocuments({}).exec()
  const info = (
    `<p>The phonebook has info for ${numberOfContacts}</p> 
            <p>${Date()}</p>`)


  response.send(info)
})



app.get('/api/persons', (request, response) => {
// TO MAKE THE CONTACTS SPREAD OUT USE -> response.end(JSON.stringify(persons,null,10))
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get ('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error =>  next(error))
})

app.delete('/api/persons/:id', (request,response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const generateId = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max-min) + min)
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if(persons.some((person) => person.name.toLowerCase() === body.name.toLowerCase())){
  //   return response.status(400).json({
  //     error: 'name must be unique'
  // })
  // }

  const person =  new Person({
    name: body.name,
    number: body.number,
    id: generateId((Person.length + 1),1000),
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
  // console.log("headers=>",request.headers)
})

app.put('/api/persons/:id', (request,reponse,next) => {
  const body = request.body

  const person = {
    number: body.number,
  }


  Person.findByIdAndUpdate(request.params.id, person,{ new:true })
    .then(updatedPerson => {
      reponse.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server run'in run'in on port ${PORT}`)
})
