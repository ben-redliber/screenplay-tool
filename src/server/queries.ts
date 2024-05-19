import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { screenplays } from "./db/schema";

import type { ScreenplayInput } from "~/components/dashboard/ScreenplayAdd";

export async function getProjects() {
  const { userId } = auth();

  // if (!userId) throw new Error("Unauthorized");

  const projects = await db.query.projects.findMany({
    where: (model, { eq }) => eq(model.user_id, userId),
  });

  return projects;
}

export async function getUserProject(projectId: string) {
  const { userId } = auth();

  const userProject = await db.query.projects.findFirst({
    where: (model, { eq }) =>
      and(eq(model.user_id, userId), eq(model.project_id, projectId)),
  });
  return userProject;
}

export async function getScreenplays(projectId: string) {
  const { userId } = auth();
  const screenplays = await db.query.screenplays.findMany({
    where: (model, { eq }) => eq(model.project_id, projectId),
  });
  // console.log(screenplays);
  return screenplays;
}

export async function getSingleScreenplay(screenplayId: string) {
  const { userId } = auth();
  const screenplay = await db.query.screenplays.findFirst({
    where: (model, { eq }) => eq(model.screenplay_id, screenplayId),
  });
  return screenplay;
}

export async function deleteSingleScreenplay(screenplayId: number) {
  // const { userId } = auth();
  const deletedScreenplay = await db
    .delete(screenplays)
    .where(eq(screenplays.screenplay_id, screenplayId))
    .returning();
  return deletedScreenplay;
}

export async function checkIfUserExists(user_id: string) {
  const appUsers = await db.query.app_users.findFirst({
    where: (model, { eq }) => eq(model.user_id, user_id),
  });

  return appUsers;
}
