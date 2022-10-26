/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  }
}