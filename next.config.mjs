/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dlgecihdx",
      
    },
    images: {
      domains: ["res.cloudinary.com"],
    },


};

export default nextConfig;
