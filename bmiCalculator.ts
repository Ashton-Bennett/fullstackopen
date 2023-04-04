// BMI, basic categories
// Category	BMI (kg/m2)[c]	BMI Prime[c]
// Underweight (Severe thinness)	< 16.0
// Underweight (Moderate thinness)	16.0 – 16.9
// Underweight (Mild thinness)	17.0 – 18.4
// Normal range	18.5 – 24.9
// Overweight (Pre-obese)	25.0 – 29.9
// Obese (Class I)	30.0 – 34.9
// Obese (Class II)	35.0 – 39.9
// Obese (Class III)	≥ 40.0

const calculateBmi = (height: number, weight: number): string => {
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
};
console.log(calculateBmi(180, 74));
