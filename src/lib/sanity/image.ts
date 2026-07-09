import createImageUrlBuilder from "@sanity/image-url";
import type { SanityFileAsset, SanityImageAsset } from "@/types/cms";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageAsset) {
  return builder.image(source);
}

export function urlForFile(source: SanityFileAsset): string {
  const ref = source.asset._ref;
  const parts = ref.split("-");
  const id = parts[1];
  const ext = parts[2];
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}

export function getSanityFileUrl(assetRef: string): string {
  const parts = assetRef.split("-");
  const id = parts[1];
  const ext = parts[2];
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}
