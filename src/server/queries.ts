import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export async function getProjects() {
  const { userId } = auth();

  // if (!userId) throw new Error("Unauthorized");

  const projects = await db.query.projects.findMany({
    where: (model, { eq }) => eq(model.user_id, userId),
  });

  return projects;
}
