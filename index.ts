import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";

app.get("/bmi", (req, res) => {
  if (req.query.height && req.query.weight) {
    const userData = req.query;
    const bmi = calculateBmi(Number(userData.height), Number(userData.weight));
    res.send({ bmi, userData });
  } else {
    res.send({ error: "incorrect parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
