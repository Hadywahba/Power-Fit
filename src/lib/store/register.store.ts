import { create } from "zustand";
import type { RegisterFields } from "@/lib/schemes/auth/register.schema";

interface RegisterState {
  step: number;
  stepOneData: RegisterFields | null;
  setStepOneData: (data: RegisterFields) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  stepOneData: null,

  setStepOneData: (data) => set({ stepOneData: data }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  reset: () => set({ step: 1, stepOneData: null }),
}));