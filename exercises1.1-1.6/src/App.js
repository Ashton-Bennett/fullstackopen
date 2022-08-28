const Part1 = (props) => {

  return(
    <div>
      <p>{props.part1.name} Number of Exercises: {props.part1.exercises}</p>
    </div>
  )
}

const Part2 = (props) => {
  return(
    <div>
      <p>{props.part2.name} Number of Exercises: { props.part2.exercises}</p>
    </div>
  )
}
const Part3 = (props) => {
  return(
    <div>
      <p>{props.part3.name} Number of Exercises: { props.part3.exercises}</p>
    </div>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Content = (props) => { 
  return(
    <div>
        <Part1 part1 = {props.parts[0]} />
        <Part2 part2 = {props.parts[1]} />
        <Part3 part3 = {props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Total Number of Exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name:"Fundamentals of React",
      exercises: 10
    },
    {
      name:"Using props to pass data",
      exercises: 7
    },
     {
      name:"State of a component",
      exercises: 14
    }
  ]
}
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts}/>

    </div>
  );
}

export default App;
