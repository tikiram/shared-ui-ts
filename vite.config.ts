// @ts-expect-error asdf
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      insertTypesEntry: true,
      include: ["src", "lib"],
    }),
  ],
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: {
        // @ts-expect-error asdf
        main: resolve(__dirname, "lib/main.ts"),
        // @ts-expect-error asdf
        observable: resolve(__dirname, "lib/observable.ts"),
        // @ts-expect-error asdf
        httpclient: resolve(__dirname, "lib/httpclient.ts"),
        // @ts-expect-error asdf
        components: resolve(__dirname, "lib/components.ts"),
        // @ts-expect-error asdf
        auth: resolve(__dirname, "lib/auth.ts"),
      },
      // The default formats are 'es' and 'umd'
      // - UMD stands for Universal Module Definition
      //   - Works on front and back end (hence the name universal).
      //   - UMD works everywhere and usually used as a fallback in case ESM does not work
      // - ESM stands for ES Modules
      //   - It is Javascript's proposal to implement a standard module system.
      //   - Works in many modern browsers
      //   - ESM is the best module format thanks to its simple syntax, async nature, and tree-shakeability.
      formats: ["es"],
      // filename: name of the package file output, which defaults to the "name" in package.json.
      // fileName: 'main'
    },
    rollupOptions: {
      external: [
        "@emotion/react",
        "@emotion/styled",
        "@fontsource/roboto",
        "@mui/lab",
        "@mui/material",
        "@mui/icons-material",
        "react",
        "react/jsx-runtime", // TODO: why this is required?
        "react-dom",
      ],
    },
  },
});
