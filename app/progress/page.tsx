"use client";

import { useAnswersStore } from "@/app/store/answers";

export default function ProgressPage() {
  const { answers } = useAnswersStore();

  const part1 = ["Q1","Q2","Q3","Q4","Q5","Q6","Q7"];
  const part2 = ["Q8","Q9","Q10","Q11","Q12"];

  const part1Answered = part1.filter(q => answers[q] !== null && answers[q] !== undefined).length;
  const part2Answered = part2.filter(q => answers[q] !== null && answers[q] !== undefined).length;

  const total = part1.length + part2.length;
  const totalAnswered = part1Answered + part2Answered;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-6">回答進捗パネル</h1>

      {/* 全体進捗 */}
      <section className="mb-10">
        <h2 className="font-semibold mb-2">全体進捗</h2>
        <div className="text-sm mb-1">
          {totalAnswered} / {total}
        </div>
        <div className="w-full bg-gray-300 h-3 rounded-full">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${(totalAnswered / total) * 100}%` }}
          />
        </div>
      </section>

      {/* Part1 */}
      <section className="mb-10">
        <h2 className="font-semibold mb-2">Part1 進捗</h2>
        <div className="text-sm mb-1">
          {part1Answered} / {part1.length}
        </div>
        <div className="w-full bg-pink-300 h-3 rounded-full">
          <div
            className="bg-pink-500 h-3 rounded-full transition-all"
            style={{ width: `${(part1Answered / part1.length) * 100}%` }}
          />
        </div>
      </section>

      {/* Part2 */}
      <section>
        <h2 className="font-semibold mb-2">Part2 進捗</h2>
        <div className="text-sm mb-1">
          {part2Answered} / {part2.length}
        </div>
        <div className="w-full bg-blue-300 h-3 rounded-full">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${(part2Answered / part2.length) * 100}%` }}
          />
        </div>
      </section>
    </main>
  );
}
