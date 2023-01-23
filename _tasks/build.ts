import { GasPlugin } from "npm:esbuild-gas-plugin";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";
import { build, stop } from "https://deno.land/x/esbuild@v0.17.3/mod.js";

const buildOptions = {
  entryPoints: ["src/main.ts"],
  minify: true,
  bundle: true,
  outfile: "dist/main.js",
  target: "es2020",
  plugins: [denoPlugin(), GasPlugin],
};

// Create an output folder
await Deno.mkdir("dist", { recursive: true });
// Copy appsscript.json
await Deno.copyFile("src/appsscript.json", "dist/appsscript.json");
// Build TypeScript files
await build(buildOptions).catch((err: Error) => {
  console.error(err);
});

stop();
