const program = require('commander');
const changeCase = require('change-case');
const packageJson = require('../package.json');
const allOptions = require('./options');

/**
 * Uses commander to parse input using the options from constants
 */
exports.parseInput = async () => {
    program.version(packageJson.version);
    allOptions.ALL_OPTIONS.map((o) => program.option(`-${o.short} --${o.long} ${o.type ? o.type : ''}`, o.description));
    program.parse(process.argv);
    const options = program.opts();

    return exports.getOptions(options);
};

exports.handleFileOption = async (options) => {
    let fileOptions = {};
    if (options.file) {
        const option = allOptions.ALL_OPTIONS.find((o) => o.long === 'file');

        if (option) {
            fileOptions = await exports.validateOption(options.file, option);
        }
    }

    return fileOptions;
};

/**
 * Returns an object with validated or defaulted options.
 */
exports.getOptions = async (inputOptions) => {
    const fileOptions = await exports.handleFileOption(inputOptions);
    const mergedOptions = { ...fileOptions, ...inputOptions };
    const validatedOptions = {};
    const promises = allOptions.ALL_OPTIONS.map(async (option) => {
        const name = changeCase.camelCase(option.long);
        const inputValue = mergedOptions[name];
        validatedOptions[name] = await exports.validateOption(inputValue, option);
    });

    return Promise.all(promises).then(() => validatedOptions);
};

/**
 * Validates the given input option.
 * Uses the option's validator, and assumes null value means to use the default value.
 */
exports.validateOption = async (inputValue, option) => {
    if (option.validator) {
        const validated = await option.validator(inputValue);
        if (validated === null) {
            return option.default;
        }
        return validated;
    } if (inputValue) {
        return inputValue;
    }
    return option.default;
};
