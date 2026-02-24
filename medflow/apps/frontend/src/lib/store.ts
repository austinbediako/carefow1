import { create } from "zustand";
import { Bed, Ward, AdmissionRequest, Discharge, UserRole, AuditLog, BedStatus, BedType } from "../types";
import { generateWards, generateRequests, generateDischarges } from "./mockData";

interface AppState {
  currentUserRole: UserRole | null;
  wards: Ward[];
  requests: AdmissionRequest[];
  discharges: Discharge[];
  logs: AuditLog[];
  isHydrated: boolean;

  // Actions
  setRole: (role: UserRole) => void;
  initializeData: () => void;
  allocateBed: (requestId: string, wardId: string, bedId: string) => void;
  dischargePatient: (dischargeId: string) => void;
  markBedCleaning: (wardId: string, bedId: string) => void;
  markBedAvailable: (wardId: string, bedId: string) => void;
  addLog: (action: string, details: string) => void;

  // Computed (Selectors)
  getSuggestions: (requestId: string) => { bed: Bed; ward: Ward; score: number }[];
}

export const useStore = create<AppState>((set, get) => ({
  currentUserRole: null,
  wards: [],
  requests: [],
  discharges: [],
  logs: [],
  isHydrated: false,

  setRole: (role) => set({ currentUserRole: role }),

  initializeData: () => {
    if (get().isHydrated) return;
    const wards = generateWards();
    const requests = generateRequests(12);
    const discharges = generateDischarges(15, wards);
    set({ wards, requests, discharges, isHydrated: true });
  },

  addLog: (action, details) => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      userRole: get().currentUserRole || "ADMIN",
      action,
      details,
    };
    set((state) => ({ logs: [newLog, ...state.logs] }));
  },

  allocateBed: (requestId, wardId, bedId) => {
    const { requests, wards, addLog } = get();
    const request = requests.find((r) => r.id === requestId);
    if (!request) return;

    // Update Bed Status
    const newWards = wards.map((ward) => {
      if (ward.id !== wardId) return ward;
      return {
        ...ward,
        beds: ward.beds.map((bed) => {
          if (bed.id !== bedId) return bed;
          return { ...bed, status: "OCCUPIED" as BedStatus, patientName: request.patientName, patientId: request.mrn };
        }),
      };
    });

    // Remove Request
    const newRequests = requests.filter((r) => r.id !== requestId);

    set({ wards: newWards, requests: newRequests });
    addLog("ALLOCATION", `Allocated ${request.patientName} to ${wardId} / ${bedId}`);
  },

  dischargePatient: (dischargeId) => {
    const { discharges, wards, addLog } = get();
    const discharge = discharges.find((d) => d.id === dischargeId);
    if (!discharge) return;

    // Update Bed to Cleaning
    const newWards = wards.map((ward) => {
      if (ward.id !== discharge.wardId) return ward;
      return {
        ...ward,
        beds: ward.beds.map((bed) => {
          if (bed.id !== discharge.bedId) return bed;
          return { ...bed, status: "CLEANING" as BedStatus, patientName: undefined, patientId: undefined };
        }),
      };
    });

    // Remove Discharge
    const newDischarges = discharges.filter((d) => d.id !== dischargeId);

    set({ wards: newWards, discharges: newDischarges });
    addLog("DISCHARGE", `Discharged ${discharge.patientName} from ${discharge.wardId}`);
  },

  markBedCleaning: (wardId, bedId) => {
    const { wards, addLog } = get();
    const newWards = wards.map((ward) => {
      if (ward.id !== wardId) return ward;
      return {
        ...ward,
        beds: ward.beds.map((bed) => {
          if (bed.id !== bedId) return bed;
          return { ...bed, status: "CLEANING" as BedStatus, patientName: undefined, patientId: undefined };
        }),
      };
    });
    set({ wards: newWards });
    addLog("STATUS_CHANGE", `Marked bed ${bedId} as CLEANING`);
  },

  markBedAvailable: (wardId, bedId) => {
    const { wards, addLog } = get();
    const newWards = wards.map((ward) => {
      if (ward.id !== wardId) return ward;
      return {
        ...ward,
        beds: ward.beds.map((bed) => {
          if (bed.id !== bedId) return bed;
          return { ...bed, status: "AVAILABLE" as BedStatus, patientName: undefined, patientId: undefined };
        }),
      };
    });
    set({ wards: newWards });
    addLog("STATUS_CHANGE", `Marked bed ${bedId} as AVAILABLE`);
  },

  getSuggestions: (requestId) => {
    const { requests, wards } = get();
    const request = requests.find((r) => r.id === requestId);
    if (!request) return [];

    const suggestions: { bed: Bed; ward: Ward; score: number }[] = [];

    wards.forEach((ward) => {
      ward.beds.forEach((bed) => {
        if (bed.status !== "AVAILABLE") return;

        let score = 0;
        // 1. Hard Constraint: Gender (if ward is gendered)
        if (ward.gender !== "MIXED" && ward.gender !== request.gender) return;

        // 2. Match Ward Type (High Weight)
        if (ward.type === request.requiredWardType) score += 50;

        // 3. Match Bed Type (Medium Weight)
        if (bed.type === request.requiredBedType) score += 30;

        // 4. Same Floor/Level (Low Weight)
        // ... (can add more rules)

        if (score > 0) {
            suggestions.push({ bed, ward, score });
        }
      });
    });

    return suggestions.sort((a, b) => b.score - a.score).slice(0, 3);
  },
}));
