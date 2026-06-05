export type SiteVideo = {
  src: string;
  title: string;
};

export const SITE_VIDEOS: SiteVideo[] = [
  {
    src: "/video/properties.mp4",
    title: "Searcher Properties — Property Showcase",
  },
  {
    src: "/video/video2.mp4",
    title: "Searcher Properties — Development Tour",
  },
];

/** @deprecated Use SITE_VIDEOS instead */
export const PROPERTY_VIDEO = SITE_VIDEOS[0];
