import { defineConfig, presetAttributify, presetUno } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

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
  presets: [presetAttributify(), presetUno()],
  transformers: [
    transformerDirectives({
      applyVariable: ["--uno"]
    })
  ],
  rules: [
    [/^size-(\d*)$/, ([, d]) => ({ "font-size": `${d}rem !important` })],
    [/^l-size-(\d*)$/, ([, d]) => ({ "font-size": `var(--l-size-${d}) !important` })],
    [/^l-color-(\d*)$/, ([, d]) => ({ color: `var(--l-color-${d}) !important` })],
    [/^l-hight-color-(\d*)$/, ([, d]) => ({ color: `var(--l-hight-color-${d}) !important` })],
    [/^flow-(auto|hidden|inherit|initial|overlay|revert|scroll|unset|visible)$/, ([, d]) => ({ overflow: `${d}` })],
    [/^flow-x-(auto|hidden|inherit|initial|overlay|revert|scroll|unset|visible)$/, ([, d]) => ({ overflow: `${d}` })],
    [/^flow-y-(auto|hidden|inherit|initial|overlay|revert|scroll|unset|visible)$/, ([, d]) => ({ overflow: `${d}` })],
    [/^l-([a-z]*)-bg$/, ([, d]) => ({ "background-color": `var(--l-${d}-bg) !important` })]
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
    ]
  ]
});
