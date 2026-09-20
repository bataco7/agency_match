import { create } from "zustand";

type AnswersState = {
  answers: Record<string, number | null>;
  setAnswer: (questionId: string, value: number) => void;
};

export const useAnswersStore = create<AnswersState>((set) => ({
  answers: {},
  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),
}));
