import { useEffect, useState } from "react"
import contactService from './services/contacts'

const Filter = ({filter,filterChange})=> {
  return(
  <p> filter shown with
    <input value = {filter} onChange ={filterChange}>
    </input> 
  </p>
)}

const PersonForm = ({addName,newName,newNumber,handleNameChange,handleNumberChange}) => {
  return(

  <form onSubmit = {addName}>
    <div> name:  <input value={newName} onChange = {handleNameChange}/> </div>
    <div> number:  <input value={newNumber} onChange = {handleNumberChange}/> </div>
    <div>
      <button type ="submit">add</button>
    </div>
  </form>
  )
}

const Contacts = ({person,filter,removeContact}) => {
  const contactToShow = false
  ? person
  : person.filter(person => (person.name.toLowerCase()).includes(filter.toLowerCase()))
  return(
    <ul>
    {contactToShow.map(contact => 
     <p key = {contact.name}> {contact.name} {contact.number}  
       <button onClick={()=>removeContact(contact.id,contact.name, person)}>delete</button>
     </p>
     )}
  </ul>  
  )
}

const Notification = ({message,style}) =>{
  if(message === null){
    return null
  }
  return(
    <div style={style}>
      {message}
    </div>
  )
}
function App() {

  const starter = {
    fontSize: "22px",
    color: "green",
    textAlign: "center",
    background:"lightGrey",
    borderStyle: "solid",
    borderColor: "green",
    borderRadius: 5,
  }

  const errorRed = {
    fontSize: "22px",
    color: "red",
    textAlign: "center",
    background:"lightGrey",
    borderStyle: "solid",
    borderColor: "red",
    borderRadius: 5,
  }
    
  const [person, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const[filter, setFilter] = useState("")
  const[message,setMessage] = useState(null)
  const [style,setStyle] = useState(starter)

  const hook = () => {
    contactService
    .getAll()
    .then(initialContacts => {
       setPersons(initialContacts)
    })
 }
 useEffect(hook,[])

 const addName = (event) =>{
  event.preventDefault()

  if(person.some(element => element.name.toLowerCase() === newName.toLowerCase())){

     if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
      const contactToUpdate = person.filter(contact=> contact.name === newName)[0]
         const updatedContact = {...contactToUpdate, number: newNumber}

      return(
        contactService
        .update(contactToUpdate.id, updatedContact)
        .then(updated => {
          setPersons(person.map(contact => contact.id !== contactToUpdate.id ? contact : updatedContact))
          setStyle(starter)  
          setMessage(
            `${contactToUpdate.name}'s number was updated.`
          )

          setTimeout(()=> {
            setMessage(null)
          },5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setStyle(errorRed) 
          setMessage(
            `the contact '${contactToUpdate.name}' has already been removed from server.`
          )
          setTimeout(()=> {
            setMessage(null)
          },5000)
          setNewName('')
          setNewNumber('')
        })
      )
    }
    else return;
  }

  const nameObject = {
    name: newName,
    number:newNumber,
    key: newName
  }

  contactService
  .create(nameObject)
  .then(returnedContact =>{
    setPersons(person.concat(returnedContact))
    setStyle(starter)
    setMessage(
      `${newName}'s number was added.`
    )
    setTimeout(()=> {
      setMessage(null)
    },5000)
    setNewName('')
    setNewNumber('')
  })
}

  const removeContact = (id, name, person) => {
    if(window.confirm(`Delete ${name} from phonebook?`)){
     
      return (contactService
    .deleteContact(id)
    .then(contact => {
      setPersons(person.filter(contact => contact.id !== id))
       
    })
      )
  }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} style ={style}/>
      
      <Filter filter={filter} filterChange={filterChange}/> 
      
      <PersonForm addName={addName} newName = {newName} newNumber ={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Contacts filter={filter} person={person} name={person.name} number={person.number} removeContact ={removeContact}/>
      
    </div>
  );
}
export default App;
