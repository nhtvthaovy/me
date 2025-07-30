/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { notion } from "../../../../lib/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const databaseId = process.env.NOTION_DATABASE_ID_PROJECT!;

// GET /api/project?mode=list → Lấy danh sách project đã Published
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");

  if (mode !== "list") {
    return NextResponse.json(
      { error: "Invalid mode for GET" },
      { status: 400 }
    );
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
    });

    const blogs = response.results
      .map((page) => {
        if (!("properties" in page)) return null;

        const props = (page as PageObjectResponse).properties;

        const title =
          props.Name?.type === "title" && props.Name.title.length > 0
            ? props.Name.title[0].plain_text
            : "Untitled";

        const img =
          props.Img?.type === "files" && props.Img.files.length > 0
            ? "file" in props.Img.files[0]
              ? props.Img.files[0].file.url
              : props.Img.files[0].external.url
            : "";

        const des =
          props.Des?.type === "rich_text" && props.Des.rich_text.length > 0
            ? props.Des.rich_text[0].plain_text
            : "";

        const pageId =
          props.PageID?.type === "rich_text" &&
          props.PageID.rich_text.length > 0
            ? props.PageID.rich_text[0].plain_text
            : "";

        const published =
          props.Published?.type === "checkbox"
            ? props.Published.checkbox
            : false;

        const customId = props.Id?.type === "number" ? props.Id.number : 0;

        return {
          id: page.id,
          title,
          img,
          des,
          pageId,
          published,
          customId,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const blogA = a as { customId: number };
        const blogB = b as { customId: number };
        return blogA.customId - blogB.customId;
      });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/projec với body: { mode: "detail", pageId: "abc123" } → Lấy nội dung page
export async function POST(req: Request) {
  try {
    const { mode, pageId } = await req.json();

    if (mode !== "detail" || !pageId) {
      return NextResponse.json({ error: "Invalid POST data" }, { status: 400 });
    }

    const res = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    const blocks = res.results.map((block: any) => {
      const type = block.type;
      const data = block[type];

      let text = "";
      if (data?.rich_text) {
        text = data.rich_text.map((t: any) => t.plain_text).join("");
      }

      let imageUrl = "";
      if (type === "image") {
        imageUrl = data.type === "external" ? data.external.url : data.file.url;
      }

      return {
        type,
        text,
        imageUrl,
        checked: data?.checked ?? undefined,
      };
    });

    return NextResponse.json({ pageId, blocks });
  } catch (error: any) {
    console.error("Notion error:", error.message || error);
    return NextResponse.json(
      { error: "Failed to load Notion content" },
      { status: 500 }
    );
  }
}
