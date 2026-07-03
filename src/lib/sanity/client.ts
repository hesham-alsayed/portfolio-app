import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!projectId) {
    return null;
  }

  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    });
  }

  return client;
}
