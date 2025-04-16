/** @type {import('next').NextConfig} */


const API_URL = "https://symmetrical-space-parakeet-7xr6xpvgjqw3r7xx-8080.app.github.dev"

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${API_URL}/:path*`
            }
        ]
    }
};

export default nextConfig;
