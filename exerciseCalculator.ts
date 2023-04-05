const trainingDaysCalc = (sessions: number[]) => {
  let numOfTrainingDays: number = 0;
  for (let i = 0; i < 8; i++) {
    if (sessions[i] > 0) {
      numOfTrainingDays += 1;
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

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (sessions: number[], target: number): Result => {
  const average = sessions.reduce((a, b) => a + b) / sessions.length;
  const rating = ratingCalc(average, target);

  return {
    periodLength: sessions.length,
    trainingDays: trainingDaysCalc(sessions),
    average: average,
    success: average >= target,
    rating: rating[0],
    ratingDescription: rating[1],
    target: target,
  };
};

const findInputTimes = () => {
  const inputGiven: number[] = [];
  for (let i = 2; i < process.argv.length; i++) {
    inputGiven.push(parseInt(process.argv[i]));
  }
  return inputGiven;
};

const exerciseTimes: number[] = findInputTimes();
const exerciseGoal: number[] = exerciseTimes.slice(-1); //try .at(-1)
console.log(calculateExercises(exerciseTimes, exerciseGoal));
