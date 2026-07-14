import fs from 'fs/promises';
import path from 'path';

async function main() {
  // detect actual public gallery folder name (preserve casing)
  const publicRoot = path.resolve(process.cwd(), 'public');
  const entries = await fs.readdir(publicRoot, { withFileTypes: true });
  const galleryEntry = entries.find(e => e.isDirectory() && e.name.toLowerCase() === 'gallery');
  const galleryFolderName = galleryEntry ? galleryEntry.name : 'gallery';
  const publicDir = path.join(publicRoot, galleryFolderName);
  const files = await fs.readdir(publicDir);
  const outDir = path.resolve(process.cwd(), 'src', 'data');
  await fs.mkdir(outDir, { recursive: true });
  const images = files.filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f)).sort((a,b)=> a.localeCompare(b, undefined, {numeric:true}));

  const lines = images.map(img => `  '${'/' + galleryFolderName + '/' + encodeURI(img)}',`);
  const content = `export const galleryImages = [\n${lines.join('\n')}\n];\n`;
  await fs.writeFile(path.join(outDir, 'gallery.ts'), content, 'utf8');
  console.log('Wrote src/data/gallery.ts with', images.length, 'images (folder: '+galleryFolderName+')');
}

main().catch(err => { console.error(err); process.exit(1); });
