import { copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'out');

const pages = [
  ['personal_portal_polished.html', 'index.html'],
  ['personal_portal_polished.html', 'personal_portal_polished.html'],
  ['resume_data_strategy_polished.html', 'resume_data_strategy_polished.html'],
  ['resume_agent_native_polished.html', 'resume_agent_native_polished.html'],
];

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const [source, target] of pages) {
  copyFileSync(join(root, source), join(outDir, target));
}

writeFileSync(join(outDir, '.nojekyll'), '');
console.log(`Prepared ${pages.length} static pages in ${outDir}`);
