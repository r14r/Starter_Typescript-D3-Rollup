const path = require("path");
const indexHTML = require("rollup-plugin-index-html");

import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

import copy from "rollup-plugin-copy";
import clean from "rollup-plugin-clean";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "out/bundle.js",
      format: "iife",
      plugins: [],
      globals: {
        d3: "d3",
        "d3-hierarchy": "d3",
      },
    },
    {
      file: "out/bundle.min.js",
      format: "iife",
      plugins: [terser()],
      globals: {
        d3: "d3",
        "d3-hierarchy": "d3",
      },
    },
  ],
  watch: {
    skipWrite: false,
    clearScreen: false,
    include: "src/*",
    exclude: "node_modules/**",
  },
  plugins: [
    clean(),
    copy({
      targets: [
        { src: "src/index.*", dest: "out" },
        { src: "src/data/example.json", dest: "out" },
        { src: "src/lib/*", dest: "out/lib" },
        { src: "node_modules/d3/dist/d3.min.js", dest: "out/lib/d3" },
        {
          src: "node_modules/d3-hierarchy/dist/d3-hierarchy.min.js",
          dest: "out/lib/d3",
        },
      ],
    }),
    typescript({
      typescript: require("typescript"),
      include: ["*.ts+(|x)", "**/*.ts+(|x)", "*.d.ts", "**/*.d.ts"],
    }),
  ],
  external: ["d3", "d3-hierarchy"],
};
