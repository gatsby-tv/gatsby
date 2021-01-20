import React, { useCallback } from "react";

import { ListingGenerator } from "@src/components/Listing";
import { TopicListingGenerator } from "@src/components/TopicListing";
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

export function useNewFeed(): ListingGenerator {
  return useCallback(
    () =>
      [...Array(12)].map(() => ({
        video: SPRING_VIDEO,
      })),
    []
  );
}

export function usePopularFeed(): ListingGenerator {
  return useCallback(
    () =>
      [...Array(12)].map(() => ({
        video: SPRING_VIDEO,
      })),
    []
  );
}

export function useTopicFeed(): TopicListingGenerator {
  return useCallback(
    () =>
      [...Array(6)].map(() => ({
        topic: SPRING_VIDEO.topic,
        videos: [...Array(15)].map(() => SPRING_VIDEO),
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
