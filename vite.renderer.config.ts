import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vite";
import { pluginExposeRenderer } from "./vite.base.config";
import path from "node:path";

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"renderer">;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? "";

  return {
    root,
    mode,
    base: "./",
    build: {
      outDir: `.vite/renderer/${name}`,
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "html", "index.html"),
          login: path.resolve(__dirname, "html", "login.html"),
          dialog: path.resolve(__dirname, "html", "dialog.html"),
          floatWindow: path.resolve(__dirname, "html", "floating-window.html"),
        },
      },
    },
    plugins: [pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  } as UserConfig;
});
