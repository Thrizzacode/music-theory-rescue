import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { alphaTab } from "@coderline/alphatab-vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ESM 環境下 __dirname 不存在，需透過 import.meta.url 取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
    // alphaTab 官方 Vite 插件：自動處理字體、SoundFont、Web Worker 和 Audio Worklet
    alphaTab(),
  ],
  // 專案根目錄
  root: ".",
  // 靜態資源目錄（data/, scores/ 等不需被 Vite 打包的檔案）
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
