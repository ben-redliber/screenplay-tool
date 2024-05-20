import { auth, type WebhookEvent } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { app_users, projects, screenplays } from "~/server/db/schema";
import type { ScreenplayInputData } from "~/components/dashboard/ScreenplayAdd";
import { db } from "~/server/db";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const { userId } = auth();

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
  } else if (data.eventType == "project.new") {
    console.log("data-->", data);
    let finalizedData = { ...data };
    delete finalizedData.eventType;

    const addProject = await db
      .insert(projects)
      .values(finalizedData)
      .returning();

    const newProjectId = addProject[0]?.project_id;

    return NextResponse.json({ new_id: addProject[0]?.project_id });
  } else {
    return NextResponse.json("Nothing done.");
  }
}
