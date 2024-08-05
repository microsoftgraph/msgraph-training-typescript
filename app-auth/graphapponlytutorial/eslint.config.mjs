import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/build"],
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended").map(config => ({
    ...config,
    files: ["**/.ts"],
})), {
    files: ["**/.ts"],

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "brace-style": 2,

        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        quotes: ["error", "single"],
        semi: ["error", "always"],
    },
}];