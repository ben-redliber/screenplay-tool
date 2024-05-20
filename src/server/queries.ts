import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { app_users, projects, screenplays, stp } from "./db/schema";

import type { ScreenplayInput } from "~/components/dashboard/ScreenplayAdd";
import { stp_revisionColour } from "~/components/dashboard/ProjectAdd";

export const stp_filming = ["INT", "EXT", "I/E", "INT/EXT"];
export const stp_timesOfDay = [
  "DAY",
  "NIGHT",
  "AFTERNOON",
  "MORNING",
  "EVENING",
  "LATER",
  "MOMENTS LATER",
  "CONTINUOUS",
  "THE NEXT DAY",
  "MAGIC HOUR",
  "DAWN",
  "DUSK",
  "SAME",
  "SAME TIME",
];
export const stp_transition = [
  "CUT TO",
  "FADE IN",
  "FADE OUT",
  "FADE TO",
  "DISSOLVE TO",
  "BACK TO",
  "MATCH CUT TO",
  "JUMP CUT TO",
  "FADE TO BLACK",
  "SMASH CUT TO",
  "CUT TO BLACK",
  "TIME CUT",
];

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

export async function addUser(user_id: string) {
  return await db.insert(app_users).values({ user_id: user_id }).returning();
}

export async function deleteUser(user_id: string) {
  return await db.delete(app_users).where(eq(app_users.user_id, user_id));
}

export async function scaffoldStp(user_id: string) {
  return await db.insert(stp).values([
    { stp_category: "filming", stp_content: stp_filming, user_id: user_id },
    {
      stp_category: "times_of_day",
      stp_content: stp_timesOfDay,
      user_id: user_id,
    },
    {
      stp_category: "transition",
      stp_content: stp_transition,
      user_id: user_id,
    },
    {
      stp_category: "revision_colours",
      stp_content: stp_revisionColour,
      user_id: user_id,
    },
  ]);
}

export async function getUserStp() {
  const { userId } = auth();
  const stp = await db.query.stp.findMany({
    where: (model, { eq }) => eq(model.user_id, userId),
  });
  console.log("STP -->", stp);
  return stp;
}
