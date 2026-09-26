import agencyVectors from "@/app/data/agency_vectors.json";

export const DIAGNOSIS_VERSION = "2026-09-26-07"; // 診断ロジックVer　日付＋連番

type Answers = Record<string, number | string | string[]>;

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
    音楽こだわり: answers.Q27 === "音楽こだわり" ? 5 : 0,
    衣装: answers.Q27 === "衣装" ? 5 : 0,
    演出: answers.Q27 === "演出" ? 5 : 0,
    MV: answers.Q27 === "MV" ? 5 : 0,
  };

  const Mental: AxisVector = {
    競争: map5(answers.Q31),
    記憶力: map5(answers.Q32),
    体力: map5(answers.Q33),
    SNS: map5(answers.Q34),
    接触負荷: map5(answers.Q35),
  };

  const AlignmentBase = 10 + calcAlignmentAdjustment(answers);

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

//  Alignment補正ロジック
function calcAlignmentAdjustment(answers: Answers): number {
  let adj = 0;
  
  // Q3 自撮り
  if (answers.Q3 === 4) adj += 1;
  if (answers.Q3 === 5) adj += 2;

  // Q6 ステージ度胸
  if (answers.Q6 === 1) adj -= 2;
  if (answers.Q6 === 2) adj -= 1;
  if (answers.Q6 === 4) adj += 1;
  if (answers.Q6 === 5) adj += 2;

  // Q7 協調性
  if (answers.Q7 === 1) adj -= 2;
  if (answers.Q7 === 2) adj -= 1;
  if (answers.Q7 === 4) adj += 1;
  if (answers.Q7 === 5) adj += 2;

  // Q9 ライブしたい
  if (answers.Q9 === 1) adj -= 2;
  if (answers.Q9 === 2) adj -= 1;

  // Q11 バズりたい
  if (answers.Q11 === 1) adj -= 2;
  if (answers.Q11 === 2) adj -= 1;

  // Q30 卒業後の進路 
  if (answers.Q30 === "一生アイドル") adj += 2;

  // Q31 不人気
  if (answers.Q31 === 1) adj -= 2;
  if (answers.Q31 === 2) adj -= 1;

  // Q32 記憶力
  if (answers.Q31 === 1) adj -= 2;
  if (answers.Q31 === 2) adj -= 1; 

  // Q33 体力
  if (answers.Q33 === 1) adj -= 2;
  if (answers.Q33 === 2) adj -= 1;

  return adj;
}


// 診断メイン
export function diagnose(answers: Answers): AgencyResult[] {
  const user = buildUserVectors(answers);

  const results: AgencyResult[] = [];

  for (const [name, agency] of Object.entries(agencyVectors as any)) {
    // 各軸の計算
    const abilityScore = calcDiffAxis(user.Ability, agency.Ability);
    const mentalScore = calcDiffAxis(user.Mental, agency.Mental);

    // ① コサイン類似度（Mental に応じてウェイト変更）
    const activityAdj =
      cosineSimilarity(user.Activity, agency.Activity) *
      100 *
      (mentalScore > 0 ? 0.25 : 0.20);

    const aestheticAdj =
      cosineSimilarity(user.Aesthetic, agency.Aesthetic) *
      100 *
      (mentalScore > 0 ? 0.17 : 0.12);

    const cultureAdj =
      cosineSimilarity(user.Culture, agency.Culture) *
      100 *
      (mentalScore > 0 ? 0.27 : 0.32);

    const fanAdj =
      cosineSimilarity(user.Fan, agency.Fan) *
      100 *
      (mentalScore > 0 ? 0.11 : 0.16);

    // ② コサイン類似度の合計
    let directionScore =
      activityAdj + aestheticAdj + cultureAdj + fanAdj;

    // Aptitude/Budgetは単純加算（ここは好みで調整）
    //const aptitudeScore = user.Aptitude.ステージ度胸 + user.Aptitude.協調性;
    //const budgetScore = Object.values(user.Budget).reduce((a, b) => a + b, 0);

    // AlignmentBase
    let alignment = user.AlignmentBase;
    let alignedScore = directionScore;

    if (alignment >= 1 && alignment <= 3) alignedScore *= 0.9;
    else if (alignment >= 8) alignedScore *= 1.1;

    // ④ Ability / Mental / Budget / GroupSize / Career を加算
    // Budget補正（Budget軸の該当項目をそのまま加算）
    let budgetAdj = 0;
    if (typeof answers.Q27 === "string") {
      const key = answers.Q27; // "音楽こだわり" など
      const agencyBudget = agency.Budget ?? {};
      const val = agencyBudget[key] ?? 0;
      budgetAdj = val;
    }

    // Career補正（含まれていれば +5）
    let careerAdj = 0;
    if (Array.isArray(answers.Q30)) {
      const userCareer = answers.Q30;
      const agencyCareer = agency.Career ?? [];
      const matched = userCareer.some((c) => agencyCareer.includes(c));
      if (matched) {
        careerAdj = 5;
      }
    }

    // GroupSize補正（含まれていれば +5）
    let groupSizeAdj = 0;
    if (typeof answers.Q29 === "string") {
      const userSize = answers.Q29;
      const agencySizeList = agency.GroupSize ?? [];
      if (agencySizeList.includes(userSize)) {
        groupSizeAdj = 5;
      }
    } 

    let total =
      alignedScore +
      abilityScore +
      mentalScore +
      budgetAdj +
      careerAdj +
      groupSizeAdj;

    const debug = {
      Activity_cos_sim: activityAdj,
      Aesthetic_cos_sim: aestheticAdj,
      Culture_cos_sim: cultureAdj,
      Fan_cos_sim: fanAdj,

      Ability_result: abilityScore,
      Mental_result: mentalScore,
      Alignment: alignment,

      DirectionScore: directionScore,
      AlignedScore: alignedScore,

      BudgetAdj: budgetAdj,
      CareerAdj: careerAdj,
      GroupSizeAdj: groupSizeAdj,

      Total_result: total,
    };

    results.push({
      name,
      totalMatch: total,
      axes: {
        Ability: abilityScore,
        Activity: activityAdj,
        Aesthetic: aestheticAdj,
        Culture: cultureAdj,
        Fan: fanAdj,
        Mental: mentalScore,
        Aptitude: 0,
        Budget: budgetAdj,
        Alignment: alignment,
      },
      debug,
    });
  }

  results.sort((a, b) => b.totalMatch - a.totalMatch);

  const fanAgency = results.find((r) => r.axes.Alignment <= 0);
  if (fanAgency) {
    const others = results.filter((r) => r.name !== fanAgency.name);
    const filtered = others.filter((r) => r.name !== "ファン");
    return [fanAgency, ...filtered];
  }

  return results;
}

