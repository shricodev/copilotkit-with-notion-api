"use server";

import { Client } from "@notionhq/client";
import { env } from "@/lib/env";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { TErrResponse } from "@/types/notion";

const notion = new Client({
  auth: env.NOTION_SECRET_API_KEY,
});

export const fetchNotionDB = async (): Promise<
  QueryDatabaseResponse | TErrResponse
> => {
  try {
    const dbQuery = await notion.databases.query({
      database_id: env.NOTION_DB_ID,
    });

    return dbQuery;
  } catch {
    console.error("DEBUG: Error in the function: `fetchNotionDB`");
    return {
      success: false,
      error: new Error("Error fetching Notion DB"),
    } as TErrResponse;
  }
};
