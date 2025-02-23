import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      injectManifest: {
        swDest: "dist/sw.js",
      },
      manifest: {
        name: "Meet When",
        short_name: "Meet When",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "maskable-icoin-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        theme_color: "#fff",
        background_color: "#fff",
        start_url: "/",
        display: "standalone",
        orientation: "portrait"
      },
    }),
  ],
  server: {
    https: {
      key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
    },
  },
});
