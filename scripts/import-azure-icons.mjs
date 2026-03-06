import { readdir, copyFile, mkdir } from 'fs/promises';
import { join, basename } from 'path';

// ── CONFIG ──────────────────────────────────────────────────────
// Path to your downloaded Azure icon pack
const SOURCE = './Azure_Public_service_Icons/icons';

// Where astro-icon looks for local icons
const DEST = './src/icons/azure';

// Map folder names → subfolder in src/icons/azure/
// Add/remove as needed
const FOLDER_MAP = {
  'compute':            'compute',
  'networking':         'networking',
  'storage':            'storage',
  'databases':          'databases',
  'identity':           'identity',
  'security':           'security',
  'devops':             'devops',
  'containers':         'containers',
  'management':         'management',
  'integration':        'integration',
  'analytics':          'analytics',
  'ai + machine learning': 'ai',
  'web':                'web',
  'monitoring':         'monitoring',
};

// Strips the numeric prefix and cleans up the filename
// "10021-icon-service-Virtual-Machine.svg" → "virtual-machine.svg"
function cleanName(filename) {
  return filename
    .replace(/^\d+-icon-service-/, '')   // remove "10021-icon-service-"
    .replace(/^\d+-icon-/,'')            // remove any other "10021-icon-" prefix
    .replace(/\s+/g, '-')               // spaces to dashes
    .replace(/_/g, '-')                 // underscores to dashes
    .replace(/[()]/g, '')               // remove parentheses
    .replace(/-+/g, '-')                // collapse multiple dashes
    .toLowerCase();
}

async function run() {
  await mkdir(DEST, { recursive: true });

  let folders;
  try {
    folders = await readdir(SOURCE, { withFileTypes: true });
  } catch {
    console.error(`❌ Source folder not found: ${SOURCE}`);
    console.error('Update the SOURCE path in the script to point to your Azure icon pack.');
    process.exit(1);
  }

  let total = 0;
  let skipped = 0;

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;

    const folderKey = folder.name.toLowerCase();
    const destSubfolder = FOLDER_MAP[folderKey];

    if (!destSubfolder) {
      console.log(`⏭  Skipping unmapped folder: ${folder.name}`);
      skipped++;
      continue;
    }

    const srcDir = join(SOURCE, folder.name);
    const dstDir = join(DEST, destSubfolder);
    await mkdir(dstDir, { recursive: true });

    const files = await readdir(srcDir);
    const svgs = files.filter(f => f.endsWith('.svg'));

    for (const file of svgs) {
      const cleaned = cleanName(file);
      await copyFile(join(srcDir, file), join(dstDir, cleaned));
      console.log(`✅ ${folder.name}/${file} → azure/${destSubfolder}/${cleaned}`);
      total++;
    }
  }

  console.log(`\n🎉 Done — ${total} icons imported, ${skipped} folders skipped`);
  console.log(`📁 Icons are in ${DEST}`);
}

run();