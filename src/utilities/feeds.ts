import React, { useCallback } from "react";

import { ListingGenerator } from "@src/components/Listing";
import { SPRING_VIDEO } from "@src/example";

export function useRelatedFeed(): ListingGenerator {
  return useCallback(
    () =>
      [...Array(12)].map(() => ({
        video: SPRING_VIDEO,
      })),
    []
  );
}

export function useBrowseFeed(): ListingGenerator {
  return useCallback(
    () =>
      [...Array(12)].map(() => ({
        video: SPRING_VIDEO,
      })),
    []
  );
}

export function useRecommendedFeed(): ListingGenerator {
  return useCallback(
    () =>
      [...Array(12)].map(() => ({
        video: SPRING_VIDEO,
      })),
    []
  );
}

export function useSubscriptionsFeed(): ListingGenerator {
  return useCallback(
    () =>
      [...Array(12)].map(() => ({
        video: SPRING_VIDEO,
      })),
    []
  );
}
