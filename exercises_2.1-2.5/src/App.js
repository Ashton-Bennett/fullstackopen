import Header from "./components/header" 
import Total from "./components/total"
import Content from "./components/content"

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]     


  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(courses=>
      <><Header course={courses.name} key = {courses.name}/>
      <Content course={courses} course1 key = {courses.id} />
      <Total key = {courses.name + 1} sum = {courses.parts.map(exercises => exercises.exercises).reduce((a, b) => a + b)} /></>
      )}
      </div>
  )
}

export default App
