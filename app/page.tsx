"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAnswersStore } from "@/app/store/answers";

export default function Home() {

  const router = useRouter();
  const resetAnswers = useAnswersStore((state) => state.resetAnswers);

  const handleStart = () => {
    resetAnswers();          // Zustandの回答をリセット
    router.push("/questions/part1");  // ページ遷移
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center px-6 py-20">
      
      {/* Hero Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center leading-snug">
        アイドル事務所適性診断
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-700 text-center max-w-xl leading-relaxed">
        私に一番合ってるアイドル事務所ってどこ！？  
        
      </p>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="mt-10 px-10 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-lg transition-all duration-200"
      >
        診断を始める
      </button>

      <p className="mt-4 text-sm text-gray-600">
        所要時間：3〜5分
      </p>


      {/* About Section */}
 
      <section className="mt-20 max-w-xl text-center text-gray-700">
        <h2 className="text-xl font-bold mb-4">※注意※</h2>

        <ul className="space-y-3 text-base leading-relaxed">
          <li>・この診断は1アイドルウォッチャーが知り得る知見をもとに作成したものです。</li>
          <li>・診断結果は実際のオーディションの合格率に結びつくものではありません。</li>
          <li>・事務所毎の解像度には差があるため、診断精度の保証はいたしかねます。</li>
        </ul>
      </section>


      {/* Footer */}
      <footer className="mt-24 text-gray-500 text-sm">
        制作：Anonymous 
      </footer>
    </main>
  );
}
