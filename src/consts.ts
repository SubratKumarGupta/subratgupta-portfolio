export const SITE = {
  title: "Documentation",
  description: "Your website description.",
  defaultLanguage: "en-us",
} as const;

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/.github/assets/banner.png?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "astrodotbuild",
};
type Carosole = {
  name: string;
  imglink: string;
  demoLink: string;
};

export const CARASOLE: Carosole[] = [
  {
    name: "Doremon",
    demoLink: "/fullStack_demo_img/doremon.jpg",
    imglink: "/fullStack_demo_img/doremon.jpg",
  },
  {
    name: "Mock",
    demoLink: "/fullStack_demo_img/gsmarena_017.jpg",
    imglink: "/fullStack_demo_img/gsmarena_017.jpg",
  },
  {
    name: "Sean",
    demoLink: "/fullStack_demo_img/sene.jpg",
    imglink: "/fullStack_demo_img/sene.jpg",
  },
  {
    name: "Seo",
    demoLink: "/fullStack_demo_img/sene.jpg",
    imglink: "/fullStack_demo_img/sene.jpg",
  },
];

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/withastro/astro/tree/main/examples/docs`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  en: {
    "Section Header": [
      { text: "Introduction", link: "en/introduction" },
      { text: "Page 2", link: "en/page-2" },
      { text: "Page 3", link: "en/page-3" },
    ],
    "Another Section": [{ text: "Page 4", link: "en/page-4" }],
  },
};
