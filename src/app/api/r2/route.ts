export const revalidate = 0;

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { r2 } from "~/lib/r2";
import { deleteSingleScreenplay } from "~/server/queries";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const objectKey = request.nextUrl.searchParams.get("key");
  console.log("objectKey -->", objectKey);

  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `${userId}/fdx/${objectKey}`,
      }),
      { expiresIn: 60 },
    );

    //eslint-disable-next-line
    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    console.log("error");
  }
}

export async function DELETE(
  request: NextRequest,
  params: { params: unknown },
) {
  const { userId } = auth();
  const key = request.nextUrl.searchParams.get("key");
  const id = request.nextUrl.searchParams.get("id");
  const path = request.nextUrl.searchParams.get("path");
  const objectKey = `${userId}/fdx/${key}`;

  const correctedPath = path?.substr(0, path.length);

  try {
    const deleteFromDB = await deleteSingleScreenplay(Number(id));
    const objectCommand = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: String(objectKey),
    });
    await r2.send(objectCommand);
    revalidatePath(String(correctedPath), "page");
    return new Response(`Deleted ${objectKey}`);
  } catch (e) {
    throw e;
  } finally {
    revalidatePath(String(correctedPath), "page");
    // redirect("/");
  }
}
