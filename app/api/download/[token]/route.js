import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { verifyDownloadToken } from "../../../../lib/downloadToken";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function GET(request, { params }) {
  const { token } = params;

  const payload = verifyDownloadToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: "This download link is invalid or has expired. Please contact us for help." },
      { status: 403 }
    );
  }

  try {
    const asset = await client.fetch(
      `*[_type == "sanity.fileAsset" && _id == $id][0]{ url, originalFilename, mimeType }`,
      { id: payload.assetId }
    );

    if (!asset?.url) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    const fileRes = await fetch(asset.url);
    if (!fileRes.ok) {
      return NextResponse.json({ error: "Could not retrieve file." }, { status: 502 });
    }

    const fileBuffer = await fileRes.arrayBuffer();
    const filename = asset.originalFilename || `${payload.title || "download"}.pdf`;

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": asset.mimeType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Download error:", err);
    return NextResponse.json({ error: "Something went wrong. Please contact us." }, { status: 500 });
  }
}