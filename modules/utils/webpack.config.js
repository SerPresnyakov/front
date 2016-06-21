module.exports = {
    entry: {
        utils: "./src/Module.ts"
    },
    output: {
        filename: "[name].bundle.js",
        path: "./js"
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    resolveLoader: {
        moduleDirectories: ["../node_modules"]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            }, {
                test: /\.html$/,
                loader: 'html'
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    stats: {
        errorDetails: true
    },
    progress: false
};

