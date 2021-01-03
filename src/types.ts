export interface Video {
  hash: string;
  thumbnail: string;
  title: string;
  description: string;
  topic: string;
  genre: string;
  tags: Array<string>;
  views: number;
  age: number;
  duration: number;
}

export interface Channel {
  avatar: string;
  name: string;
  handle: string;
  verified: boolean;
}
