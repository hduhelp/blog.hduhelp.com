/** @type {import('next').NextConfig} */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  images: {
    path: '/',
    loader: 'akamai',
    domains: [
      'eson.ninja',
      'ek1ng.com',
      'www.nickxu.top',
      's3-us-west-2.amazonaws.com',
      's3.us-west-2.amazonaws.com',
      'cdn.spencer.felinae98.cn',
      'avatars.githubusercontent.com',
      'avatars0.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com'
    ]
  },
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  }
}