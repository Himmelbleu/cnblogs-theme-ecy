import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
  presetWebFonts,
  transformerDirectives
} from "unocss";

const matches = [
  { prefix: "c", value: "center" },
  { prefix: "s", value: "start" },
  { prefix: "e", value: "end" },
  { prefix: "b", value: "between" },
  { prefix: "a", value: "around" }
];

function getMatches(prefix: string) {
  return matches.find(e => e.prefix === prefix);
}

function addFlexItemsAndContent(p1: string) {
  const val = getMatches(p1);
  return `flex items-${val?.value || "center"} content-${val?.value || "center"}`;
}

function addFlexJustify(p2: string) {
  const val = getMatches(p2);
  return ` justify-${val?.value || "center"}`;
}

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        tabler: () => import("@iconify-json/tabler/icons.json").then(i => i.default),
        ep: () => import("@iconify-json/ep/icons.json").then(i => i.default)
      }
    }),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        art: ["ZCOOL KuaiLe"]
      }
    })
  ],
  transformers: [
    transformerDirectives({
      applyVariable: ["--uno"]
    })
  ],
  theme: {
    colors: {
      a: "var(--text-a)",
      b: "var(--text-b)",
      c: "var(--text-c)",
      d: "var(--text-d)",
      primary: "var(--text-primary)",
      dropPrimary: "var(--l-background-bg)"
    }
  },
  preflights: [
    {
      getCSS: ({ theme }) => {
        return `
          * {
            font-family: inherit;
            color: inherit;
            line-height: 1.7;
            font-family: var(--l-font-family);
            letter-spacing: 0.05rem;
            scroll-behavior: smooth;
            word-break: break-all;
            line-break: anywhere;
            box-sizing: border-box;
          }
        `;
      }
    }
  ],
  rules: [
    [
      /^flow-(auto|hidden|inherit|initial|overlay|revert|scroll|unset|visible)$/,
      ([, d]) => ({ overflow: `${d}` })
    ],
    [
      /^flow-x-(auto|hidden|inherit|initial|overlay|revert|scroll|unset|visible)$/,
      ([, d]) => ({ overflow: `${d}` })
    ],
    [
      /^flow-y-(auto|hidden|inherit|initial|overlay|revert|scroll|unset|visible)$/,
      ([, d]) => ({ overflow: `${d}` })
    ],
    [/^letter-spacing-(\d+|\d+\.\d+)$/, ([, d]) => ({ "letter-spacing": `${d}rem` })],
    [/^line-height-(\d+|\d+\.\d+)$/, ([, d]) => ({ "line-height": `${d}rem` })]
  ],
  shortcuts: [
    [
      /^f-((c|s|e)(-(c|s|e|b|a))*)$/,
      ([, , p1, , p2]) => {
        let style = ``;

        style = addFlexItemsAndContent(p1);
        if (p2) {
          style += addFlexJustify(p2);
        }

        return style;
      }
    ],
    [
      /^hover$/,
      () => {
        return `cursor-pointer hover:text-primary transition-all-300`;
      }
    ],
    [
      /^caption$/,
      () => {
        return `text-primary font-art text-1.4rem letter-spacing-0.2 f-c-s mb-10`;
      }
    ]
  ]
});
