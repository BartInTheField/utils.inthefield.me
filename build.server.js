import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['build/server/index.js'],
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'esm',
    outfile: 'build/bundled.server.js',
    packages: 'external',
    banner: {
        js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
    },
});
