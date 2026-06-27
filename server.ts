import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  // Render provides PORT dynamic environment variable, fallback to 3000
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // Standard API endpoints can be defined here
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Pashu Seva Mandi API" });
  });

  // Serve static assets & frontend application
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Fallback for SPA routing in Express v4
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
