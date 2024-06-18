import { defineConfig } from "cypress";
import "dotenv/config";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
  },

  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.VITE_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
