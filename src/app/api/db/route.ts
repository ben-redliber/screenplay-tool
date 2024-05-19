import { auth, type WebhookEvent } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { app_users, screenplays } from "~/server/db/schema";
import type { ScreenplayInputData } from "~/components/dashboard/ScreenplayAdd";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  console.log(request);

  const data = await request.json();

  if (data.eventType == "screenplay.new") {
    let finalizedData = { ...data };
    delete finalizedData.eventType;
    const addScreenplay = await db
      .insert(screenplays)
      .values(finalizedData)
      .returning();

    return NextResponse.json({
      new_id: addScreenplay[0]?.screenplay_id,
    });
  } else if (data.eventType == "user.created") {
    console.log(data);

    return NextResponse.json(data);
  } else {
    return NextResponse.json("Nothing done.");
  }
}
