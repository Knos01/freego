/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'utfs.io', // already used by UploadThing
      'oaidalleapiprodscus.blob.core.windows.net' // ✅ OpenAI DALL·E images
    ],
  },
}

module.exports = nextConfig
