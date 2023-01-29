/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (conf) => {
    if (!conf.experiments) {
      conf.experiments = {};
    }

    conf.experiments.topLevelAwait = true;
    return conf;
  },
};

module.exports = nextConfig;
