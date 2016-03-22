var path = require("path");

var root = __dirname + "/modules/crudTable";

module.exports = {
    entry: root + "/src/App",
    output: {
        filename: "[name].bundle.js",
        path: root + "/js"
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    resolveLoader: {
        moduleDirectories: ["node_modules"]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            }, {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    stats: {
        errorDetails: true
    },
    progress: false
};