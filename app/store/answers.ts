"use client";

import { create } from "zustand";

type Answers = {
  Q1: number | null;
  Q2: number | null;
  Q3: number | null;
  Q4: number | null;
  Q5: number | null;
  Q6: number | null;
  Q7: number | null;
  Q8: number | null;
  Q9: number | null;
  Q10: number | null;
  Q11: number | null;
  Q12: number | null;
  Q13: number | null;
  Q14: number | null;
  Q15: number | null;
  Q16: number | null;
  Q17: number | null;
  Q18: number | null;
  Q19: number | null;
  Q20: number | null;
  Q21: number | null;
  Q22: number | null;
  Q23: number | null;
  Q24: number | null;
  Q25: number | null;
  Q26: number | null;

  Q27: string | null;
  Q28: number | null;
  Q29: string | null;
  Q30: string[];
  Q31: number | null;
  Q32: number | null;
  Q33: number | null;
  Q34: number | null;
  Q35: number | null;
};

type AnswersState = {
  answers: Answers;
  diagnosisResult: any;
  diagnosisDebug: any;

  setAnswer: (questionId: keyof Answers, value: Answers[keyof Answers]) => void;
  loadFromStorage: () => void;

  setDiagnosisResult: (result: any) => void;
  setDiagnosisDebug: (debug: any) => void;

  resetAnswers: () => void;
};

export const useAnswersStore = create<AnswersState>((set) => ({
  answers: {
    Q1: null,
    Q2: null,
    Q3: null,
    Q4: null,
    Q5: null,
    Q6: null,
    Q7: null,
    Q8: null,
    Q9: null,
    Q10: null,
    Q11: null,
    Q12: null,
    Q13: null,
    Q14: null,
    Q15: null,
    Q16: null,
    Q17: null,
    Q18: null,
    Q19: null,
    Q20: null,
    Q21: null,
    Q22: null,
    Q23: null,
    Q24: null,
    Q25: null,
    Q26: null,

    Q27: null,
    Q28: null,
    Q29: null,
    Q30: [],
    Q31: null,
    Q32: null,
    Q33: null,
    Q34: null,
    Q35: null,
  },

  diagnosisResult: null,
  diagnosisDebug: {},

  setDiagnosisDebug: (debug) => set({ diagnosisDebug: debug }),

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

  setDiagnosisResult: (result) => set({ diagnosisResult: result }),

  resetAnswers: () =>
    set({
      answers: {
        Q1: null,
        Q2: null,
        Q3: null,
        Q4: null,
        Q5: null,
        Q6: null,
        Q7: null,
        Q8: null,
        Q9: null,
        Q10: null,
        Q11: null,
        Q12: null,
        Q13: null,
        Q14: null,
        Q15: null,
        Q16: null,
        Q17: null,
        Q18: null,
        Q19: null,
        Q20: null,
        Q21: null,
        Q22: null,
        Q23: null,
        Q24: null,
        Q25: null,
        Q26: null,

        Q27: null,
        Q28: null,
        Q29: null,
        Q30: [],
        Q31: null,
        Q32: null,
        Q33: null,
        Q34: null,
        Q35: null,
      },
    }),
}));
