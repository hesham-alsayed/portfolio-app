import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageAsset } from "@/types/cms";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageAsset) {
  return builder.image(source);
}
