"use client";

import { create } from "zustand";

type AnswersState = {
  answers: Record<string, number | null>;
  diagnosisResult: any;
  diagnosisDebug: any;
  setAnswer: (questionId: string, value: number) => void;
  loadFromStorage: () => void;

  setDiagnosisResult: (result: any) => void;
  setDiagnosisDebug: (debug: any) => void;

  resetAnswers: () => void;

};

export const useAnswersStore = create<AnswersState>((set) => ({
  answers: {},
  diagnosisResult: null,
  diagnosisDebug: {},

  setDiagnosisDebug: (data) => set({ diagnosisDebug: data }),


  loadFromStorage: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("answers");
      if (saved) {
        set({ answers: JSON.parse(saved) });
      }
    }
  },

  setAnswer: (questionId, value) =>
    set((state) => {
      const updated = { ...state.answers, [questionId]: value };

      if (typeof window !== "undefined") {
        localStorage.setItem("answers", JSON.stringify(updated));
      }

      return { answers: updated };
    }),
  
  setDiagnosisResult: (result) =>
    set(() => ({
      diagnosisResult: result,
    })),

  resetAnswers: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("answers");
    }
    set({ answers: {} });
  },
}));
