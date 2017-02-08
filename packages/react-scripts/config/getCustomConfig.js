const configOptions = require('./customConfigOptions');

function getCustomConfig(prod) {
    const production = prod || false;
    return Object
        .keys(configOptions)
        .reduce(function (finalConfig, configOptionKey) {
            const configOption = configOptions[configOptionKey];
            const env = process.env['REACT_APP_' + configOptionKey];

            if (configOptionKey === 'WEBPACK_EXTERNALS' && env && env !== false) {
                finalConfig.values[configOptionKey] = env;
            }

            if (configOption.prod === false && production === true) {
                return finalConfig;
            }

            if (env && env !== 'false' && configOptionKey !== 'WEBPACK_EXTERNALS') {

                if (configOption.toArray) {
                    const getCustomizer = (production ? configOption.getProd : configOption.getDev) || configOption.getDev;
                    finalConfig[configOption.toArray].push(getCustomizer());
                }

                if (configOption.fileRegex) {
                    finalConfig.excludedFilesRegex.push(configOption.fileRegex);
                }

                finalConfig.values[configOptionKey] = configOption.config || true;
            }

            return finalConfig;
        }, {
            presets: [],
            babelPlugins: [],
            plugins: [],
            loaders: [],
            values: {},
            excludedFilesRegex: []
        });
}

module.exports = getCustomConfig;
