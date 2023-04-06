import express from "express";
import diagnosesServices from "../services/diagnosesServices";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesServices.getDiagnoses());
});

export default router;
