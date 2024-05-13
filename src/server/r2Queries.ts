import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "~/lib/r2";

export async function getFdxObject(fdxObjectKey: string) {
  const { userId } = auth();
  try {
    const objectCommand = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fdxObjectKey,
    });

    const response = await r2.send(objectCommand);
    if (response.Body) {
      const bodyString = response.Body.transformToString();

      return bodyString;
    }
  } catch (e) {
    throw e;
  }
}
