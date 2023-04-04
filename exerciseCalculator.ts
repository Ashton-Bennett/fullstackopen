const trainingDaysCalc = (sessions: number[]) => {
  let numOfTrainingDays: number = 0;
  for (let i = 0; i < 8; i++) {
    if (sessions[i] > 0) {
      numOfTrainingDays += 1;
      console.log("lopped");
    }
  }
  return numOfTrainingDays;
};

const ratingCalc = (average: number, target: number): [number, string] => {
  switch (true) {
    case average / target >= 0.95:
      return [3, "Nailed it!"];
    case average / target >= 0.66:
      return [2, "Almost! keep trying"];
    default:
      return [1, "Common, you can do better!"];
  }
};

const calculateExercises = (sessions: number[], target: number) => {
  const numOfDays: number = 7;
  const trainingDays: number = trainingDaysCalc(sessions);
  const average: number = sessions.reduce((a, b) => a + b) / 7;
  const success: boolean = average >= target;
  const rating: [number, string] = ratingCalc(average, target);

  return {
    periodLength: numOfDays,
    trainingDays: trainingDays,
    success: success,
    rating: rating[0],
    ratingDescription: rating[1],
    target: target,
    average: average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
