import { copyFileSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'out');
const v6Dir = join(root, 'motion-variants', '06-synthesis-v2');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// Copy V6-v2 pages
const pages = [
  ['index.html', 'index.html'],
  ['resume-data-strategy.html', 'resume-data-strategy.html'],
  ['resume-agent-native.html', 'resume-agent-native.html'],
];

for (const [source, target] of pages) {
  copyFileSync(join(v6Dir, source), join(outDir, target));
}

// Copy shared-motion.js and variant.css
copyFileSync(join(v6Dir, 'shared-motion.js'), join(outDir, 'shared-motion.js'));
copyFileSync(join(v6Dir, 'variant.css'), join(outDir, 'variant.css'));

// Copy favicon
copyFileSync(join(v6Dir, 'favicon.ico'), join(outDir, 'favicon.ico'));

writeFileSync(join(outDir, '.nojekyll'), '');
console.log(`Prepared V6-v2 site (${pages.length} pages + assets) in ${outDir}`);
