/*
| Developed by Starton
| Filename : next.config.js
*/

const nextTranslate = require('next-translate-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack: (config, { isServer, webpack }) => {
		return config
	},
	 images: {
    domains: ['booksummary-8eaf4fe58601.herokuapp.com'],
  },
}

module.exports = nextTranslate(nextConfig)
