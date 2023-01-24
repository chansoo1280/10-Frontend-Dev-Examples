/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: "/",
                destination: "/community/questionList",
                permanent: true,
            },
        ]
    },
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require("next-remove-imports")()
module.exports = {
    ...removeImports({}),
    ...nextConfig,
}
