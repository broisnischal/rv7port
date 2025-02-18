import type { Config } from "@react-router/dev/config";

const config: Config = {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender() {
    return ["/blog"];
  },
};

export default config;
