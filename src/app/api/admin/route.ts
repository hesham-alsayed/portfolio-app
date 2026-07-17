import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { type, action, data, id, ids } = await request.json();

    if (!type || !action) {
      return NextResponse.json({ error: "type and action required" }, { status: 400 });
    }

    const validTypes = ["personalInfo", "skill", "project", "experience", "socialLink", "siteSettings", "category", "about"];

    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: `Invalid type: ${type}` }, { status: 400 });
    }

    switch (action) {
      case "fetch": {
        if (type === "personalInfo" || type === "siteSettings" || type === "about") {
          const doc = await client.fetch(`*[_type == $type][0]`, { type });
          return NextResponse.json({ data: doc });
        }
        const docs = await client.fetch(`*[_type == $type] | order(order asc)`, { type });
        return NextResponse.json({ data: docs });
      }

      case "create": {
        if (!data) return NextResponse.json({ error: "data required" }, { status: 400 });
        if (type === "project" && data.title && !data.slug) {
          data.slug = { _type: "slug", current: slugify(data.title) };
        }
        const doc = { _type: type, _id: uuid(), ...data };
        const result = await client.create(doc);
        return NextResponse.json({ data: result });
      }

      case "update": {
        if (!id || !data) return NextResponse.json({ error: "id and data required" }, { status: 400 });
        if (type === "project" && data.title) {
          data.slug = { _type: "slug", current: slugify(data.title) };
        }
        const result = await client.patch(id).set(data).commit();
        return NextResponse.json({ data: result });
      }

      case "delete": {
        if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
        await client.delete(id);
        return NextResponse.json({ success: true });
      }

      case "deleteMany": {
        if (!ids?.length) return NextResponse.json({ error: "ids required" }, { status: 400 });
        const tx = client.transaction();
        for (const delId of ids) tx.delete(delId);
        await tx.commit();
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: `Invalid action: ${action}` }, { status: 400 });
    }
  } catch (err) {
    console.error("Admin API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
