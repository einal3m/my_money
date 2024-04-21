import { defineConfig } from "vite";
import { resolve } from "path";
import RubyPlugin from "vite-plugin-ruby";

export default defineConfig({
  plugins: [RubyPlugin()],
  resolve: {
    alias: {
      actions: resolve(__dirname, "app/javascript/actions"),
      components: resolve(__dirname, "app/javascript/components"),
      hooks: resolve(__dirname, "app/javascript/hooks"),
      selectors: resolve(__dirname, "app/javascript/selectors"),
      stores: resolve(__dirname, "app/javascript/stores"),
      stylesheets: resolve(__dirname, "app/javascript/stylesheets"),
      transformers: resolve(__dirname, "app/javascript/transformers"),
      util: resolve(__dirname, "app/javascript/util"),
      // "#root": resolve(__dirname),
    },
  },
});
