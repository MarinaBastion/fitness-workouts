export function buildDevServer(options) {
    var _a;
    return {
        port: (_a = options.port) !== null && _a !== void 0 ? _a : 3000,
        open: true,
        // если раздавать статику через nginx То надо делать проксирование на Index.html
        historyApiFallback: true,
        hot: true,
        watchFiles: {
            paths: [`${options.paths.src}/**/*`],
            options: {
                usePolling: true,
                interval: 1000,
                ignored: /node_modules|dist|build/,
            },
        },
    };
}
