import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import * as meta from "./package.json";

const copyright = `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`;

export default [
  {
    input: "index",
    plugins: [
      node(),
      ascii()
    ],
    output: {
      extend: true,
      banner: copyright,
      file: "dist/wtopology.js",
      format: "umd",
      indent: false,
      name: "d3"
    }
  },
  {
    input: "index",
    plugins: [
      node(),
      ascii(),
      terser({output: {preamble: copyright}})
    ],
    output: {
      extend: true,
      file: "dist/wtopology.js.min.js",
      format: "umd",
      indent: false,
      name: "d3"
    }
  }
];