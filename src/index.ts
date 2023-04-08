import express from "express";
import diagnosesRouter from "./routes/diagnosesRoutes";
import patientRouter from "./routes/patientRoutes";
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const cors = require("cors");

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/", (_req, res) => {
  res.json("HOME");
});

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.json("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
