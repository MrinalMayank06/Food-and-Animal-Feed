import { build } from 'esbuild';
import { execSync } from 'child_process';

async function runBuild() {
  try {
    console.log('Building frontend assets with Vite...');
    // We run Vite directly through Node to avoid shell path expansion/splitting bugs
    execSync('node node_modules/vite/bin/vite.js build', { stdio: 'inherit' });

    console.log('Bundling production server with Esbuild...');
    await build({
      entryPoints: ['server.ts'],
      bundle: true,
      platform: 'node',
      format: 'cjs',
      packages: 'external',
      sourcemap: true,
      outfile: 'dist/server.cjs',
    });
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

runBuild();
