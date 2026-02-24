export type BedStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "OCCUPIED"
  | "CLEANING"
  | "OUT_OF_SERVICE";

export type BedType = "GENERAL" | "ICU" | "HDU" | "ISOLATION" | "MATERNITY" | "PEDIATRIC";

export type WardType = "MEDICAL" | "SURGICAL" | "ICU" | "PEDIATRIC" | "MATERNITY" | "ER_OBS";

export type UserRole = "ADMIN" | "BED_MANAGER" | "DOCTOR" | "NURSE" | "EXECUTIVE";

export interface Bed {
  id: string;
  name: string;
  wardId: string;
  type: BedType;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
}

export interface Ward {
  id: string;
  name: string;
  type: WardType;
  level: number;
  gender: "MALE" | "FEMALE" | "MIXED";
  beds: Bed[]; // Normalized: In a real app this would be separate, but for mock store nesting is easier
}

export interface AdmissionRequest {
  id: string;
  patientName: string;
  mrn: string; // Medical Record Number
  diagnosis: string;
  priority: "P1" | "P2" | "P3";
  requiredWardType: WardType;
  requiredBedType: BedType;
  gender: "MALE" | "FEMALE";
  status: "PENDING" | "ALLOCATED";
  requestTime: Date;
}

export interface Allocation {
  id: string;
  requestId: string;
  bedId: string;
  wardId: string;
  timestamp: Date;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  userRole: UserRole;
  action: string;
  details: string;
}

export interface Discharge {
  id: string;
  patientName: string;
  mrn: string;
  bedId: string;
  wardId: string;
  status: "PLANNED" | "CONFIRMED";
  plannedDate: Date;
}
