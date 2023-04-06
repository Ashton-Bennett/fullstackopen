import diagnosesData from "../../data/diagnoses";
import { Diagnoses } from "../types";

const getDiagnoses = (): Diagnoses[] => {
  return diagnosesData;
};

export default {
  getDiagnoses,
};
