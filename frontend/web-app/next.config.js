/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['localhost', 'cdn.pixabay.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
