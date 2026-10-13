"use client";

import Image from "next/image";
import { useAnswersStore } from "@/app/store/answers";
import rawMeta from "@/app/data/agency_meta.json";
import type { AgencyMetaTable } from "@/app/data/agency_meta";

const agencyMeta = rawMeta as AgencyMetaTable;

export default function ResultPage() {
  const { diagnosisResult, diagnosisDebug } = useAnswersStore();

  const handleDevOutput = async () => {
    await fetch("/api/dev/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(diagnosisDebug),
    });

    window.open("/dev", "_blank");
  };

  if (!diagnosisResult) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>診断結果を読み込んでいます…</p>
      </main>
    );
  }

  const [first, second, third] = diagnosisResult;

  // メタデータ取得
  const meta = agencyMeta[first.name];

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">診断結果</h1>

      {/* ======= 1位カード ======= */}
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
        {/* ① キャッチコピー */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {meta.catchphrase}
        </h2>

        {/* ② イラスト */}
        <div className="flex justify-center">
          <Image
            src={meta.illustration}
            alt={`${first.name} illustration`}
            width={240}
            height={240}
            className="rounded-xl shadow"
          />
        </div>

        {/* ③ 事務所名 */}
        <div className="text-center">
          <p className="text-xl font-bold text-blue-700">{first.name}</p>
        </div>

        {/* ④ 特徴文章 */}
        <section className="bg-blue-50 p-4 rounded-lg leading-relaxed text-gray-700">
          <p>{meta.description}</p>
        </section>

        {/* ⑤ 代表的なグループ名 */}
        <section>
          <p className="font-semibold text-blue-700 mb-2">代表的なグループ</p>
          <ul className="list-disc list-inside text-gray-700">
            {meta.groups.map((g: string) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>

        {/* ⑥ 各軸のマッチ度 */}
        <section className="space-y-3">
          <p className="font-semibold text-blue-700">マッチ度詳細</p>

          <div className="space-y-1">
            <p>総合マッチ度：{first.totalMatch.toFixed(2)}%</p>
            <p>Activity：{first.axes.Activity.toFixed(2)}%</p>
            <p>Aesthetic：{first.axes.Aesthetic.toFixed(2)}%</p>
            <p>Culture：{first.axes.Culture.toFixed(2)}%</p>
            <p>Fan：{first.axes.Fan.toFixed(2)}%</p>
          </div>
        </section>

        {/* ⑦ MV埋め込み */}
        <div className="mt-6">
          <p className="font-semibold mb-2 text-blue-700">代表的なMV</p>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
            <iframe
              src={meta.mv}
              title="MV"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

      </div>

      {/* ======= 2位・3位カード ======= */}
      <div className="max-w-xl mx-auto mt-10 grid grid-cols-2 gap-4">

        <div className="p-4 bg-white shadow rounded-lg text-center">
          <p className="font-bold text-gray-700">総合マッチ度2位</p>
          <p className="text-xl font-bold text-gray-700">{second.name}</p>
          <p className="text-sm text-gray-600">
            {second.totalMatch.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg text-center">
          <p className="font-bold text-gray-700">総合マッチ度3位</p>
          <p className="text-xl font-bold text-gray-700">{third.name}</p>
          <p className="text-sm text-gray-600">
            {third.totalMatch.toFixed(2)}%
          </p>
        </div>

      </div>

      {/* ======= SNS共有ボタン ======= */}
      <div className="text-center mt-10">
        <button
          onClick={() => {
            const url = window.location.href;

            const shareUrl = new URL("https://agency-match.lolipop-now.app/result");

            shareUrl.searchParams.set("top1", first.name);
            shareUrl.searchParams.set("score1", first.totalMatch.toFixed(2));
            shareUrl.searchParams.set("activity1", first.axes.Activity.toFixed(2));
            shareUrl.searchParams.set("aesthetic1", first.axes.Aesthetic.toFixed(2));
            shareUrl.searchParams.set("culture1", first.axes.Culture.toFixed(2));
            shareUrl.searchParams.set("fan1", first.axes.Fan.toFixed(2));

            shareUrl.searchParams.set("top2", second.name);
            shareUrl.searchParams.set("score2", second.totalMatch.toFixed(2));

            shareUrl.searchParams.set("top3", third.name);
            shareUrl.searchParams.set("score3", third.totalMatch.toFixed(2));

            navigator.share?.({
              title: "アイドル事務所適性診断",
              text: `あなたに最もマッチするのは${first.name}です！`,
              url,
            });
          }}
          className="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition"
        >
          診断結果を共有する
        </button>
      </div>

      {/* ======= TOPに戻る ======= */}
      <div className="text-center mt-6">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          TOPに戻る
        </button>
      </div>

    </main>
  );
}
