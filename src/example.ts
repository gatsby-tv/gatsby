import JWT from "jsonwebtoken";
import { BasicVideo, Topic, Genre } from "@gatsby-tv/types";

export const CJAYROSS_USER = {
  _id: "2421964912596325c7eb33f3bcad445646a82396",
  avatar: {
    hash: "QmSUid1NmgSuAqfGwm3thwy13H9VHVmAKLjJmkrNr3UdZU",
    mimeType: "image/png",
  },
  handle: "cjayross",
  name: "Calvin Jay Ross",
  verified: true,
  description: "Then wear the gold hat, if that will move her...",
  creationDate: new Date("Jan 14 2021"),
};

export const BLENDER_CHANNEL = {
  _id: "b77d279bdef3cf0cab84a77649ed76b339c26a6f",
  avatar: {
    hash: "QmeERq8yXYZcKVnoHdZ9Tpri3meDKB85y7T4ksozSKXiSW",
    mimeType: "image/jpeg",
  },
  name: "Blender Animation Studio",
  handle: "blender",
  description:
    "This is the official Blender Institute channel. Here we post our open movies with advertisement enabled. For non-advertisement viewing pleasure visit the Blender Foundation channel!",
  verified: true,
  subscribers: 245000,
  creationDate: new Date("November 23 2013"),
};

export const SPRING_VIDEO_SOURCE =
  "https://upload.wikimedia.org/wikipedia/commons/a/a5/Spring_-_Blender_Open_Movie.webm";

export const SPRING_CONTRIBUTORS = [
  {
    _id: "96b077da5a37e71f8ca854bcca944a4f00170a4b",
    avatar: {
      hash: "QmTUTKwwoLnFqQPfAiKLJ5gmNMnW94zYwyb91abCmQ6Bhs",
      mimeType: "image/jpeg",
    },
    name: "Andy Goralczyk",
    handle: "artificial3d",
    description:
      "Art Director at @blender, been using Blender for about 20 years. Recently I directed a short film titled 'Spring'.",
    verified: true,
    followers: 11500,
    creationDate: new Date("December 2008"),
  },
  {
    _id: "cc94af8a757135fc3807f125a07cdff30c6ccfb1",
    avatar: {
      hash: "QmPJLk1AthNJa1kXXQ8PU2YPDLSYGoUZjsrSxRCEcxmK8D",
      mimeType: "image/jpeg",
    },
    name: "Francesco Siddi",
    handle: "fsiddi",
    description: "Producer and Studio Manager @blender",
    verified: true,
    followers: 5795,
    creationDate: new Date("August 2009"),
  },
  {
    _id: "a90a6d81bd6efea5be0fec04cd12da997a695795",
    avatar: {
      hash: "QmTYWahgZrpRb5RYtUpWTPue8Zes2NRiKTx4NrB77hLugp",
      mimeType: "image/jpeg",
    },
    name: "Torin Borrowdale",
    handle: "TorinBorrowdale",
    description: "Composer: LOCKE & KEY, SEARCHING, RUN",
    verified: false,
    followers: 226,
    creationDate: new Date("June 2011"),
  },
  {
    _id: "87e06d296331c08d0c45e333fff4b1856d3c896b",
    avatar: {
      hash: "QmPc4L9FCnXmYeBkVGfutMZcrxHLj7PmTEyY5BRdnj2Jty",
      mimeType: "image/jpeg",
    },
    name: "Hjalti Hjalmarsson",
    handle: "hjalti",
    description:
      "Animator / Director / Designer / Rigger / Layout artist / Retired programmer / Boardgame geek / Science enthusiast ...and sometimes a person.",
    verified: true,
    followers: 5450,
    creationDate: new Date("May 2008"),
  },
];

export const SPRING_CONTRIBUTIONS = {
  "96b077da5a37e71f8ca854bcca944a4f00170a4b": new Set(["Director"]),
  cc94af8a757135fc3807f125a07cdff30c6ccfb1: new Set(["Producer"]),
  a90a6d81bd6efea5be0fec04cd12da997a695795: new Set(["Music"]),
  "87e06d296331c08d0c45e333fff4b1856d3c896b": new Set(["Animation Director"]),
};

export const SPRING_VIDEO_DESCRIPTION = `Produced by Blender Animation Studio. Made in Blender 2.8.
Get the production files, assets and exclusive making-of videos by joining Blender Cloud at https://cloud.blender.org

--

Spring is the story of a shepherd girl and her dog, who face ancient spirits in order to continue the cycle of life. This poetic and visually stunning short film was written and directed by Andy Goralczyk, inspired by his childhood in the mountains of Germany.

The Spring team used the development version of Blender 2.80 for the entire production, before the software was in official Beta even. As for all of Blender’s Open Movies, the entire production process and all its source files are being shared on the production platform Blender Cloud.

 Director: Andy Goralczyk
 Producer: Francesco Siddi
 Executive producer: Ton Roosendaal
 Music: Torin Borrowdale
 Sound: Sander Houtman
 Concept art: David Revoy
 Animation director: Hjalti Hjalmarsson
 Modeling and shading: Julien Kaspar
 Animation: Ignacio Conesa, Nathan Dillow, Pablo Fournier
 Rigging: Juan Pablo Bouza
 Lighting and effects: Pablo Vazquez, Sam Van Hulle
 Software and Pipeline: Brecht van Lommel, Jacques Lucke, Jeroen Bakker, Sergey Sharybin, Sybren Stüvel, Tobias Johansson

 Rendering IT4INNOVATIONS VSB - Technical University of Ostrava

Format: 3D animated film, 7:44 minutes. 5.1 sound. No dialogs. Fit for an audience of 6 years and older (PG). Everything you see was made with Blender, GIMP, Krita and Inkscape.`;

export const SPRING_VIDEO: BasicVideo = {
  _id: "7bbdd71d495caa32b18246d626b40d8950f43167",
  content: "QmSaMcnrPga65Thu6wFa4zesHAczjLVEus4U7rceeCVA86",
  thumbnail: {
    hash: "QmRm8aSK3ScRet1BwjLmNm8eEA4crGNhYUmpqZXkiRhbZY",
    mimeType: "image/webp",
  },
  title: "Spring - Blender Open Movie",
  description: SPRING_VIDEO_DESCRIPTION,
  channel: BLENDER_CHANNEL,
  tags: new Set([]),
  topic: Topic.Animation,
  genre: Genre.ShortFilm,
  views: 6007258,
  collaborators: [],
  contributors: SPRING_CONTRIBUTORS,
  contributions: SPRING_CONTRIBUTIONS,
  sponsors: [],
  explicit: false,
  unlisted: false,
  releaseDate: new Date("April 4 2019"),
  duration: 465,
};
