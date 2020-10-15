module.exports = {
  webpack(config) {
    // url loader
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: {
        loader: "url-loader",
      },
    });

    return config;
  },
};
