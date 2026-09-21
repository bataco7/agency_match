import { NextRequest, NextResponse } from "next/server";
import { diagnose } from "@/app/lib/diagnosis";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // body.answers に Q1〜Q35 の回答が入っている前提
  const answers = body.answers;

  const results = diagnose(answers);

  // クライアントには「結果だけ」を返す
  // agency_vectors の中身や診断ロジックの詳細は一切返さない
  const top3 = results.slice(0, 3).map((r) => ({
    name: r.name,
    totalMatch: r.totalMatch,
    axes: r.axes,
  }));

  return NextResponse.json({
    top3: results.slice(0, 3),
  });
}
