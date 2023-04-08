import express from "express";
import patientServices from "../services/patientServices";
import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("CLIENT REQ PATIENT DATA");
  res.send(patientServices.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientServices.findPatientById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientServices.newPatient(newPatientEntry);
    res.json(addedPatient);
    console.log("added new Patient: ", addedPatient.name);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
