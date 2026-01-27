import { create } from "zustand";

interface ScanState {
  evaluationT: any | null;
  setEvaluationT: (data: any) => void;
}

export const useScanStore = create<ScanState>((set) => ({
  evaluationT: null,
  setEvaluationT: (data) => set({ evaluationT: data }),
}));
