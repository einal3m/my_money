import path from "path";

// const path = require("path");
import { sassPlugin } from "esbuild-sass-plugin";
import esBuild from "esbuild";

const context = await esBuild
  .context({
    entryPoints: ["application.js"],
    bundle: true,
    outdir: path.join(process.cwd(), "app/assets/builds"),
    absWorkingDir: path.join(process.cwd(), "app/javascript"),
    sourcemap: true,
    // custom plugins will be inserted is this array
    plugins: [sassPlugin()],
  })
  .catch(() => process.exit(1));

context.watch();
// "build": "esbuild app/javascript/*.* --bundle --sourcemap --outdir=app/assets/builds --public-path=/assets"

// const esbuild = require("esbuild");
// async function watch() {
//   let ctx = await esbuild.context({
//     entryPoints: ["./src/app.tsx"],
//     minify: false,
//     outfile: "./build/bundle.js",
//     bundle: true,
//     loader: { ".ts": "ts" },
//   });
//   await ctx.watch();
//   console.log("Watching...");
// }
// watch();
