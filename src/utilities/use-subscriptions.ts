type Subscription = {
  avatar: string;
};

export function useSubscriptions(): Subscription[] {
  return [...Array(12)].map(() => ({
    avatar: "https://loremflickr.com/500/500",
  }));
}
