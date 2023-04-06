import express from "express";
import patientServices from "../services/patientServices";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("CLIENT REQ PATIENT DATA");
  res.send(patientServices.getPatients());
});

export default router;
