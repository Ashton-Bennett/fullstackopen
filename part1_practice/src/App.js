//-------->  FIRST FEW EXAMPLES:

// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age
  
//   return(
//     <div>
//       <p>
//         Hello {name}, you are {age} years old.
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }
// const App = () => {
//   const name = "Peter"
//   const age = 10
//   console.log("hello from Ashton!")

//   return (
//   <div>
    
//     <h1>Greetings</h1>
//     <Hello name = "Ashton" age = {10 + 21}/>
//     <Hello name = "Carolyn" age = {27.9}/>
//     <Hello name = {name} age = {age} />
   
    
//   </div>
//   )
// }
// ------------> Compoent State and Event handlers 1C <------------
// import { useState } from 'react'
// const App = () => {
//   const [ counter, setCounter ] = useState(0)

//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//     <Display counter={counter}/>
//     <Button 
//     onClick={increaseByOne}
//     text = 'plus'
//     />
//        <Button
//     onClick={setToZero}
//        text = 'zero'
//        />
//        <Button
//     onClick={decreaseByOne}
//        text = 'minus'
//        />
//     </div>
//   )
//   }

//   const Display = ({counter}) => <div>{counter}</div>

//   const Button = ({onClick, text}) => <button onClick ={onClick}>{text}</button>
  
// export default App;

import { useState } from 'react'

const History = (props) =>{
   if(props.allClicks.length === 0){
      return (
         <div>
            the app is used by pressing buttons
         </div>
      )
   }
   return (
      <div>
         button press history: {props.allClicks.join(' ')}
      </div>
   )
}
// const Button = ({ handleClick, text}) => (
//    <button onClick={handleClick}>
//       {text}
//    </button>
// )
const Button = ({ handleClick,text }) => (
<button onClick={handleClick}>
   {text}
   </button>
   )


const App = () => {
   const [left, setLeft] = useState(0)
   const [right, setRight] = useState(0)
   const [allClicks, setAll] = useState([])

   const handleLeftClick = () => {
      setAll(allClicks.concat('L'))
      setLeft(left + 1)
   }

   const handleRightClick = () => {
      setAll(allClicks.concat('R'))
      setRight(right + 1)
   }
   return (
      <div>
         {left}
         <Button handleClick={handleLeftClick} text='left' />
         <Button handleClick={handleRightClick} text='right' />
         {right}
         <History allClicks={allClicks} />
      </div>
   )
}
export default App;