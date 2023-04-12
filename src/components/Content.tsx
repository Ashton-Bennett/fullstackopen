import { CoursePart } from "../App";
import Part from "./Part";
export interface CourseInfo {
  courses: CoursePart[];
}

const Content = (courses: CourseInfo) => {
  return (
    <>
      {courses.courses.map((course, key) => {
        return (
          <div key={key}>
            <strong>
              {course.name} {course.exerciseCount}
            </strong>
            <Part courses={course} />
          </div>
        );
      })}
    </>
  );
};

export default Content;
