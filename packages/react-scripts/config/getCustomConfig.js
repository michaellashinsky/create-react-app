const customizers = require('./customConfigOptions');

function getCustomConfig(prod) {
    const production = prod || false;
    const env = {};
    return Object
        .keys(customizers)
        .reduce(function (finalConfig, customizerKey) {
            const customizer = customizers[customizerKey];
            if (customizer.prod === false && production === true) {
                return finalConfig;
            }

            const envValue = process.env['REACT_APP_' + customizerKey];
            if (env && envValue && envValue !== 'false') {

                if (customizer.toArray) {
                    const getCustomizer = (production ? customizer.getProd : customizer.getDev) || customizer.getDev;
                    finalConfig[customizer.toArray].push(getCustomizer());
                }

                if (customizer.fileRegex) {
                    finalConfig.excludedFilesRegex.push(customizer.fileRegex);
                }

                finalConfig.values[customizerKey] = customizer.config || true;
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
