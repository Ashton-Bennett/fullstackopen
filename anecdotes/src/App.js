import { useState } from 'react';

const Button = ({ handleClick,text}) => (
  <button onClick={handleClick}>
     {text}
     </button>
         
     )

const Favorite = (props) => {
  const values = Object.values(props.points)
  const max = Math.max(...values);
  const winner = values.indexOf(max)
  return(
    <div>
      <p>{props.anecdotes[winner]}  {props.points[winner]} votes</p>
    </div>
    
  )
}
const App = ()=> {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.' 
  ]
  const [selected, setSelected] = useState(0)
  const max = Math.floor(anecdotes.length)
  const[points, setPoints] = useState([...anecdotes].fill(0))

  const randomNumberGen = () =>(
    setSelected(Math.floor(Math.random() * ((max) - 0)))
  )

  const voteCounter = () =>(
    setPoints({...points,[selected]:points[selected] += 1})
  )

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick = {randomNumberGen} text ="next anecdote" />
      <Button handleClick= {voteCounter} text ="vote" />

      <h2>Anecdote with most votes</h2>
      <Favorite anecdotes={anecdotes} points={points}/>
    </div>
    
  );
}

export default App;
