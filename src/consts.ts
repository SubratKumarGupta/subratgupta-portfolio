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
    name: "Social media app",
    demoLink: "https://github.com/SubratKumarGupta/3by3",
    imglink: "/fullStack_demo_img/3by3demo.webp",
  },
  {
    name: "Online 3D editor",
    demoLink: "https://virtuealize.com/",
    imglink: "/fullStack_demo_img/virtilizedemo.webp",
  },
  {
    name: "Static blog",
    demoLink: "https://subrat.me/blog/",
    imglink: "/fullStack_demo_img/blogdemo.webp",
  },
];

export const KNOWN_LANGUAGES = {
  English: "en",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

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
