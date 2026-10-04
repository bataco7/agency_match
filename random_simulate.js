import fetch from "node-fetch";

// 5段階ランダム
function rand5() {
  return Math.floor(Math.random() * 5) + 1;
}

function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomAnswers() {
  return {
    Q1: rand5(),
    Q2: rand5(),
    Q3: rand5(),
    Q4: rand5(),
    Q5: rand5(),
    Q6: rand5(),
    Q7: rand5(),
    Q8: rand5(),
    Q9: rand5(),
    Q10: rand5(),
    Q11: rand5(),
    Q12: rand5(),
    Q13: rand5(),
    Q14: rand5(),
    Q15: rand5(),
    Q16: rand5(),
    Q17: rand5(),
    Q18: rand5(),
    Q19: rand5(),
    Q20: rand5(),
    Q21: rand5(),
    Q22: rand5(),
    Q23: rand5(),
    Q24: rand5(),
    Q25: rand5(),
    Q26: rand5(),
    Q27: randChoice(["音楽こだわり", "衣装", "演出", "MV"]),
    Q28: rand5(),
    Q29: randChoice(["ソロ", "2～4人", "5～7人", "8～15人", "16人以上"]),
    Q30: [randChoice(["歌手","俳優","モデル","タレント","声優","インフルエンサー","一生アイドル","普通の女の子にもどる"])],
    Q31: rand5(),
    Q32: rand5(),
    Q33: rand5(),
    Q34: rand5(),
    Q35: rand5(),
  };
}

async function main() {
  const counts = {};

  for (let i = 0; i < 1000; i++) {
    const answers = generateRandomAnswers();

    const res = await fetch("http://localhost:3000/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const json = await res.json();
    const top = json.top3[0].name;

    counts[top] = (counts[top] || 0) + 1;
  }

  console.log("診断結果分布:", counts);
}

main();
