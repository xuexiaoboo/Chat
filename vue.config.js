module.exports = {
    devServer: {
        proxy: {
            '/user': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        },

        host: "0.0.0.0"
    }
}