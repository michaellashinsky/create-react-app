const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const paths = require('./paths');
const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const cssFilename = 'static/css/[name].[contenthash:8].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: new Array(cssFilename.split('/').length).join('../') }
  : {};

module.exports = {
  BABEL_PRESET_STAGE_0: {
    toArray: 'presets',
    getDev: function() {
      return require.resolve('babel-preset-stage-0');
    },
  },
  BABEL_PRESET_ENV: {
    toArray: 'presets',
    getDev: function() {
      return require.resolve('babel-preset-env');
    },
  },
  BABEL_PLUGIN_TRANSFORM_DECORATORS_LEGACY: {
    toArray: 'babelPlugins',
    getDev: function() {
      return require.resolve('babel-plugin-transform-decorators-legacy');
    },
  },
  BABEL_PLUGIN_LODASH: {
    toArray: 'babelPlugins',
    getDev: function() {
      return require.resolve('babel-plugin-lodash');
    },
  },
  BABEL_PLUGIN_TRANSFORM_OBJECT_ASSIGN: {
    toArray: 'babelPlugins',
    getDev: function() {
      return require.resolve('babel-plugin-transform-object-assign');
    },
  },
  BABEL_PLUGIN_ADD_MODULE_EXPORTS: {
    toArray: 'babelPlugins',
    getDev: function() {
      return require.resolve('babel-plugin-add-module-exports');
    },
  },
  STYLES_SASS: {
    toArray: 'loaders',
    fileRegex: /\.(scss|sass)/,
    getDev: function() {
      return {
        test: /\.(scss|sass)/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 3, camelCase: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                  }),
                ];
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true, keepQuery: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      };
    },
    getProd: function() {
      return {
        test: /\.(scss|sass)/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: { importLoaders: 3, camelCase: true },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: function() {
                      return [
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9',
                          ],
                        }),
                      ];
                    },
                  },
                },
                {
                  loader: 'resolve-url-loader',
                  options: { keepQuery: true },
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: true },
                },
              ],
            },
            extractTextPluginOptions
          )
        ),
      };
    },
  },
  STYLES_LESS: {
    toArray: 'loaders',
    fileRegex: /\.less$/,
    getDev: function() {
      return {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 3, camelCase: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                  }),
                ];
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: { sourceMap: true, keepQuery: true },
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true },
          },
        ],
      };
    },
    getProd: function() {
      return {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: { importLoaders: 3, camelCase: true },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: function() {
                      return [
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9',
                          ],
                        }),
                      ];
                    },
                  },
                },
                {
                  loader: 'resolve-url-loader',
                  options: { keepQuery: true },
                },
                {
                  loader: 'less-loader',
                  options: { sourceMap: true },
                },
              ],
            },
            extractTextPluginOptions
          )
        ),
      };
    },
  },
  STYLES_STYLUS: {
    toArray: 'loaders',
    fileRegex: /\.styl$/,
    getDev: function() {
      return {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 2, camelCase: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                  }),
                ];
              },
            },
          },
          {
            loader: 'stylus-loader',
            options: { sourceMap: true },
          },
        ],
      };
    },
    getProd: function() {
      return {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: { importLoaders: 2, camelCase: true },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: function() {
                      return [
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9',
                          ],
                        }),
                      ];
                    },
                  },
                },
                {
                  loader: 'stylus-loader',
                },
              ],
            },
            extractTextPluginOptions
          )
        ),
      };
    },
  },
  STYLES_CSS_MODULES: '',
  WEBPACK_EXTERNALS: '',
};
