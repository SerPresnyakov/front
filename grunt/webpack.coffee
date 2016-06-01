getConfig = (conf) ->
  result =
    resolve:
      extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    resolveLoader:
      moduleDirectories: ["node_modules"]
    module:
      loaders: [
          test: /\.ts$/,
          loader: 'ts'
        ,
          test: /\.html$/,
          loader: 'html'
        ,
          test: /\.css$/,
          loader: "style-loader!css-loader"
      ]
    stats: {
      errorDetails: true
    },
    progress: false

  for attr of conf
    result[attr] = conf[attr]

  result

getOutputConfig = () ->
  filename: "[name].bundle.js",
  path: "<%= dirs.root %>/js"

module.exports =
  buildDemo: getConfig(
    context: "<%= dirs.root %>/demo/src"
    entry:
      demo: "./App"
    output: getOutputConfig()
  )
  auth: getConfig(
    context: "<%= dirs.root %>/modules/authModule",
    entry:
      auth: "./Module"
    output: getOutputConfig()
  )
  crudTable: getConfig(
    context: "<%= dirs.root %>/modules/crudTableModule",
    entry:
      crudTable: "./Module"
    output: getOutputConfig()
  )
  apiAdmin: getConfig(
    context: "<%= dirs.root %>/modules/apiAdminModule",
    entry:
      apiAdmin: "./Module"
    output: getOutputConfig()
  )

