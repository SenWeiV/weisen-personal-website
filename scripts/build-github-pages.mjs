import { copyFileSync, cpSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'out');
const siteDir = join(root, 'site');
const v6Dir = join(root, 'motion-variants', '06-synthesis-v2');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// Publish the approved A4 homepage and its self-hosted runtime dependencies.
for (const entry of ['index.html', 'style.css', 'assembly.js', 'main.js', 'fonts', 'vendor']) {
  cpSync(join(siteDir, entry), join(outDir, entry), { recursive: true });
}

// Keep the existing 0705 resume; adapt navigation and reuse the local GSAP files.
const resume = readFileSync(join(v6Dir, 'resume-agent-native.html'), 'utf8')
  .replaceAll('index.html#resume', 'index.html#about')
  .replace('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', 'vendor/gsap.min.js')
  .replace('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js', 'vendor/ScrollTrigger.min.js');
writeFileSync(join(outDir, 'resume-agent-native.html'), resume);
copyFileSync(join(v6Dir, 'shared-motion.js'), join(outDir, 'shared-motion.js'));
copyFileSync(join(v6Dir, 'variant.css'), join(outDir, 'variant.css'));
copyFileSync(join(v6Dir, 'favicon.ico'), join(outDir, 'favicon.ico'));

writeFileSync(join(outDir, '.nojekyll'), '');
writeFileSync(join(outDir, 'CNAME'), 'profile.vincentws.com\n');
writeFileSync(join(outDir, 'version.json'), JSON.stringify({ design: 'A4', commit: process.env.GITHUB_SHA || 'local' }) + '\n');
console.log(`Prepared A4 homepage and existing resume in ${outDir}`);
