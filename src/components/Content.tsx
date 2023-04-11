export interface Courses {
  courses: { name: string; exerciseCount: number }[];
}
const Content = (courses: Courses) => {
  return (
    <>
      {courses.courses.map((course, key) => {
        return (
          <p key={key}>
            {course.name} {course.exerciseCount}
          </p>
        );
      })}
    </>
  );
};

export default Content;
