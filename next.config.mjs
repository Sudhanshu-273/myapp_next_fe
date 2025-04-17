/** @type {import('next').NextConfig} */


const API_URL = process.env.BASE_URL

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
