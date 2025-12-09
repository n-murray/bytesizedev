module.exports = {
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.medium.com'
      },
    ],
  },
}