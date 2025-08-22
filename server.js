import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import compression from "compression";
import sirv from "sirv";
import { createServer as createViteServer } from "vite";

const isProduction = process.env.NODE_ENV === "production";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);
const port = Number(process.env.PORT) || 5173;

async function createServer() {
  const app = express();

  if (!isProduction) {
    // Development: use Vite in middleware mode for HMR and on-the-fly SSR
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        // 1. Read index.html
        let template = await fs.readFile(resolve("index.html"), "utf-8");

        // 2. Apply Vite HTML transforms (injects HMR, plugin transforms)
        template = await vite.transformIndexHtml(url, template);

        // 3. Load the server entry with vite.ssrLoadModule
        const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");

        // 4. Render the app HTML
        const appHtml = render(url);

        // 5. Inject the app-rendered HTML into the template.
        const html = template.replace(`<!--ssr-outlet-->`, appHtml.html);

        // 6. Send the rendered HTML back.
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });

    return { app };
  }

  // Production: serve pre-built client and SSR bundle from dist
  const distClientDir = resolve("dist/client");
  const distServerEntry = resolve("dist/server/entry-server.js");

  app.use(compression());
  app.use(sirv(distClientDir, { extensions: [] }));

  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const template = await fs.readFile(
        path.join(distClientDir, "index.html"),
        "utf-8"
      );
      // Dynamically import built SSR entry
      const { render } = await import(distServerEntry);
      const appHtml = render(url);
      const html = template.replace("<!--ssr-outlet-->", appHtml.html);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      next(e);
    }
  });

  return { app };
}

createServer().then(({ app }) =>
  app.listen(port, () => {
    console.log(
      `Server started at http://localhost:${port} (${
        isProduction ? "production" : "development"
      })`
    );
  })
);
