import { Bed, Ward, AdmissionRequest, Discharge, BedStatus, BedType, WardType } from "../types";

const getRandomStatus = (): BedStatus => {
  const rand = Math.random();
  if (rand < 0.6) return "OCCUPIED";
  if (rand < 0.8) return "AVAILABLE";
  if (rand < 0.9) return "CLEANING";
  if (rand < 0.95) return "RESERVED";
  return "OUT_OF_SERVICE";
};

const getBedType = (wardType: WardType, index: number): BedType => {
  if (wardType === "ICU") return "ICU";
  if (wardType === "ER_OBS") return "GENERAL";
  if (index % 10 === 0) return "ISOLATION"; // 1 in 10 beds is isolation
  if (index % 5 === 0) return "HDU"; // 1 in 5 beds is HDU
  return "GENERAL";
};

const generateBeds = (wardId: string, wardType: WardType, count: number): Bed[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${wardId}-B${i + 1}`,
    name: `Bed ${i + 1}`,
    wardId,
    type: getBedType(wardType, i),
    status: getRandomStatus(),
    patientId: Math.random() > 0.4 ? `P-${Math.floor(Math.random() * 10000)}` : undefined,
    patientName: Math.random() > 0.4 ? `Patient ${Math.floor(Math.random() * 1000)}` : undefined,
  }));
};

const wardsData: Omit<Ward, "beds">[] = [
  { id: "W1", name: "Medical Ward 1", type: "MEDICAL", level: 1, gender: "MIXED" },
  { id: "W2", name: "Surgical Ward 2", type: "SURGICAL", level: 1, gender: "MIXED" },
  { id: "W3", name: "Orthopedics", type: "SURGICAL", level: 2, gender: "MIXED" },
  { id: "W4", name: "Pediatrics", type: "PEDIATRIC", level: 2, gender: "MIXED" },
  { id: "W5", name: "Maternity", type: "MATERNITY", level: 3, gender: "FEMALE" },
  { id: "W6", name: "ICU Main", type: "ICU", level: 3, gender: "MIXED" },
  { id: "W7", name: "HDU", type: "ICU", level: 3, gender: "MIXED" },
  { id: "W8", name: "Isolation Unit", type: "MEDICAL", level: 4, gender: "MIXED" },
  { id: "W9", name: "ED Observation", type: "ER_OBS", level: 0, gender: "MIXED" },
];

export const generateWards = (): Ward[] => {
  return wardsData.map((w) => ({
    ...w,
    beds: generateBeds(w.id, w.type, Math.floor(Math.random() * 10) + 20), // 20-30 beds
  }));
};

const diagnoses = [
  "Community Acquired Pneumonia",
  "Acute Appendicitis",
  "Hip Fracture",
  "Severe Sepsis",
  "DKA",
  "Asthma Exacerbation",
  "Chest Pain - ACS",
  "Stroke - Ischemic",
];

export const generateRequests = (count: number): AdmissionRequest[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `REQ-${i + 1}`,
    patientName: `Patient Request ${i + 1}`,
    mrn: `MRN-${1000 + i}`,
    diagnosis: diagnoses[i % diagnoses.length],
    priority: Math.random() > 0.7 ? "P1" : Math.random() > 0.4 ? "P2" : "P3",
    requiredWardType: i % 3 === 0 ? "SURGICAL" : i % 4 === 0 ? "ICU" : "MEDICAL",
    requiredBedType: i % 5 === 0 ? "HDU" : "GENERAL",
    gender: Math.random() > 0.5 ? "MALE" : "FEMALE",
    status: "PENDING",
    requestTime: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
  }));
};

export const generateDischarges = (count: number, wards: Ward[]): Discharge[] => {
  const discharges: Discharge[] = [];
  wards.forEach((ward) => {
    ward.beds
      .filter((b) => b.status === "OCCUPIED")
      .slice(0, 2) // Take 2 from each ward
      .forEach((bed, i) => {
        discharges.push({
          id: `DIS-${ward.id}-${i}`,
          patientName: bed.patientName || "Unknown",
          mrn: `MRN-${Math.floor(Math.random() * 9000) + 1000}`,
          bedId: bed.id,
          wardId: ward.id,
          status: "PLANNED",
          plannedDate: new Date(Date.now() + Math.floor(Math.random() * 86400000)),
        });
      });
  });
  return discharges.slice(0, count);
};
