"use client";

import { create } from "zustand";

type AnswersState = {
  answers: Record<string, number | null>;
  setAnswer: (questionId: string, value: number) => void;
};

export const useAnswersStore = create<AnswersState>((set) => ({
  answers: {},
  setAnswer: (questionId, value) =>
    set((state) => {
      console.log("setAnswer called:", questionId, value);
      console.log("before:", state.answers);

      const updated = { ...state.answers, [questionId]: value };

      console.log("after:", updated);

      return {
        answers: updated,
      };
    }),
}));
