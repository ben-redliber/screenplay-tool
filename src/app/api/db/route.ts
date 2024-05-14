import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { screenplays } from "~/server/db/schema";
import type { ScreenplayInputData } from "~/components/dashboard/ScreenplayAdd";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const data: ScreenplayInputData = await request.json();

  const addScreenplay = await db.insert(screenplays).values(data).returning();

  return NextResponse.json({
    new_id: addScreenplay[0]?.screenplay_id,
  });
}
