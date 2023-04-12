import { CourseInfo } from "./Content";

const Total = (courseParts: CourseInfo) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {courseParts.courses.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      </p>
    </>
  );
};

export default Total;
