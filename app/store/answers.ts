"use client";

import { create } from "zustand";

type Answers = {
  [key: string]: number | string | string[] | null;
};

type AnswersState = {
  answers: Answers;
  diagnosisResult: any;
  diagnosisDebug: any;

  setAnswer: (questionId: string, value: any) => void;
  loadFromStorage: () => void;

  setDiagnosisResult: (result: any) => void;
  setDiagnosisDebug: (debug: any) => void;

  resetAnswers: () => void;
};

export const useAnswersStore = create<AnswersState>((set) => ({
  answers: {
    Q30: [], // ★ここだけ初期配列にする
  },

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

  setAnswer: (questionId: string, value: any) =>
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
    set({ answers: { Q30: [] } });
  },
}));
