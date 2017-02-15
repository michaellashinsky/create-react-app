const ExtractTextPlugin = require('extract-text-webpack-plugin');

//TODO rewire/rewrute for webpack 2.0
module.exports = {
    'BABEL_PRESET_STAGE_0': {
        toArray: 'presets',
        getDev: function () {
            return require.resolve('babel-preset-stage-0')
        }
    },
    'BABEL_PLUGIN_TRANSFORM_DECORATORS_LEGACY': {
        toArray: 'babelPlugins',
        getDev: function () {
            return require.resolve('babel-plugin-transform-decorators-legacy')
        }
    },
    'BABEL_PLUGIN_LODASH': {
        toArray: 'babelPlugins',
        getDev: function () {
            return require.resolve('babel-plugin-lodash')
        }
    },
    'BABEL_PLUGIN_TRANSFORM_OBJECT_ASSIGN': {
        toArray: 'babelPlugins',
        getDev: function () {
            return require.resolve('babel-plugin-transform-object-assign')
        }
    },
    'BABEL_PLUGIN_ADD_MODULE_EXPORTS': {
        toArray: 'babelPlugins',
        getDev: function () {
            return require.resolve('babel-plugin-add-module-exports')
        }
    },
    'STYLES_SASS': {
        toArray: 'loaders',
        fileRegex: /\.(scss|sass)/,
        getDev: function () {
            return {
                test: /(\.scss|\.sass)$/,
                loader: "style!css!postcss!sass!resolve-url!sass?sourceMap"
            }
        },
        getProd: function () {
            return {
                test: /(\.scss|\.sass)$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass!resolve-url!sass?sourceMap')
            }
        }
    },
    'STYLES_LESS': {
        toArray: 'loaders',
        fileRegex: /\.less$/,
        getDev: function () {
            return {
                test: /\.less$/,
                loader: "style!css!postcss!less"
            }
        },
        getProd: function () {
            return {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            }
        }
    },
    'STYLES_STYLUS': {
        toArray: 'loaders',
        fileRegex: /\.styl$/,
        getDev: function () {
            return {
                test: /\.styl/,
                loader: 'style!css!postcss!stylus'
            }
        },
        getProd: function () {
            return {
                test: /\.styl/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
            }
        }
    },
    'STYLES_CSS_MODULES': {
        config: {
            dev: 'style!css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
            prod: 'style!css?modules&camelCase&-autoprefixer&importLoaders=1!postcss'
        }
    },
    'WEBPACK_EXTERNALS': ''
};
