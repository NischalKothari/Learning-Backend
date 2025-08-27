## Notes

- Files ending with .js → follow your package.json "type" setting.

- Files ending with .cjs → always treated as CommonJS (require works).

- Files ending with .mjs → always treated as ESM (import works).

- If you keep "type":module in package.json then you can use import statement and if it is not included, use require('') statement 