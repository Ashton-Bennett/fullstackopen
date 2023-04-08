import patientdata from "../../data/patients";
import { NonSensitivePatientData, Patient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSensitivePatientData[] => {
  return patientdata.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findPatientById = (id: string): Patient | undefined => {
  const entry = patientdata.find((patient) => patient.id === id);
  return entry;
};

const newPatient = (patient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
  };
  patientdata.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  findPatientById,
  newPatient,
};
