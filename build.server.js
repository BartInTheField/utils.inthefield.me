import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['build/server/index.js'],
    bundle: true,
    platform: 'node',
    target: 'node20',
    format: 'cjs',
    outfile: 'build/bundled.server.js',
    packages: 'external',
});
