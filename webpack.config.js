const path = require('path');
const { cwd } = require('process');

function resolve(...args) {
    return path.resolve(cwd(),...args)
}

module.exports = {
    entry: "./src/index.js",
    mode:'development',
    module: {
        rules: [
            {
                test: /\.jce$/,
                use: {
                    loader: resolve("src", "compile.js"),
                    options: {
                        http:"@/utils/request"
                    }
                },
                exclude: [
                    resolve("node_modules"),
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            "@":path.resolve(__dirname,"src")
        }
    },
    stats: {
        modules: false
    }
}