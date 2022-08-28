import { useState } from 'react'


const Average = (props) => {
  return(
    <div>
      {((props.good - props.bad) / props.all).toPrecision(1)}
    </div>
  )
}

const Positive = (props) => {
  return(
    <div>
      {((props.good / props.all) * 100).toPrecision(4)}%
    </div>
  )
}
  
const Statistics = (props) =>{
  if(props.all === 0){
    return(
      <div>No feedback given</div>
    )
    }
  return(
    <div>
      <table>
        <tr> 
         <td>Good:</td> 
         <td>{props.good}</td> 
        </tr>
        <tr> 
         <td>Neutral:</td> 
         <td>{props.neutral}</td> 
        </tr>
        <tr> 
          <td>Bad:</td> 
          <td>{props.bad}</td> 
        </tr>
        <tr> 
          <td>All:</td> 
          <td>{props.all}</td> 
        </tr>
        <tr> 
          <td>Average:</td>
          <td><Average bad = {props.bad} good ={props.good} all = {props.all}/> </td>
        </tr> 
        <tr>
          <td>Positive:</td>
          <td><Positive bad = {props.bad} good ={props.good} all = {props.all}/> </td>
        </tr>
   </table>
    </div>
  )

}


const Button = ({ handleClick,text }) => (
  <button onClick={handleClick}>
     {text}
     </button>
     
     )
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodHandle = ()=> {
    setGood(good + 1)
    setAll(all + 1)
  }
  
  const neutralHandle = ()=> {
    setNeutral(neutral + 1)
    setAll(all + 1)   
  }

  const badHandle = ()=> {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>

    <h1>Give Feedback</h1>

    <Button handleClick = {goodHandle} text = "Good" />
    <Button handleClick = {neutralHandle} text = "Neutral" />
    <Button handleClick = {badHandle} text = "Bad" />
    
    <h2>Statistics</h2>
    
    <Statistics good = {good} bad = {bad} all ={all} neutral = {neutral}/>
    

    </div>
  )
}
export default App
