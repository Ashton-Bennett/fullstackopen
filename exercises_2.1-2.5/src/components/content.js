import React from "react";
import Part from "./part"

const Content = ({course}) =>{

    return(
      <div>
            {course.parts.map(courses =>
        <Part 
        course key = {courses.id + 10} 
        name = {courses.name} 
        exercises = {courses.exercises} 
        />
      )
    } 
      </div>
    )
  }
export default Content 