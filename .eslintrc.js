module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
        sourceType: "module",
        "ecmaFeatures": {
            "jsx": true
        },
    },
    plugins: [
        "jquery"
    ],
    rules: {
        "jquery/no-ajax": 2,
        "jquery/no-ajax-events": 2,
        "jquery/no-animate": 2,
        "jquery/no-attr": 2,
        "jquery/no-bind": 2,
        "jquery/no-class": 2,
        "jquery/no-clone": 2,
        "jquery/no-closest": 2,
        "jquery/no-css": 2,
        "jquery/no-data": 2,
        "jquery/no-deferred": 2,
        "jquery/no-delegate": 2,
        "jquery/no-each": 2,
        "jquery/no-fade": 2,
        "jquery/no-filter": 2,
        "jquery/no-find": 2,
        "jquery/no-global-eval": 2,
        "jquery/no-has": 2,
        "jquery/no-hide": 2,
        "jquery/no-html": 2,
        "jquery/no-in-array": 2,
        "jquery/no-is": 2,
        "jquery/no-load": 2,
        "jquery/no-map": 2,
        "jquery/no-merge": 2,
        "jquery/no-param": 2,
        "jquery/no-parent": 2,
        "jquery/no-parents": 2,
        "jquery/no-parse-html": 2,
        "jquery/no-prop": 2,
        "jquery/no-proxy": 2,
        "jquery/no-ready": 2,
        "jquery/no-serialize": 2,
        "jquery/no-show": 2,
        "jquery/no-size": 2,
        "jquery/no-sizzle": 2,
        "jquery/no-slide": 2,
        "jquery/no-submit": 2,
        "jquery/no-text": 2,
        "jquery/no-toggle": 2,
        "jquery/no-trigger": 2,
        "jquery/no-trim": 2,
        "jquery/no-val": 2,
        "jquery/no-when": 2,
        "jquery/no-wrap": 2,
        "no-cond-assign": 2,
        "no-constant-condition": 1,
        "no-control-regex": 2,
        "no-dupe-args": 1,
        "no-dupe-keys": 1,
        "no-duplicate-case": 1,
        "no-empty-character-class": 1,
        "no-empty": 1,
        "no-extra-boolean-cast": 1,
        "no-extra-semi": 1,
        "no-func-assign": 1,
        "no-inner-declarations": 1,
        "no-invalid-regexp": 1,
        "no-irregular-whitespace": 1,
        "no-obj-calls": 2,
        "no-prototype-builtins": 1,
        "no-regex-spaces": 1,
        "no-sparse-arrays": 1,
        "no-template-curly-in-string": 2,
        "no-unreachable": 1,
        "no-unsafe-negation": 1,
        "use-isnan": 1,
        "valid-jsdoc": [
            1,
            {
                "requireReturnDescription": false,
                "requireReturn": false
            }
        ],
        "valid-typeof": 1,
        "accessor-pairs": 1,
        "array-callback-return": 2,
        "block-scoped-var": 1,
        "class-methods-use-this": 0,
        "curly": 1,
        "default-case": 1,
        "dot-notation": 1,
        "eqeqeq": 1,
        "guard-for-in": 1,
        "no-alert": 0,
        "no-case-declarations": 1,
        "no-div-regex": 1,
        "no-else-return": 1,
        "no-empty-function": 1,
        "no-eq-null": 1,
        "no-eval": 1,
        "no-extend-native": 1,
        "no-fallthrough": 1,
        "no-floating-decimal": 1,
        "no-global-assign": 1,
        "no-implicit-coercion": 1,
        "no-implied-eval": 1,
        "no-lone-blocks": 1,
        "no-loop-func": 1,
        "no-new-func": 1,
        "no-multi-str": 1,
        "no-multi-spaces": 1,
        "no-magic-numbers": 0,
        "no-new": 1,
        "no-param-reassign": 1,
        "no-proto": 1,
        "no-redeclare": 1,
        "no-return-assign": 1,
        "no-script-url": 1,
        "no-self-assign": 1,
        "no-self-compare": 1,
        "no-sequences": 1,
        "no-throw-literal": 1,
        "no-unmodified-loop-condition": 1,
        "no-unused-expressions": 1,
        "no-useless-call": 1,
        "no-useless-concat": 1,
        "no-useless-escape": 1,
        "no-useless-return": 1,
        "no-void": 1,
        "no-warning-comments": 1,
        "prefer-promise-reject-errors": 1,
        "radix": 1,
        "vars-on-top": 1,
        "wrap-iife": 1,
        "yoda": 1,
        "strict": [
            1,
            "global"
        ],
        "no-restricted-globals": 2,
        "no-shadow-restricted-names": 2,
        "no-shadow": 1,
        "no-undef-init": 1,
        "no-unused-vars": 1,
        "no-use-before-define": 1,
        "array-bracket-spacing": 1,
        "block-spacing": [
            2,
            "always"
        ],
        "brace-style": [
            2,
            "1tbs"
        ],
        "camelcase": [
            2,
            {
                "properties": "always"
            }
        ],
        "comma-dangle": [
            1,
            {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "never",
                "exports": "never",
                "functions": "never"
            }
        ],
        "comma-spacing": [
            1,
            {
                "before": false,
                "after": true
            }
        ],
        "comma-style": [
            1,
            "last"
        ],
        "computed-property-spacing": [
            1,
            "never"
        ],
        "eol-last": [
            1,
            "always"
        ],
        "func-call-spacing": [
            1,
            "never"
        ],
        "indent": [
            1,
            4
        ],
        "key-spacing": [
            1,
            {
                "beforeColon": false,
                "afterColon": true,
                "mode": "strict"
            }
        ],
        "keyword-spacing": [
            1,
            {
                "before": true,
                "after": true
            }
        ],
        "line-comment-position": [
            1,
            "above"
        ],
        "linebreak-style": [
            1,
            "unix"
        ],
        "lines-around-comment": [
            1,
            {
                "beforeBlockComment": true,
                "afterBlockComment": false,
                "beforeLineComment": false,
                "afterLineComment": false,
                "allowBlockStart": true,
                "allowObjectStart": true,
                "allowArrayStart": true
            }
        ],
        "max-depth": [
            1,
            {
                "max": 4
            }
        ],
        "max-len": [
            1,
            {
                "code": 80,
                "tabWidth": 4,
                "comments": 80,
                "ignoreUrls": true,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true,
                "ignoreRegExpLiterals": true
            }
        ],
        "max-nested-callbacks": [
            1,
            {
                "max": 3
            }
        ],
        "max-params": [
            1,
            {
                "max": 8
            }
        ],
        "max-statements-per-line": [
            1,
            {
                "max": 1
            }
        ],
        "multiline-ternary": [
            1,
            "always-multiline"
        ],
        "new-cap": [
            1,
            {
                "newIsCap": true,
                "capIsNew": true,
                "properties": false
            }
        ],
        "new-parens": 1,
        "newline-after-var": [
            1,
            "always"
        ],
        "newline-before-return": [
            1
        ],
        "no-lonely-if": 1,
        "no-mixed-operators": 1,
        "no-mixed-spaces-and-tabs": 2,
        "no-multiple-empty-lines": [
            1,
            {
                "max": 1,
                "maxEOF": 1,
                "maxBOF": 0
            }
        ],
        "no-nested-ternary": 1,
        "no-new-object": 1,
        "no-plusplus": [
            1,
            {
                "allowForLoopAfterthoughts": true
            }
        ],
        "no-tabs": 1,
        "no-ternary": 0,
        "no-trailing-spaces": 1,
        "no-unneeded-ternary": 0,
        "no-whitespace-before-property": 1,
        "object-curly-newline": [
            1,
            {
                "ImportDeclaration": {
                    "multiline": true,
                    "minProperties": 3
                }

            }
        ],
        "object-property-newline": [
            1, { "allowAllPropertiesOnSameLine": true }
        ],
        "one-var-declaration-per-line": [
            1,
            "always"
        ],
        "one-var": [
            1,
            "never"
        ],
        "padded-blocks": [
            1,
            "never"
        ],
        "quote-props": [
            1,
            "as-needed"
        ],
        "quotes": [
            1,
            "single"
        ],
        "semi-spacing": [
            1,
            {
                "before": false,
                "after": true
            }
        ],
        "semi": [
            1,
            "always"
        ],
        "space-before-blocks": [
            1,
            "always"
        ],
        "space-before-function-paren": [
            1,
            "always"
        ],
        "space-in-parens": [
            1,
            "never"
        ],
        "space-infix-ops": 1,
        "space-unary-ops": [
            1,
            {
                "words": true,
                "nonwords": false
            }
        ],
        "spaced-comment": [
            2,
            "always"
        ],
        "template-tag-spacing": [
            1,
            "always"
        ],
        "wrap-regex": 1,
        "arrow-body-style": [
            1,
            "always"
        ],
        "arrow-parens": [
            1,
            "as-needed"
        ],
        "arrow-spacing": [
            1,
            {
                "before": true,
                "after": true
            }
        ],
        "no-confusing-arrow": 1,
        "no-const-assign": 1,
        "no-dupe-class-members": 1,
        "no-duplicate-imports": 1,
        "no-useless-computed-key": 1,
        "no-useless-constructor": 1,
        "no-var": 1,
        "prefer-const": 1,
        "prefer-template": 1,
        "template-curly-spacing": [
            1,
            "never"
        ],
        "no-console": 0
    }
};
