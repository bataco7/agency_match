"use client";

import { create } from "zustand";

type AnswersState = {
  answers: Record<string, number | null>;
  setAnswer: (questionId: string, value: number) => void;
  loadFromStorage: () => void;
};

export const useAnswersStore = create<AnswersState>((set) => ({
  answers: {},

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
}));
