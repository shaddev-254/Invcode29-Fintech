import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import obfuscator from "vite-plugin-javascript-obfuscator";

export default defineConfig(({ mode }) => ({
  base: "/Invcode29-Fintech/",

  plugins: [
    react(),

    mode === "production" &&
      obfuscator({
        options: {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          numbersToExpressions: true,
          simplify: true,
          stringArray: true,
          stringArrayEncoding: ["base64"],
          splitStrings: true,
        },
      }),
  ].filter(Boolean),

  build: {
    sourcemap: false,
    minify: "terser",

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },

    rollupOptions: {
      output: {
        entryFileNames: "assets/[hash].js",
        chunkFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash].[ext]",
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
