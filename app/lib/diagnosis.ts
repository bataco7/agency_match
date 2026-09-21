import agencyVectors from "@/app/data/agency_vectors.json";

type Answers = Record<string, number | number[] | string[]>;

type AxisVector = Record<string, number>;

type AgencyName = string;

type AgencyResult = {
  name: AgencyName;
  totalMatch: number;
  axes: {
    Ability: number;
    Activity: number;
    Aesthetic: number;
    Culture: number;
    Fan: number;
    Mental: number;
    Aptitude: number;
    Budget: number;
    Alignment: number;
  };
};

function cosineSimilarity(a: AxisVector, b: AxisVector): number {
  const keys = Object.keys(a);
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const k of keys) {
    const va = a[k] ?? 0;
    const vb = b[k] ?? 0;
    dot += va * vb;
    normA += va * va;
    normB += vb * vb;
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ユーザーベクトル生成（QA_logicに基づいて実装）
export function buildUserVectors(answers: Answers) {
  // ここは実際には Q1〜Q35 をすべて反映して作る
  // 以下は構造イメージ（実装時はきちんとマッピングする）
  const Ability: AxisVector = {
    歌唱: map5(answers.Q1),
    ダンス: map5(answers.Q2),
    ビジュアル: map5Visual(answers.Q3, answers.Q4),
    キャラ: map5(answers.Q5),
  };

  const Aptitude: AxisVector = {
    ステージ度胸: mapAptitudeStage(answers.Q6),
    協調性: mapAptitudeCoop(answers.Q7),
  };

  const Activity: AxisVector = {
    TV: map5(answers.Q8),
    ライブ: map5(answers.Q9),
    接触: map5(answers.Q10),
    SNS: map5(answers.Q11),
    グローバル: map5(answers.Q12),
  };

  const Aesthetic: AxisVector = {
    "清楚〜個性": map5(answers.Q13),
    "青春〜スタイリッシュ": map5(answers.Q14),
    "かわいい〜カッコいい": map5(answers.Q15),
  };

  const Culture: AxisVector = {
    育成力: map5(answers.Q16),
    "成長見守り〜完成": map5(answers.Q17),
    実力主義: map5(answers.Q18),
    自主性: map5(answers.Q19),
    プロデュース強度: map5Reverse(answers.Q20), // 逆スケール
    伝統: map5(answers.Q21),
    安定性: map5(answers.Q22),
    肌の露出: map5(answers.Q23),
  };

  const Fan: AxisVector = {
    男性: map5(answers.Q24),
    親目線: map5(answers.Q25),
    若者: map5(answers.Q26),
    距離の近さ: map5(answers.Q28),
  };

  const Budget: AxisVector = {
    音楽こだわり: answers.Q27 === 1 ? 5 : 0,
    衣装: answers.Q27 === 2 ? 5 : 0,
    演出: answers.Q27 === 3 ? 5 : 0,
    MV: answers.Q27 === 4 ? 5 : 0,
  };

  const Mental: AxisVector = {
    競争: map5(answers.Q31),
    記憶力: map5(answers.Q32),
    体力: map5(answers.Q33),
    SNS: map5(answers.Q34),
    接触負荷: map5(answers.Q35),
  };

  const AlignmentBase = 10 + (Array.isArray(answers.Q30) && answers.Q30.includes("一生アイドル") ? 2 : 0);

  return {
    Ability,
    Aptitude,
    Activity,
    Aesthetic,
    Culture,
    Fan,
    Budget,
    Mental,
    AlignmentBase,
  };
}

// 5段階をそのまま数値化する例
function map5(v: unknown): number {
  if (typeof v === "number") return v;
  return 0;
}

// Q3/Q4などのビジュアルの重み付け例（実装時に調整）
function map5Visual(q3: unknown, q4: unknown): number {
  const v3 = typeof q3 === "number" ? q3 : 0;
  const v4 = typeof q4 === "number" ? q4 : 0;
  return v3 * 0.5 + v4 * 0.5;
}

// 逆スケール（1→5, 2→4, 3→3, 4→2, 5→1）
function map5Reverse(v: unknown): number {
  if (typeof v !== "number") return 0;
  return 6 - v;
}

// Aptitude補正（Q6/Q7の特別ルールはここで反映）
function mapAptitudeStage(v: unknown): number {
  if (typeof v !== "number") return 0;
  // 例：そのまま5段階を使いつつ、1/2/4/5でAlignment補正に使う
  return v;
}

function mapAptitudeCoop(v: unknown): number {
  if (typeof v !== "number") return 0;
  return v;
}

// Ability/Mentalの差分計算
function calcDiffAxis(user: AxisVector, agency: AxisVector): number {
  let sum = 0;
  for (const key of Object.keys(user)) {
    const Ans = user[key] ?? 0;
    const Req = agency[key] ?? 0;
    const diff = Ans - Req;
    if (diff >= 0) {
      sum += diff * 0.02;
    } else {
      sum += diff * 0.04;
    }
  }
  return sum * 100; // パーセント換算
}

// 診断メイン
export function diagnose(answers: Answers): AgencyResult[] {
  const user = buildUserVectors(answers);

  const results: AgencyResult[] = [];

  for (const [name, agency] of Object.entries(agencyVectors as any)) {
    // 各軸の計算
    const abilityScore = calcDiffAxis(user.Ability, agency.Ability);
    const mentalScore = calcDiffAxis(user.Mental, agency.Mental);

    // コサイン類似度軸
    const activityCos = cosineSimilarity(user.Activity, agency.Activity) * 100 * 0.20;
    const aestheticCos = cosineSimilarity(user.Aesthetic, agency.Aesthetic) * 100 * 0.12;
    const cultureCos = cosineSimilarity(user.Culture, agency.Culture) * 100 * 0.32;
    const fanCos = cosineSimilarity(user.Fan, agency.Fan) * 100 * 0.16;

    // Aptitude/Budgetは単純加算（ここは好みで調整）
    const aptitudeScore = user.Aptitude.ステージ度胸 + user.Aptitude.協調性;
    const budgetScore = Object.values(user.Budget).reduce((a, b) => a + b, 0);

    // Alignment（ここでは事務所ごとのベース＋ユーザーのAlignmentBaseを合成）
    let alignment = user.AlignmentBase + (agency.Alignment ?? 0);

    // 補正：Abilityマイナス & Mentalプラス → Ability * 0.5
    let abilityAdj = abilityScore;
    let mentalAdj = mentalScore;
    let activityAdj = activityCos;
    let aestheticAdj = aestheticCos;
    let cultureAdj = cultureCos;
    let fanAdj = fanCos;

    if (abilityScore < 0 && mentalScore > 0) {
      abilityAdj = abilityScore * 0.5;
    }

    // Mentalプラス → ウェイト変更
    if (mentalScore > 0) {
      activityAdj = cosineSimilarity(user.Activity, agency.Activity) * 100 * 0.25;
      aestheticAdj = cosineSimilarity(user.Aesthetic, agency.Aesthetic) * 100 * 0.17;
      cultureAdj = cosineSimilarity(user.Culture, agency.Culture) * 100 * 0.27;
      fanAdj = cosineSimilarity(user.Fan, agency.Fan) * 100 * 0.11;
    }

    // 軸ごとの合計
    let total =
      abilityAdj +
      mentalAdj +
      activityAdj +
      aestheticAdj +
      cultureAdj +
      fanAdj +
      aptitudeScore +
      budgetScore;

    // Alignment補正
    if (alignment <= 0) {
      // この事務所は順位レースから除外される可能性があるので、
      // ここでは total を一旦そのままにしておき、後段で扱う
    } else if (alignment >= 1 && alignment <= 3) {
      total *= 0.9;
    } else if (alignment >= 8) {
      total *= 1.1;
    }

    results.push({
      name,
      totalMatch: total,
      axes: {
        Ability: abilityAdj,
        Activity: activityAdj,
        Aesthetic: aestheticAdj,
        Culture: cultureAdj,
        Fan: fanAdj,
        Mental: mentalAdj,
        Aptitude: aptitudeScore,
        Budget: budgetScore,
        Alignment: alignment,
      },
    });
  }

  // Alignmentが0以下のときの「ファン強制1位」ロジックは、
  // 実際にはここで全事務所のAlignmentを見て処理する
  // （簡略化のためここでは省略）

  // 総合マッチ度でソート
  results.sort((a, b) => b.totalMatch - a.totalMatch);

  return results;
}
