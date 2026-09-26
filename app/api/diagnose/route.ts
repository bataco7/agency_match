import { NextRequest, NextResponse } from "next/server";
import { diagnose, DIAGNOSIS_VERSION } from "@/app/lib/diagnosis";
import { supabase } from '@/lib/supabase';


export async function POST(req: NextRequest) {
  const body = await req.json();

  // body.answers に Q1〜Q35 の回答が入っている前提
  const answers = body.answers;

  const start = performance.now();

  const results = diagnose(answers);

  const end = performance.now();
  const duration_ms = end - start;
  
  
  const version = DIAGNOSIS_VERSION;

  // クライアントには「結果だけ」を返す
  // agency_vectors の中身や診断ロジックの詳細は一切返さない
  const top3 = results.slice(0, 3).map((r) => ({
    name: r.name,
    totalMatch: r.totalMatch,
    axes: r.axes,
  }));

  const top_agency = top3[0].name;

  const debugMap = {};
  for (const r of results) {
    debugMap[r.name] = r.debug;
  };

  // ★★★ ここで Supabase にログ保存 ★★★
  await supabase.from('diagnosis_log').insert({
  duration_ms,
  top_agency,
  version,
  match_map: debugMap,
});

  return NextResponse.json({
    top3: results.slice(0, 3),
    debug: debugMap,
  });
}
