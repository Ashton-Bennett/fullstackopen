import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.get("/bmi", (req, res) => {
  if (req.query.height && req.query.weight) {
    const userData = req.query;
    const bmi = calculateBmi(Number(userData.height), Number(userData.weight));
    return res.json({ bmi, userData });
  } else {
    return res.json({ error: "incorrect parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment/no-explicit-any
  const { sessions, target } = req.body;
  console.log(sessions, target);
  if (sessions.length != 2 || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }
  if (!isNaN(Number(sessions[0])) || !isNaN(Number(target))) {
    return res.status(400).json({ error: "parameters missing" });
  }
  const result = calculateExercises(sessions, target);
  return res.json({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
