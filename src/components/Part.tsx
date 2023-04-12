import { CoursePart } from "../App";

export interface CourseInfo {
  courses: CoursePart;
}
const Part = (courses: CourseInfo) => {
  return (
    <>
      {courses.courses.kind === "basic" && (
        <div>
          <i>{courses.courses.description}</i>
        </div>
      )}

      {courses.courses.kind === "group" && (
        <div>project exercises {courses.courses.groupProjectCount}</div>
      )}
      <br></br>
      {courses.courses.kind === "background" && (
        <div>
          <i>{courses.courses.description}</i>
          <div>submit to {courses.courses.backgroundMaterial}</div>
        </div>
      )}
      <br></br>
      {courses.courses.kind === "special" && (
        <div>
          <i>{courses.courses.description}</i>
          <div>
            required skills:{" "}
            {courses.courses.requirements.map((item) => {
              return ` -${item}`;
            })}
          </div>
        </div>
      )}
      <br></br>
    </>
  );
};

export default Part;
