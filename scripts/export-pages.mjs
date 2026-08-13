import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist", "client");
const outputDir = path.join(root, "pages-dist");
const basePath = "/PepStructLoop";

const workerUrl = pathToFileURL(path.join(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("pages-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://anjie-qiao.github.io/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Static render failed with HTTP ${response.status}`);
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const prefixRootAssets = (source) =>
  source
    .replaceAll(
      "http://localhost:3000/pepstructloop-social.png",
      "https://anjie-qiao.github.io/PepStructLoop/pepstructloop-social.png",
    )
    .replaceAll('"/_next/', `"${basePath}/_next/`)
    .replaceAll("'/_next/", `'${basePath}/_next/`)
    .replaceAll("url(/_next/", `url(${basePath}/_next/`)
    .replaceAll('"/favicon.svg"', `"${basePath}/favicon.svg"`)
    .replaceAll('"/pepstructloop-social.png"', `"${basePath}/pepstructloop-social.png"`)
    .replaceAll('href="/#', `href="${basePath}/#`);

let html = prefixRootAssets(await response.text());
html = html.replace(
  "<head>",
  `<head><link rel="canonical" href="https://anjie-qiao.github.io${basePath}/">`,
);

await writeFile(path.join(outputDir, "index.html"), html, "utf8");
await writeFile(path.join(outputDir, ".nojekyll"), "", "utf8");

async function rewriteTextAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteTextAssets(entryPath);
    } else if (/\.(css|js|json)$/.test(entry.name)) {
      const source = await readFile(entryPath, "utf8");
      const rewritten = prefixRootAssets(source);
      if (rewritten !== source) await writeFile(entryPath, rewritten, "utf8");
    }
  }
}

await rewriteTextAssets(outputDir);
console.log(`GitHub Pages export ready: ${outputDir}`);
