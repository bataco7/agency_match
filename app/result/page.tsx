"use client";

import Image from "next/image";
import { useAnswersStore } from "@/app/store/answers";
import rawMeta from "@/app/data/agency_meta.json";
import type { AgencyMetaTable } from "@/app/data/agency_meta";
import { myFont } from "@/app/fonts";
import { useEffect } from "react";

const agencyMeta = rawMeta as AgencyMetaTable;

export default function ResultPage() {
  //パラメータの値取り込み
  if (typeof window === "undefined") return null; // SSR対策

  const params = new URLSearchParams(window.location.search);

  // ===== 必須パラメータ一覧 =====
  const requiredParams = [
    "top1", "score1", "activity1", "aesthetic1", "culture1", "fan1",
    "top2", "score2",
    "top3", "score3"
  ];

  // ===== 共有リンクとして成立するか？ =====
  const hasAllParams = requiredParams.every((key) => params.get(key) !== null);

  // ===== Zustand の診断結果 =====
  const { diagnosisResult, diagnosisDebug } = useAnswersStore();

  // ============================================================
  // ② 共有リンクルート（パラメータが完全に揃っている場合）
  // ============================================================
  if (hasAllParams) {
    const first = {
      name: params.get("top1")!,
      totalMatch: Number(params.get("score1")),
      axes: {
        Activity: Number(params.get("activity1")),
        Aesthetic: Number(params.get("aesthetic1")),
        Culture: Number(params.get("culture1")),
        Fan: Number(params.get("fan1")),
      },
    };

    const second = {
      name: params.get("top2")!,
      totalMatch: Number(params.get("score2")),
    };

    const third = {
      name: params.get("top3")!,
      totalMatch: Number(params.get("score3")),
    };

    const meta = agencyMeta[first.name];

    return <ResultUI first={first} second={second} third={third} meta={meta} />;
  }

  // ============================================================
  // ① 通常診断ルート（パラメータなし & Zustand に結果がある）
  // ============================================================
  if (diagnosisResult) {
    const [first, second, third] = diagnosisResult;
    const meta = agencyMeta[first.name];

    return <ResultUI first={first} second={second} third={third} meta={meta} />;
  }

  // ============================================================
  // ③ 異常ルート（パラメータ不足 or Zustand に結果なし）
  // ============================================================
  window.location.href = "/";
  return null;
}


function ResultUI({
  first,
  second,
  third,
  meta,
}: {
  first: any;
  second: any;
  third: any;
  meta: any;
}) {

  useEffect(() => {
    document.getElementById("page-body")?.classList.add("pink-theme");

    return () => {
      document.getElementById("page-body")?.classList.remove("pink-theme");
    };
  }, []);

  return (
    <main className="min-h-screen px-6 py-10 ">
      <h1 className={`${myFont.className} text-4xl md:text-4xl mb-5 text-outline text-center leading-tight`}>
        <span className="block md:inline">アイドル事務所</span>
        <span className="block md:inline">適性診断結果</span>
      </h1>
      

      {/* ======= 1位カード ======= */}
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {meta.catchphrase}
        </h2>

        <div className="flex justify-center">
          <Image
            src={meta.illustration}
            alt={`${first.name} illustration`}
            width={240}
            height={240}
            className="rounded-xl shadow"
          />
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-blue-700">{first.name}</p>
        </div>

        <section className="bg-blue-50 p-4 rounded-lg leading-relaxed text-gray-700">
          <p>{meta.description}</p>
        </section>

        <section>
          <p className="font-semibold text-blue-700 mb-2">代表的なグループ</p>
          <ul className="list-disc list-inside text-gray-700">
            {meta.groups.map((g: string) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>

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
          <p className="text-sm text-gray-600">{second.totalMatch.toFixed(2)}%</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg text-center">
          <p className="font-bold text-gray-700">総合マッチ度3位</p>
          <p className="text-xl font-bold text-gray-700">{third.name}</p>
          <p className="text-sm text-gray-600">{third.totalMatch.toFixed(2)}%</p>
        </div>
      </div>

      {/* ======= SNS共有ボタン ======= */}
      <div className="text-center mt-10">
        <button
          onClick={() => {
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
              url: shareUrl.toString(),
            });
          }}
          className="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition"
        >
          診断結果を共有する
        </button>
      </div>

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
