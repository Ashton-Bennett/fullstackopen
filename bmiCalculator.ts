// Underweight (Severe thinness)	< 16.0
// Underweight (Moderate thinness)	16.0 – 16.9
// Underweight (Mild thinness)	17.0 – 18.4
// Normal range	18.5 – 24.9
// Overweight (Pre-obese)	25.0 – 29.9
// Obese (Class I)	30.0 – 34.9
// Obese (Class II)	35.0 – 39.9
// Obese (Class III)	≥ 40.0

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return true;
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (parseArguments(process.argv)) {
    try {
      const currentBmi: number = (weight / Math.pow(height, 2)) * 10_000;

      switch (true) {
        case currentBmi <= 16:
          return "Underweight (Severe thinness)";
        case currentBmi >= 16 && currentBmi <= 16.9:
          return "Underweight (Moderate thinness)";
        case currentBmi >= 17.0 && currentBmi <= 18.4:
          return "Underweight(Mild thinness)";
        case currentBmi >= 18.5 && currentBmi <= 24.9:
          return "Normal (healthy weight)";
        case currentBmi >= 25.0 && currentBmi <= 29.9:
          return "Overweight (Pre-obese)";
        case currentBmi >= 30 && currentBmi <= 34.9:
          return "Obese (Class I)";
        case currentBmi >= 35 && currentBmi <= 39.9:
          return "Obese (Class II)";
        case currentBmi >= 40.0:
          return "Obese (Class III)";
        default:
          "Unable to calculate";
      }

      return "function returned";
    } catch (error: unknown) {
      let errorMessage = "Something bad happened.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      console.log(errorMessage);
    }
  }
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);
console.log(calculateBmi(a, b));
