// const CheckArgLength = (args: string[]) => {
//   if (args.length < 4) throw new Error("Not enough arguments");

//   for (let i = 2; i < args.length; i++) {
//     if (isNaN(Number(args[i]))) {
//       throw new Error("Provided values were not all numbers!");
//     }
//   }
//   return "Input is valid";
// };

const trainingDaysCalc = (sessions: number[]) => {
  let numOfTrainingDays: number = 0;
  for (let i = 0; i < sessions.length; i++) {
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

export const calculateExercises = (
  sessions: number[],
  target: number
): Result | string => {
  if (sessions.length === 0) return "Input was 0";
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

interface ResultA {
  workOutTimeArray: number[];
  exerciseGoal: number;
}

const changeInputToNumbers = (): ResultA => {
  // console.log(CheckArgLength(process.argv));
  let workOutTimeArray: number[] = [];
  let exerciseGoal: number = 0;

  for (let i = 2; i < process.argv.length; i++) {
    if (i != process.argv.length - 1) {
      workOutTimeArray.push(parseInt(process.argv[i]));
    } else {
      exerciseGoal = parseInt(process.argv[i]);
    }
  }
  return { workOutTimeArray, exerciseGoal };
};

const results = changeInputToNumbers();

console.log(calculateExercises(results.workOutTimeArray, results.exerciseGoal));
