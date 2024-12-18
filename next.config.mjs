/** @type {import('next').NextConfig} */
const config = {
    output: "standalone",

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "thavyra.xyz",
                port: "",
                pathname: "/api/users/*/avatar.png"
            },
            {
                hostname: "localhost"
            }
        ]
    }
}

export default config;
