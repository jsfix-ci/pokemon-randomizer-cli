module.exports = {
    extends: [
        'airbnb',
        'plugin:chai-friendly/recommended',
        'plugin:promise/recommended',
        'plugin:mocha/recommended',
    ],
    plugins: [
        'chai-friendly',
        'promise',
        'mocha',
    ],
    env: {
        commonjs: true,
        node: true,
        mocha: true,
    },
    globals: {
        expect: true,
        chance: true,
    },
    rules: {
        'max-len': ['error', 150],
        indent: ['error', 4],
        'linebreak-style': 0,
        'func-names': 0,
        'arrow-body-style': 0,
        'no-unused-expressions': 0,
        'chai-friendly/no-unused-expressions': 2,
        'prefer-arrow-callback': 0,
        'mocha/prefer-arrow-callback': 2,
        'no-use-before-define': ['error', { variables: true, functions: false }],
        'import/prefer-default-export': 0,
    },
};
