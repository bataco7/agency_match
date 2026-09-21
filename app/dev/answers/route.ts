let latestAnswers: any = {};

export async function POST(req: Request) {
  const body = await req.json();
  latestAnswers = body;
  return Response.json({ ok: true });
}

export async function GET() {
  return Response.json(latestAnswers);
}